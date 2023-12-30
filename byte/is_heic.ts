import { isByteMatch } from "./_matcher.ts";
/**
 * Determine whether the byte is HEIC (High Efficiency Image Container) (`.heic`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteHEIC(item: Uint8Array): boolean {
	return isByteMatch(item, "66 74 79 70 68 65 69 63", 4);
}
export default isByteHEIC;
