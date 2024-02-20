export interface BytesMatcherSignature<T extends string | Uint8Array> {
	fromIndex: number;
	pattern: T;
}
/**
 * Bytes matcher to determine whether the bytes is match the specify signature.
 */
export class BytesMatcher {
	#bytesMinimum: number;
	#signature: Map<number, number> = new Map<number, number>();
	/**
	 * Initialize bytes matcher.
	 * @param {BytesMatcherSignature<string | Uint8Array>[]} signature Signature.
	 */
	constructor(signature: BytesMatcherSignature<string | Uint8Array>[]) {
		if (signature.length === 0) {
			throw new TypeError(`Argument \`signature\` is not defined!`);
		}
		for (const { fromIndex: indexFrom, pattern } of signature) {
			if (!Number.isSafeInteger(indexFrom)) {
				throw new SyntaxError(`\`${indexFrom}\` is not a valid index!`);
			}
			if (pattern.length === 0) {
				throw new SyntaxError(`Pattern is empty from index ${indexFrom}!`);
			}
			const patternResolve: number[] = Array.from((typeof pattern === "string") ? (new TextEncoder().encode(pattern)) : Uint8Array.of(...pattern));
			const indexTo: number = indexFrom + patternResolve.length;
			if (indexFrom < 0 && indexTo > 0) {
				throw new Error(`Pattern is overflow (most likely cause by incorrect index)! Current: ${indexFrom}; Expect: ${indexFrom - indexTo}`);
			}
			for (let indexCursor: number = indexFrom, indexPattern = 0; indexCursor < indexTo; indexCursor += 1, indexPattern += 1) {
				const byte: number = patternResolve[indexPattern];
				if (this.#signature.has(indexCursor)) {
					throw new SyntaxError(`Signature index of ${indexCursor} is already defined! Exist: \\x${this.#signature.get(indexCursor)!.toString(16)}; Override: \\x${byte.toString(16)}`);
				}
				this.#signature.set(indexCursor, byte);
			}
		}
		if (this.#signature.size === 0) {
			throw new Error(`Signature is empty!`);
		}
		const indexes: number[] = Array.from(this.#signature.keys());
		this.#bytesMinimum = indexes.some((index: number): boolean => {
			return (index < 0);
		}) ? Infinity : Math.max(...indexes);
	}
	/**
	 * Determine whether the bytes is match the specify signature.
	 * @param {string | Uint8Array} item Item that need to determine.
	 * @returns {boolean} Determine result.
	 */
	test(item: string | Uint8Array): boolean {
		if (item.length === 0) {
			return false;
		}
		const itemResolve: Uint8Array = (typeof item === "string") ? (new TextEncoder().encode(item)) : Uint8Array.of(...item);
		for (const [index, byte] of this.#signature.entries()) {
			if (itemResolve[index] !== byte) {
				return false;
			}
		}
		return true;
	}
	/**
	 * Determine whether the file is match the specify signature.
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
	 * Determine whether the file is match the specify signature.
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
		return this.#signature.size;
	}
}
export default BytesMatcher;
