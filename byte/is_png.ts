import { isByteMatch } from "./_matcher.ts";
/**
 * Determine whether the item is PNG (`.png`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isBytePng(item: Uint8Array): boolean {
	return isByteMatch(item, ["89 50 4E 47 0D 0A 1A 0A"]);
}
export default isBytePng;
