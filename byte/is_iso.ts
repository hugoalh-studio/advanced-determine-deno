import { BytesMatcher } from "./_matcher.ts";
export const bytesMatcherISO: BytesMatcher = new BytesMatcher().addExactStartGroupHex([0x8001, 0x8801, 0x9001], "43 44 30 30 31").freeze();
/**
 * Determine whether the byte is ISO CD/DVD image file (`.iso`) format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteISO(item: Uint8Array): boolean {
	return bytesMatcherISO.match(item);
}
export default isByteISO;
