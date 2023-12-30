import { isByteMatch } from "./_matcher.ts";
/**
 * Determine whether the item is Lotus 1-2-3 spreadsheet version 4 & 5 (`.wk4`/`.wk5`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteLotus123SpreadsheetV4(item: Uint8Array): boolean {
	return isByteMatch(item, "00 00 1A 00 02 10 04 00 00 00 00 00");
}
export default isByteLotus123SpreadsheetV4;
