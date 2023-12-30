import { isByteMatch } from "./_matcher.ts";
/**
 * Determine whether the byte is Adobe Photoshop Document (`.psd`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteAdobePhotoshopDocument(item: Uint8Array): boolean {
	return isByteMatch(item, "38 42 50 53");
}
export default isByteAdobePhotoshopDocument;
