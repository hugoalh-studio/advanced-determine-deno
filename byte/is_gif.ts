import { isByteMatch } from "./_matcher.ts";
/**
 * Determine whether the byte is GIF (Graphics Interchange Format) (`.gif`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteGIF(item: Uint8Array): boolean {
	return (isByteMatch(item, "47 49 46 38") && isByteMatch(item, [
		"37",
		"39"
	], 4) && isByteMatch(item, "61", 5));
}
export default isByteGIF;
