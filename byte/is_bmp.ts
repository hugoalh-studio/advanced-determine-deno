import { BytesMatcher } from "./_matcher.ts";
export const bytesMatcherBMP: BytesMatcher = new BytesMatcher().addExactStartGroupHex(0, "42 4D").freeze();
/**
 * Determine whether the byte is BMP (`.bmp`/`.dib`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteBMP(item: Uint8Array): boolean {
	return bytesMatcherBMP.match(item);
}
export default isByteBMP;
