import { BytesMatcher } from "./_matcher.ts";
const matcher: BytesMatcher = new BytesMatcher().addExactHex(0, "00 00 01 00");
/**
 * Determine whether the byte is ICO (`.ico`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteICO(item: Uint8Array): boolean {
	return matcher.match(item);
}
export default isByteICO;
