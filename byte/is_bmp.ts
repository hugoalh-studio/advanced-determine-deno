import { isByteMatch } from "./_matcher.ts";
/**
 * Determine whether the byte is BMP (`.bmp`/`.dib`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteBMP(item: Uint8Array): boolean {
	return isByteMatch(item, "42 4D");
}
export default isByteBMP;
