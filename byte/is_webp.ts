import { BytesMatcher } from "./_matcher.ts";
const matcher: BytesMatcher = new BytesMatcher().addExactHex(0, "52 49 46 46").addExactHex(8, "57 45 42 50");
/**
 * Determine whether the byte is WebP (`.webp`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteWebP(item: Uint8Array): boolean {
	return matcher.match(item);
}
export default isByteWebP;
