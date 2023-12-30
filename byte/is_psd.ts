import { isByteMatch } from "./_matcher.ts";
/**
 * Determine whether the item is PSD (`.psd`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isBytePsd(item: Uint8Array): boolean {
	return isByteMatch(item, ["38 42 50 53"]);
}
export default isBytePsd;
