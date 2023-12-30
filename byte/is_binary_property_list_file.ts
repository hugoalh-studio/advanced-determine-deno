import { isByteMatch } from "./_matcher.ts";
/**
 * Determine whether the byte is Binary Property List file (`.plist`) format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteBinaryPropertyListFile(item: Uint8Array): boolean {
	return isByteMatch(item, "62 70 6C 69 73 74");
}
export default isByteBinaryPropertyListFile;
