import { BytesMatcher } from "./_matcher.ts";
export const bytesMatcherWAD: BytesMatcher = new BytesMatcher().addExactStartGroupHex(0, "49 57 41 44").freeze();
/**
 * **\[EXPERIMENTAL\]** Determine whether the byte is WAD (`.wad`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteWAD(item: Uint8Array): boolean {
	return bytesMatcherWAD.match(item);
}
export default isByteWAD;
