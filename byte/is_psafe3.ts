import { isByteMatch } from "./_matcher.ts";
/**
 * Determine whether the item is Password Gorilla Password Database (`.psafe3`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isBytePSafe3(item: Uint8Array): boolean {
	return isByteMatch(item, ["50 57 53 33"]);
}
export default isBytePSafe3;
