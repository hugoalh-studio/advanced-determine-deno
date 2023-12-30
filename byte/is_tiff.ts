import { isByteMatch } from "./_matcher.ts";
/**
 * Determine whether the item is Tagged Image File Format (TIFF) (`.tif`/`.tiff`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteTiff(item: Uint8Array): boolean {
	return isByteMatch(item, [
		"49 49 2A 00",
		"4D 4D 00 2A"
	]);
}
export default isByteTiff;
