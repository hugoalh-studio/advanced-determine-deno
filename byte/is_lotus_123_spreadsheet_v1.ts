import { isByteMatch } from "./_matcher.ts";
/**
 * Determine whether the byte is Lotus 1-2-3 spreadsheet version 1 (`.wk1`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteLotus123SpreadsheetV1(item: Uint8Array): boolean {
	return isByteMatch(item, "00 00 02 00 06 04 06 00 08 00 00 00 00 00");
}
export default isByteLotus123SpreadsheetV1;
