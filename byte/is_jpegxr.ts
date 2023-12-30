import { isByteMatch } from "./_matcher.ts";
/**
 * Determine whether the byte is JPEG XR (JPEG extended range) (`.jxr`/`.hdp`/`.wdp`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteJPEGXR(item: Uint8Array): boolean {
	return isByteMatch(item, "49 49 BC");
}
export default isByteJPEGXR;
