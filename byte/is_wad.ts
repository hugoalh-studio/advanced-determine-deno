import { isByteMatch } from "./_matcher.ts";
/**
 * Determine whether the byte is WAD (`.wad`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteWAD(item: Uint8Array): boolean {
	return isByteMatch(item, "49 57 41 44");
}
export default isByteWAD;
