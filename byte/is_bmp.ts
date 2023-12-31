import { BytesMatcher } from "./_matcher.ts";
const matcher: BytesMatcher = new BytesMatcher().addExactHex(0, "42 4D");
/**
 * Determine whether the byte is BMP (`.bmp`/`.dib`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteBMP(item: Uint8Array): boolean {
	return matcher.match(item);
}
export default isByteBMP;
