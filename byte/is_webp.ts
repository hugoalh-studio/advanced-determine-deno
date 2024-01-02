import { BytesMatcher } from "./_matcher.ts";
export const bytesMatcherWebP: BytesMatcher = new BytesMatcher("52 49 46 46", {
	offset: 8,
	pattern: "57 45 42 50"
});
/**
 * **\[EXPERIMENTAL\]** Determine whether the byte is WebP (`.webp`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteWebP(item: Uint8Array): boolean {
	return bytesMatcherWebP.test(item);
}
export default isByteWebP;
