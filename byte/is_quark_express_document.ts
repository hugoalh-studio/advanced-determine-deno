import { BytesMatcher } from "./_matcher.ts";
const matcher: BytesMatcher = new BytesMatcher().addExactHex(0, "00 00").addExactHex(2, "49 49", "4D 4D").addExactHex(4, "58 50 52");
/**
 * Determine whether the byte is Quark Express document (`.qxd`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteQuarkExpressDocument(item: Uint8Array): boolean {
	return matcher.match(item);
}
export default isByteQuarkExpressDocument;
