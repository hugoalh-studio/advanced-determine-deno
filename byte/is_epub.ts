import { BytesMatcher } from "./_matcher.ts";
export const bytesMatcherEPub: BytesMatcher = new BytesMatcher().addExactStartGroupHex(0, "50 4B 03 04").addExactStartGroupText(30, "mimetypeapplication/epub+zip").freeze();
/**
 * **\[EXPERIMENTAL\]** Determine whether the byte is ePUB (Electronic Publication) (`.epub`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteEPub(item: Uint8Array): boolean {
	return bytesMatcherEPub.match(item);
}
export default isByteEPub;
