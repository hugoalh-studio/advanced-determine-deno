import { isByteMatch } from "./_matcher.ts";
/**
 * Determine whether the item is Palm Desktop Calendar Archive (`.dba` only) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isBytePalmDesktopCalendarArchiveDBA(item: Uint8Array): boolean {
	return isByteMatch(item, "BE BA FE CA");
}
/**
 * Determine whether the item is Palm Desktop Calendar Archive (`.tda` only) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isBytePalmDesktopCalendarArchiveTDA(item: Uint8Array): boolean {
	return isByteMatch(item, "00 01 44 54");
}
/**
 * Determine whether the item is Palm Desktop Calendar Archive (`.dba`/`.tda`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isBytePalmDesktopCalendarArchive(item: Uint8Array): boolean {
	return (
		isBytePalmDesktopCalendarArchiveDBA(item) ||
		isBytePalmDesktopCalendarArchiveTDA(item)
	);
}
export default isBytePalmDesktopCalendarArchive;
