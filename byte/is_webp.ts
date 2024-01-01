import { BytesMatcher } from "./_matcher.ts";
export const bytesMatcherWebP: BytesMatcher = new BytesMatcher().addExactStartGroupHex(0, "52 49 46 46").addExactStartGroupHex(8, "57 45 42 50").freeze();
/**
 * **\[EXPERIMENTAL\]** Determine whether the byte is WebP (`.webp`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteWebP(item: Uint8Array): boolean {
	return bytesMatcherWebP.match(item);
}
export default isByteWebP;
