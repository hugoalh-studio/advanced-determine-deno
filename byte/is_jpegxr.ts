import { BytesMatcher } from "./_matcher.ts";
export const bytesMatcherJPEGXR: BytesMatcher = new BytesMatcher("49 49 BC");
/**
 * **\[EXPERIMENTAL\]** Determine whether the byte is JPEG XR (JPEG extended range) (`.jxr`/`.hdp`/`.wdp`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteJPEGXR(item: Uint8Array): boolean {
	return bytesMatcherJPEGXR.test(item);
}
export default isByteJPEGXR;
