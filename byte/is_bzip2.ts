import { BytesMatcher } from "./_matcher.ts";
const matcher: BytesMatcher = new BytesMatcher().addExactHex(0, "42 5A 68");
/**
 * Determine whether the byte is BZip2 (`.bz2`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteBZip2(item: Uint8Array): boolean {
	return matcher.match(item);
}
export default isByteBZip2;
