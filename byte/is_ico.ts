import { BytesMatcher } from "./_matcher.ts";
export const bytesMatcherICO: BytesMatcher = new BytesMatcher().addExactStartGroupHex(0, "00 00 01 00").freeze();
/**
 * **\[EXPERIMENTAL\]** Determine whether the byte is ICO (`.ico`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteICO(item: Uint8Array): boolean {
	return bytesMatcherICO.match(item);
}
export default isByteICO;
