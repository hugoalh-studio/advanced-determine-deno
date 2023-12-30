import { isByteMatch } from "./_matcher.ts";
/**
 * Determine whether the item is WebP (`.webp`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteWebP(item: Uint8Array): boolean {
	return (isByteMatch(item, "52 49 46 46") && isByteMatch(item, "57 45 42 50", 8));
}
export default isByteWebP;
