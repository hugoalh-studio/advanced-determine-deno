import { BytesMatcher } from "./_matcher.ts";
export const bytesMatcherTIFF: BytesMatcher = new BytesMatcher().addExactStartGroupHex(0, ["49 49 2A 00", "4D 4D 00 2A"]).freeze();
/**
 * **\[EXPERIMENTAL\]** Determine whether the byte is TIFF (Tagged Image File Format) (`.tif`/`.tiff`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteTIFF(item: Uint8Array): boolean {
	return bytesMatcherTIFF.match(item);
}
export default isByteTIFF;
