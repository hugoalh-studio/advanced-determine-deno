import { BytesMatcher } from "./_matcher.ts";
export const bytesMatcherCanonRAWV2: BytesMatcher = new BytesMatcher("49 49 2A 00 10 00 00 00 43 52");
/**
 * **\[EXPERIMENTAL\]** Determine whether the byte is Canon RAW Version 2 (`.cr2`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteCanonRAWV2(item: Uint8Array): boolean {
	return bytesMatcherCanonRAWV2.test(item);
}
export default isByteCanonRAWV2;
