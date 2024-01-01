import { BytesMatcher } from "./_matcher.ts";
export const bytesPalmDesktopCalendarArchiveDBA: BytesMatcher = new BytesMatcher().addExactGroupHex(0, "BE BA FE CA").freeze();
export const bytesPalmDesktopCalendarArchiveTDA: BytesMatcher = new BytesMatcher().addExactGroupHex(0, "00 01 44 54").freeze();
/**
 * Determine whether the byte is Palm Desktop Calendar Archive (`.dba` only) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isBytePalmDesktopCalendarArchiveDBA(item: Uint8Array): boolean {
	return bytesPalmDesktopCalendarArchiveDBA.match(item);
}
/**
 * Determine whether the byte is Palm Desktop Calendar Archive (`.tda` only) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isBytePalmDesktopCalendarArchiveTDA(item: Uint8Array): boolean {
	return bytesPalmDesktopCalendarArchiveTDA.match(item);
}
/**
 * Determine whether the byte is Palm Desktop Calendar Archive (`.dba`/`.tda`) file format.
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
