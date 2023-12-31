import { BytesMatcher } from "./_matcher.ts";
const matcher: BytesMatcher = new BytesMatcher().addExactHex(0, "89 50 4E 47 0D 0A 1A 0A");
/**
 * Determine whether the byte is PNG (Portable Network Graphics) (`.png`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isBytePNG(item: Uint8Array): boolean {
	return matcher.match(item);
}
export default isBytePNG;
