import { isByteMatch } from "./_matcher.ts";
/**
 * Determine whether the item is Lotus 1-2-3 spreadsheet (v1) (`.wk1`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteLotusV1(item: Uint8Array): boolean {
	return isByteMatch(item, ["00 00 02 00 06 04 06 00 08 00 00 00 00 00"]);
}
export default isByteLotusV1;
