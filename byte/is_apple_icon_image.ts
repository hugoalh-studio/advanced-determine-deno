import { isByteMatch } from "./_matcher.ts";
/**
 * Determine whether the byte is Apple Icon Image (`.icns`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteAppleIconImage(item: Uint8Array): boolean {
	return isByteMatch(item, "69 63 6e 73");
}
export default isByteAppleIconImage;
