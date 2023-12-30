import { isByteMatch } from "./_matcher.ts";
/**
 * Determine whether the byte is Canon RAW Version 2 (`.cr2`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteCanonRAWV2(item: Uint8Array): boolean {
	return isByteMatch(item, "49 49 2A 00 10 00 00 00 43 52");
}
export default isByteCanonRAWV2;
