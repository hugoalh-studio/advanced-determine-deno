import { isByteMatch } from "./_matcher.ts";
/**
 * Determine whether the item is PalmPilot Database/Document (`.pdb`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isBytePdb(item: Uint8Array): boolean {
	return isByteMatch(item, "00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00", 11);
}
export default isBytePdb;
