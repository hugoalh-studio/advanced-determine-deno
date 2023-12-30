import { isByteMatch } from "./_matcher.ts";
/**
 * Determine whether the item is Quark Express document (`.qxd`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteQxd(item: Uint8Array): boolean {
	return isByteMatch(item, [
		"00 00 49 49 58 50 52",
		"00 00 4D 4D 58 50 52"
	]);
}
export default isByteQxd;
