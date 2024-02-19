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
		const itemResolve: Uint8Array = (typeof item === "string") ? new TextEncoder().encode(item) : Uint8Array.of(...item);
		for (const [index, byte] of this.#pattern.entries()) {
			if (itemResolve[index] !== byte) {
				return false;
			}
		}
		return true;
	}
	/**
	 * Require minimum bytes to read in the stream for the bytes matcher. Useful for file stream.
	 * @returns {number} Minimum bytes to read in the stream.
	 */
	get bytesMinimum(): number {
		return this.#bytesMinimum;
	}
	/**
	 * Weight of the bytes matcher. Useful for reduce percentage of false positive.
	 * @returns {number} Weight of the bytes matcher.
	 */
	get weight(): number {
		return this.#pattern.size;
	}
}
export default BytesMatcher;
