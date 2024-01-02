import { BytesMatcher } from "./_matcher.ts";
export const bytesMatcherQuarkExpressDocument: BytesMatcher = new BytesMatcher("00 00", {
	offset: 2,
	pattern: ["49 49", "4D 4D"]
}, {
	offset: 4,
	pattern: "58 50 52"
});
/**
 * **\[EXPERIMENTAL\]** Determine whether the byte is Quark Express document (`.qxd`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteQuarkExpressDocument(item: Uint8Array): boolean {
	return bytesMatcherQuarkExpressDocument.test(item);
}
export default isByteQuarkExpressDocument;
