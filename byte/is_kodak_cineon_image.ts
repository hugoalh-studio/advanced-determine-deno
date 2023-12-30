import { isByteMatch } from "./_matcher.ts";
/**
 * Determine whether the byte is Kodak Cineon image (`.cin`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteKodakCineonImage(item: Uint8Array): boolean {
	return isByteMatch(item, "80 2A 5F D7");
}
export default isByteKodakCineonImage;
