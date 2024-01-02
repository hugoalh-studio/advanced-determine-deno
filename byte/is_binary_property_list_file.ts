import { BytesMatcher } from "./_matcher.ts";
export const bytesMatcherBinaryPropertyListFile: BytesMatcher = new BytesMatcher("62 70 6C 69 73 74");
/**
 * **\[EXPERIMENTAL\]** Determine whether the byte is Binary Property List file (`.plist`) format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteBinaryPropertyListFile(item: Uint8Array): boolean {
	return bytesMatcherBinaryPropertyListFile.test(item);
}
export default isByteBinaryPropertyListFile;
