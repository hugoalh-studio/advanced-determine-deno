import { BytesMatcher } from "./_matcher.ts";
export const bytesMatcherHEIC: BytesMatcher = new BytesMatcher({
	offset: 4,
	pattern: "66 74 79 70 68 65 69 63"
});
/**
 * **\[EXPERIMENTAL\]** Determine whether the byte is HEIC (High Efficiency Image Container) (`.heic`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteHEIC(item: Uint8Array): boolean {
	return bytesMatcherHEIC.test(item);
}
export default isByteHEIC;
