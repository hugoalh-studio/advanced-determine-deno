import { BytesMatcher } from "./_matcher.ts";
const matcher: BytesMatcher = new BytesMatcher().addExactHex(0, "00 00 1A 00 05 10 04");
/**
 * Determine whether the byte is Lotus 1-2-3 spreadsheet version 9 (`.123`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteLotus123SpreadsheetV9(item: Uint8Array): boolean {
	return matcher.match(item);
}
export default isByteLotus123SpreadsheetV9;
