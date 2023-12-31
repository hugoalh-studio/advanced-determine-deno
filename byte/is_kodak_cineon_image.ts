import { BytesMatcher } from "./_matcher.ts";
const matcher: BytesMatcher = new BytesMatcher().addExactHex(0, "80 2A 5F D7");
/**
 * Determine whether the byte is Kodak Cineon image (`.cin`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteKodakCineonImage(item: Uint8Array): boolean {
	return matcher.match(item);
}
export default isByteKodakCineonImage;
