import { BytesMatcher } from "./_matcher.ts";
export const bytesMatcherBZip2: BytesMatcher = new BytesMatcher().addExactGroupHex(0, "42 5A 68").freeze();
/**
 * Determine whether the byte is BZip2 (`.bz2`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteBZip2(item: Uint8Array): boolean {
	return bytesMatcherBZip2.match(item);
}
export default isByteBZip2;
