import { BytesMatcher } from "./_matcher.ts";
const matcher: BytesMatcher = new BytesMatcher().addExactHex(0, "49 57 41 44");
/**
 * Determine whether the byte is WAD (`.wad`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteWAD(item: Uint8Array): boolean {
	return matcher.match(item);
}
export default isByteWAD;
