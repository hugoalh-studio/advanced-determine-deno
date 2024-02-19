const regexpPatternHex = /^[\dA-F]{2}(?: [\dA-F]{2})*$/v;
export interface BytesMatcherPattern<T extends string | Uint8Array> {
	fromIndex: number;
	hex: T;
}
/**
 * Bytes matcher to determine whether the bytes is match the specify pattern.
 */
export class BytesMatcher {
	#bytesMinimum: number;
	#pattern: Map<number, number> = new Map<number, number>();
	/**
	 * Initialize bytes matcher.
	 * @param {BytesMatcherPattern<string | Uint8Array>[]} pattern Pattern.
	 */
	constructor(pattern: BytesMatcherPattern<string | Uint8Array>[]) {
		if (pattern.length === 0) {
			throw new TypeError(`Argument \`pattern\` is not defined!`);
		}
		for (const { fromIndex: indexFrom, hex } of pattern) {
			if (!Number.isSafeInteger(indexFrom)) {
				throw new SyntaxError(`\`${indexFrom}\` is not a valid index!`);
			}
			if (hex.length === 0) {
				throw new SyntaxError(`Hex is empty from index ${indexFrom}!`);
			}
			if (typeof hex === "string" && !regexpPatternHex.test(hex)) {
				throw new SyntaxError(`\`${hex}\` is not a valid hex!`);
			}
			const hexResolve: number[] = Array.from((typeof hex === "string") ? Uint8Array.of(...hex.split(" ").map((byte: string): number => {
				return Number.parseInt(byte, 16);
			})) : Uint8Array.of(...hex));
			const indexTo: number = indexFrom + hexResolve.length;
			if (indexFrom < 0 && indexTo > 0) {
				throw new Error(`Trail of the pattern is overflow (most likely cause by incorrect index)! Current: ${indexFrom}; Expect: ${indexFrom - indexTo}`);
			}
			for (let indexCursor: number = indexFrom, indexHex = 0; indexCursor < indexTo; indexCursor += 1, indexHex += 1) {
				const byte: number = hexResolve[indexHex];
				if (this.#pattern.has(indexCursor)) {
					throw new SyntaxError(`Index of ${indexCursor} is already defined! Exist: ${this.#pattern.get(indexCursor)!.toString(16)}; Override: ${byte.toString(16)}`);
				}
				this.#pattern.set(indexCursor, byte);
			}
		}
		if (this.#pattern.size === 0) {
			throw new Error(`Pattern is empty!`);
		}
		const indexes: number[] = Array.from(this.#pattern.keys());
		this.#bytesMinimum = indexes.some((index: number): boolean => {
			return (index < 0);
		}) ? Infinity : Math.max(...indexes);
	}
	/**
	 * Determine whether the bytes is match the specify pattern.
	 * @param {string | Uint8Array} item Item that need to determine.
	 * @returns {boolean} Determine result.
	 */
	test(item: string | Uint8Array): boolean {
		if (item.length === 0) {
			return false;
		}
		const itemResolve: Uint8Array = (typeof item === "string") ? (new TextEncoder().encode(item)) : Uint8Array.of(...item);
		for (const [index, byte] of this.#pattern.entries()) {
			if (itemResolve[index] !== byte) {
				return false;
			}
		}
		return true;
	}
	/**
	 * Determine whether the file is match the specify pattern.
	 * @param {string | URL | Deno.FsFile} file File that need to determine.
	 * @returns {Promise<boolean>} Determine result.
	 */
	async testFile(file: string | URL | Deno.FsFile): Promise<boolean> {
		const fileResolve: Deno.FsFile = (file instanceof Deno.FsFile) ? file : (await Deno.open(file));
		try {
			const info: Deno.FileInfo = await fileResolve.stat();
			if (!info.isFile) {
				throw new Error(`This is not a file!`);
			}
			const reader: ReadableStreamDefaultReader<Uint8Array> = fileResolve.readable.getReader();
			const item: number[] = [];
			let finish = false;
			while (!finish) {
				const { done, value = [] } = await reader.read();
				if (value.length > 0) {
					item.push(...Array.from(value));
				}
				finish = (
					done ||
					item.length >= this.#bytesMinimum
				);
			}
			return this.test(Uint8Array.of(...item));
		} finally {
			if (!(file instanceof Deno.FsFile)) {
				fileResolve.close();
			}
		}
	}
	/**
	 * Determine whether the file is match the specify pattern.
	 * @param {string | URL | Deno.FsFile} file File that need to determine.
	 * @returns {boolean} Determine result.
	 */
	testFileSync(file: string | URL | Deno.FsFile): boolean {
		const fileResolve: Deno.FsFile = (file instanceof Deno.FsFile) ? file : Deno.openSync(file);
		try {
			const info: Deno.FileInfo = fileResolve.statSync();
			if (!info.isFile) {
				if (!(file instanceof Deno.FsFile)) {
					fileResolve.close();
				}
				throw new Error(`This is not a file!`);
			}
			const lengthNeed: number = Math.min(info.size, this.#bytesMinimum);
			const reader: Uint8Array = new Uint8Array(lengthNeed);
			const lengthRead: number = fileResolve.readSync(reader) ?? 0;
			if (lengthNeed !== lengthRead) {
				throw new Deno.errors.InvalidData();
			}
			return this.test(reader);
		} finally {
			if (!(file instanceof Deno.FsFile)) {
				fileResolve.close();
			}
		}
	}
	/**
	 * Require minimum bytes to read in the file stream for the bytes matcher.
	 * @returns {number} Minimum bytes to read in the stream.
	 */
	get bytesMinimum(): number {
		return this.#bytesMinimum;
	}
	/**
	 * Weight of the bytes matcher. Useful for reduce rate of false positive.
	 * @returns {number} Weight of the bytes matcher.
	 */
	get weight(): number {
		return this.#pattern.size;
	}
}
export default BytesMatcher;
