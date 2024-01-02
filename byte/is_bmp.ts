import { BytesMatcher } from "./_matcher.ts";
export const bytesMatcherBMP: BytesMatcher = new BytesMatcher("42 4D");
/**
 * **\[EXPERIMENTAL\]** Determine whether the byte is BMP (`.bmp`/`.dib`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteBMP(item: Uint8Array): boolean {
	return bytesMatcherBMP.test(item);
}
export default isByteBMP;
