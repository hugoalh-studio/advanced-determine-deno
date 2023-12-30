import { isByteMatch } from "./_matcher.ts";
/**
 * Determine whether the item is GIF (`.gif`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteGif(item: Uint8Array): boolean {
	return isByteMatch(item, [
		"47 49 46 38 37 61",
		"47 49 46 38 39 61"
	]);
}
export default isByteGif;
