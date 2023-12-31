import { BytesMatcher } from "./_matcher.ts";
const matcher: BytesMatcher = new BytesMatcher().addExactHex(0, "00 00 02 00 06 04 06 00 08 00 00 00 00 00");
/**
 * Determine whether the byte is Lotus 1-2-3 spreadsheet version 1 (`.wk1`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteLotus123SpreadsheetV1(item: Uint8Array): boolean {
	return matcher.match(item);
}
export default isByteLotus123SpreadsheetV1;
