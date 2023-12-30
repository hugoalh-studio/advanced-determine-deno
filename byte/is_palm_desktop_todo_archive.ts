import { isByteMatch } from "./_matcher.ts";
/**
 * Determine whether the byte is Palm Desktop To Do Archive (`.dba`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isBytePalmDesktopToDoArchive(item: Uint8Array): boolean {
	return isByteMatch(item, "00 01 42 44");
}
export default isBytePalmDesktopToDoArchive;
