import { isByteMatch } from "./_matcher.ts";
/**
 * Determine whether the byte is Lotus 1-2-3 spreadsheet version 3 (`.wk3`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteLotus123SpreadsheetV3(item: Uint8Array): boolean {
	return isByteMatch(item, "00 00 1A 00 00 10 04 00 00 00 00 00");
}
export default isByteLotus123SpreadsheetV3;
