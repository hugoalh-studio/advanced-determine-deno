import { BytesMatcher } from "./_matcher.ts";
export const bytesMatcherQuarkExpressDocument: BytesMatcher = new BytesMatcher().addExactGroupHex(0, "00 00").addExactGroupHex(2, "49 49", "4D 4D").addExactGroupHex(4, "58 50 52").freeze();
/**
 * Determine whether the byte is Quark Express document (`.qxd`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteQuarkExpressDocument(item: Uint8Array): boolean {
	return bytesMatcherQuarkExpressDocument.match(item);
}
export default isByteQuarkExpressDocument;
