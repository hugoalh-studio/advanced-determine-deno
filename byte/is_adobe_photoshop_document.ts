import { BytesMatcher } from "./_matcher.ts";
export const bytesMatcherAdobePhotoshopDocument: BytesMatcher = new BytesMatcher().addExactGroupHex(0, "38 42 50 53").freeze();
/**
 * Determine whether the byte is Adobe Photoshop Document (`.psd`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteAdobePhotoshopDocument(item: Uint8Array): boolean {
	return bytesMatcherAdobePhotoshopDocument.match(item);
}
export default isByteAdobePhotoshopDocument;
