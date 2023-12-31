import { BytesMatcher } from "./_matcher.ts";
const matcher: BytesMatcher = new BytesMatcher().addExactHex(0, "62 70 6C 69 73 74");
/**
 * Determine whether the byte is Binary Property List file (`.plist`) format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteBinaryPropertyListFile(item: Uint8Array): boolean {
	return matcher.match(item);
}
export default isByteBinaryPropertyListFile;
