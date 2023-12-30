import { isByteMatch } from "./_matcher.ts";
/**
 * Determine whether the byte is ICO (`.ico`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteICO(item: Uint8Array): boolean {
	return isByteMatch(item, "00 00 01 00");
}
export default isByteICO;
