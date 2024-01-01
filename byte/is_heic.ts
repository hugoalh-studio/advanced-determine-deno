import { BytesMatcher } from "./_matcher.ts";
export const bytesMatcherHEIC: BytesMatcher = new BytesMatcher().addExactStartGroupHex(4, "66 74 79 70 68 65 69 63").freeze();
/**
 * **\[EXPERIMENTAL\]** Determine whether the byte is HEIC (High Efficiency Image Container) (`.heic`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteHEIC(item: Uint8Array): boolean {
	return bytesMatcherHEIC.match(item);
}
export default isByteHEIC;
