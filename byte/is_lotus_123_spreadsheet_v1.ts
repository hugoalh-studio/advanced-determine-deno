import { BytesMatcher } from "./_matcher.ts";
export const bytesMatcherLotus123SpreadsheetV1: BytesMatcher = new BytesMatcher().addExactStartGroupHex(0, "00 00 02 00 06 04 06 00 08 00 00 00 00 00").freeze();
/**
 * **\[EXPERIMENTAL\]** Determine whether the byte is Lotus 1-2-3 spreadsheet version 1 (`.wk1`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteLotus123SpreadsheetV1(item: Uint8Array): boolean {
	return bytesMatcherLotus123SpreadsheetV1.match(item);
}
export default isByteLotus123SpreadsheetV1;
