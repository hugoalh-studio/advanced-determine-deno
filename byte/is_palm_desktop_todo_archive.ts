import { BytesMatcher } from "./_matcher.ts";
export const bytesMatcherPalmDesktopToDoArchive: BytesMatcher = new BytesMatcher().addExactStartGroupHex(0, "00 01 42 44").freeze();
/**
 * Determine whether the byte is Palm Desktop To Do Archive (`.dba`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isBytePalmDesktopToDoArchive(item: Uint8Array): boolean {
	return bytesMatcherPalmDesktopToDoArchive.match(item);
}
export default isBytePalmDesktopToDoArchive;
