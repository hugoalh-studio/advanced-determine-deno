import { isByteMatch } from "./_matcher.ts";
/**
 * Determine whether the byte is ePUB (Electronic Publication) (`.epub`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteEPub(item: Uint8Array): boolean {
	return (isByteMatch(item, "50 4B 03 04") && item.slice(30, 58).toString() === "mimetypeapplication/epub+zip");
}
export default isByteEPub;
