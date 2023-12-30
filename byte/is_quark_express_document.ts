import { isByteMatch } from "./_matcher.ts";
/**
 * Determine whether the byte is Quark Express document (`.qxd`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteQuarkExpressDocument(item: Uint8Array): boolean {
	return (isByteMatch(item, "00 00") && isByteMatch(item, [
		"49 49",
		"4D 4D"
	], 2) && isByteMatch(item, "58 50 52", 4));
}
export default isByteQuarkExpressDocument;
