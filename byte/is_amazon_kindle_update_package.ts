import { BytesMatcher } from "./_matcher.ts";
export const bytesMatcherAmazonKindleUpdatePackage: BytesMatcher = new BytesMatcher().addExactStartGroupHex(0, "53 50 30 31").freeze();
/**
 * **\[EXPERIMENTAL\]** Determine whether the byte is Amazon Kindle Update Package (`.bin`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteAmazonKindleUpdatePackage(item: Uint8Array): boolean {
	return bytesMatcherAmazonKindleUpdatePackage.match(item);
}
export default isByteAmazonKindleUpdatePackage;
