import { BytesMatcher } from "./_matcher.ts";
const matcher0: BytesMatcher = new BytesMatcher().addExactHex(2, "2D 68 6C 30 2D");
const matcher5: BytesMatcher = new BytesMatcher().addExactHex(2, "2D 68 6C 35 2D");
/**
 * Determine whether the byte is Lempel Ziv Huffman archive (`.lzh`) file format using method 0.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteLZH0(item: Uint8Array): boolean {
	return matcher0.match(item);
}
/**
 * Determine whether the byte is Lempel Ziv Huffman archive (`.lzh`) file format using method 5.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteLZH5(item: Uint8Array): boolean {
	return matcher5.match(item);
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
