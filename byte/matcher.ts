export interface BytesMatcherSignature<T extends string | Uint8Array> {
	offset: number;
	pattern: T;
}
/**
 * Bytes matcher to determine whether the bytes is match the specify signature.
 */
export class BytesMatcher {
	#bytesMinimum: number;
	#signatureHead: Map<number, number> = new Map<number, number>();
	#signatureTail: Map<number, number> = new Map<number, number>();
	/**
	 * Initialize bytes matcher.
	 * @param {BytesMatcherSignature<string | Uint8Array>[]} signature Signature.
	 */
	constructor(signature: BytesMatcherSignature<string | Uint8Array>[]) {
		if (signature.length === 0) {
			throw new TypeError(`Argument \`signature\` is not defined!`);
		}
		for (const { offset: offsetFrom, pattern } of signature) {
			if (!Number.isSafeInteger(offsetFrom)) {
				throw new SyntaxError(`\`${offsetFrom}\` is not a valid offset!`);
			}
			if (pattern.length === 0) {
				throw new SyntaxError(`Pattern is empty from offset ${offsetFrom}!`);
			}
			const patternResolve: number[] = Array.from((typeof pattern === "string") ? (new TextEncoder().encode(pattern)) : Uint8Array.of(...pattern));
			const offsetTo: number = offsetFrom + patternResolve.length;
			if (offsetFrom < 0 && offsetTo > 0) {
				throw new Error(`Pattern is overflow (most likely cause by incorrect offset)! Offset Current: ${offsetFrom}; Offset Possible: <= ${offsetFrom - offsetTo}`);
			}
			for (let index = 0; index < patternResolve.length; index += 1) {
				const cursor: number = offsetFrom + index;
				const byte: number = patternResolve[index];
				const byteMayDefine: number | undefined = this.#signatureHead.get(cursor) ?? this.#signatureTail.get(cursor);
				if (typeof byteMayDefine !== "undefined") {
					throw new SyntaxError(`Signature offset of ${cursor} is already defined! Exist: \\x${byteMayDefine.toString(16)}; Override: \\x${byte.toString(16)}`);
				}
				(cursor >= 0) ? this.#signatureHead.set(cursor, byte) : this.#signatureTail.set(cursor, byte);
			}
		}
		if (this.#signatureHead.size + this.#signatureTail.size === 0) {
			throw new Error(`Signature is empty!`);
		}
		this.#bytesMinimum = (this.#signatureTail.size > 0) ? Infinity : Math.max(...Array.from(this.#signatureHead.keys()));
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
		for (const [offset, byte] of this.#signatureHead.entries()) {
			if (itemResolve[offset] !== byte) {
				return false;
			}
		}
		for (const [offset, byte] of this.#signatureTail.entries()) {
			if (itemResolve[offset] !== byte) {
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
			const { isFile, size }: Deno.FileInfo = await fileResolve.stat();
			if (!isFile) {
				throw new Error(`This is not a file!`);
			}
			if (size > Number.MAX_SAFE_INTEGER) {
				throw new Error(`Size of the file is too large!`);
			}
			const signatureResolve: Map<number, number> = new Map<number, number>();
			for (const [offset, byte] of this.#signatureHead.entries()) {
				signatureResolve.set(offset, byte);
			}
			for (const [offset, byte] of this.#signatureTail.entries()) {
				const offsetResolve: number = size + offset;
				if (typeof signatureResolve.get(offsetResolve) !== "undefined") {
					return false;
				}
				signatureResolve.set(offsetResolve, byte);
			}
			const reader: ReadableStreamDefaultReader<Uint8Array> = fileResolve.readable.getReader();
			let cursor = 0;
			const cursorMaximum: number = Math.max(...Array.from(signatureResolve.keys()));
			while (true) {
				const { done, value } = await reader.read();
				if (typeof value !== "undefined") {
					for (let index = 0; index < value.length; index += 1) {
						const byte: number | undefined = signatureResolve.get(cursor);
						if (typeof byte !== "undefined" && value[index] !== byte) {
							return false;
						}
						cursor += 1;
						if (cursor > cursorMaximum) {
							return true;
						}
					}
				}
				if (done) {
					break;
				}
			}
			return false;
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
		return (this.#signatureHead.size + this.#signatureTail.size);
	}
}
export default BytesMatcher;
