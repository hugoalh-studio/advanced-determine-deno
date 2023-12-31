import { BytesMatcher } from "./_matcher.ts";
const matcher: BytesMatcher = new BytesMatcher().addExactHex(0, "49 49 BC");
/**
 * Determine whether the byte is JPEG XR (JPEG extended range) (`.jxr`/`.hdp`/`.wdp`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteJPEGXR(item: Uint8Array): boolean {
	return matcher.match(item);
}
export default isByteJPEGXR;
