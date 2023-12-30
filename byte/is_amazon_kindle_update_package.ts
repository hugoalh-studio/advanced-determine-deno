import { isByteMatch } from "./_matcher.ts";
/**
 * Determine whether the item is Amazon Kindle Update Package (`.bin`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteAmazonKindleUpdatePackage(item: Uint8Array): boolean {
	return isByteMatch(item, ["53 50 30 31"]);
}
export default isByteAmazonKindleUpdatePackage;
