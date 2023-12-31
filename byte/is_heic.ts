import { BytesMatcher } from "./_matcher.ts";
const matcher: BytesMatcher = new BytesMatcher().addExactHex(4, "66 74 79 70 68 65 69 63");
/**
 * Determine whether the byte is HEIC (High Efficiency Image Container) (`.heic`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteHEIC(item: Uint8Array): boolean {
	return matcher.match(item);
}
export default isByteHEIC;
