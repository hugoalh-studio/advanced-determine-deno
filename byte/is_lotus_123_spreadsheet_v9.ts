import { BytesMatcher } from "./_matcher.ts";
export const bytesMatcherLotus123SpreadsheetV9: BytesMatcher = new BytesMatcher("00 00 1A 00 05 10 04");
/**
 * **\[EXPERIMENTAL\]** Determine whether the byte is Lotus 1-2-3 spreadsheet version 9 (`.123`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteLotus123SpreadsheetV9(item: Uint8Array): boolean {
	return bytesMatcherLotus123SpreadsheetV9.test(item);
}
export default isByteLotus123SpreadsheetV9;
