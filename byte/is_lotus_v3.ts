import { isByteMatch } from "./_matcher.ts";
/**
 * Determine whether the item is Lotus 1-2-3 spreadsheet (v3) (`.wk3`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteLotusV3(item: Uint8Array): boolean {
	return isByteMatch(item, ["00 00 1A 00 00 10 04 00 00 00 00 00"]);
}
export default isByteLotusV3;
