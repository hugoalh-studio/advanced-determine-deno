import { BytesMatcher } from "./_matcher.ts";
export const bytesMatcherEPub: BytesMatcher = new BytesMatcher("50 4B 03 04", {
	offset: 30,
	pattern: new TextEncoder().encode("mimetypeapplication/epub+zip")
});
/**
 * **\[EXPERIMENTAL\]** Determine whether the byte is ePUB (Electronic Publication) (`.epub`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteEPub(item: Uint8Array): boolean {
	return bytesMatcherEPub.test(item);
}
export default isByteEPub;
