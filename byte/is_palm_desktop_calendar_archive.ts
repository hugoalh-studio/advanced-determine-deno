import { BytesMatcher } from "./_matcher.ts";
const matcherDBA: BytesMatcher = new BytesMatcher().addExactHex(0, "BE BA FE CA");
const matcherTDA: BytesMatcher = new BytesMatcher().addExactHex(0, "00 01 44 54");
/**
 * Determine whether the byte is Palm Desktop Calendar Archive (`.dba` only) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isBytePalmDesktopCalendarArchiveDBA(item: Uint8Array): boolean {
	return matcherDBA.match(item);
}
/**
 * Determine whether the byte is Palm Desktop Calendar Archive (`.tda` only) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isBytePalmDesktopCalendarArchiveTDA(item: Uint8Array): boolean {
	return matcherTDA.match(item);
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
