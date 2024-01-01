import { BytesMatcher } from "./_matcher.ts";
export const bytesMatcherAppleIconImage: BytesMatcher = new BytesMatcher().addExactStartGroupHex(0, "69 63 6e 73").freeze();
/**
 * Determine whether the byte is Apple Icon Image (`.icns`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteAppleIconImage(item: Uint8Array): boolean {
	return bytesMatcherAppleIconImage.match(item);
}
export default isByteAppleIconImage;
