import { isByteMatch } from "./_matcher.ts";
/**
 * Determine whether the byte is BZip2 (`.bz2`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteBZip2(item: Uint8Array): boolean {
	return isByteMatch(item, "42 5A 68");
}
export default isByteBZip2;
