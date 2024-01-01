import { BytesMatcher } from "./_matcher.ts";
export const bytesMatcherKodakCineonImage: BytesMatcher = new BytesMatcher().addExactStartGroupHex(0, "80 2A 5F D7").freeze();
/**
 * **\[EXPERIMENTAL\]** Determine whether the byte is Kodak Cineon image (`.cin`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteKodakCineonImage(item: Uint8Array): boolean {
	return bytesMatcherKodakCineonImage.match(item);
}
export default isByteKodakCineonImage;
