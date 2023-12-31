import { BytesMatcher } from "./_matcher.ts";
const matcher: BytesMatcher = new BytesMatcher().addExactHex(0, "50 4B 03 04").addExactText(30, "mimetypeapplication/epub+zip");
/**
 * Determine whether the byte is ePUB (Electronic Publication) (`.epub`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteEPub(item: Uint8Array): boolean {
	return matcher.match(item);
}
export default isByteEPub;
