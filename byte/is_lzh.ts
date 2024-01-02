import { BytesMatcher } from "./_matcher.ts";
export const bytesMatcherLZH0: BytesMatcher = new BytesMatcher({
	offset: 2,
	pattern: "2D 68 6C 30 2D"
});
export const bytesMatcherLZH5: BytesMatcher = new BytesMatcher({
	offset: 2,
	pattern: "2D 68 6C 35 2D"
});
/**
 * **\[EXPERIMENTAL\]** Determine whether the byte is Lempel Ziv Huffman archive (`.lzh`) file format using method 0.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteLZH0(item: Uint8Array): boolean {
	return bytesMatcherLZH0.test(item);
}
/**
 * **\[EXPERIMENTAL\]** Determine whether the byte is Lempel Ziv Huffman archive (`.lzh`) file format using method 5.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteLZH5(item: Uint8Array): boolean {
	return bytesMatcherLZH5.test(item);
}
/**
 * **\[EXPERIMENTAL\]** Determine whether the byte is Lempel Ziv Huffman archive (`.lzh`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteLZH(item: Uint8Array): boolean {
	return (
		isByteLZH0(item) ||
		isByteLZH5(item)
	);
}
export default isByteLZH;
