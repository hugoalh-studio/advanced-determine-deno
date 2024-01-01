import { BytesMatcher } from "./_matcher.ts";
export const bytesMatcherLZH0: BytesMatcher = new BytesMatcher().addExactGroupHex(2, "2D 68 6C 30 2D").freeze();
export const bytesMatcherLZH5: BytesMatcher = new BytesMatcher().addExactGroupHex(2, "2D 68 6C 35 2D").freeze();
/**
 * Determine whether the byte is Lempel Ziv Huffman archive (`.lzh`) file format using method 0.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteLZH0(item: Uint8Array): boolean {
	return bytesMatcherLZH0.match(item);
}
/**
 * Determine whether the byte is Lempel Ziv Huffman archive (`.lzh`) file format using method 5.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteLZH5(item: Uint8Array): boolean {
	return bytesMatcherLZH5.match(item);
}
/**
 * Determine whether the byte is Lempel Ziv Huffman archive (`.lzh`) file format.
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
