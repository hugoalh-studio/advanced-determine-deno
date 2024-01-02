import { BytesMatcher } from "./_matcher.ts";
export const bytesMatcherCDI: BytesMatcher = new BytesMatcher({
	offset: 0x5EAC9,
	pattern: "43 44 30 30 31"
});
/**
 * **\[EXPERIMENTAL\]** Determine whether the byte is CD-i CD image file (`.cdi`) format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteCDI(item: Uint8Array): boolean {
	return bytesMatcherCDI.test(item);
}
export default isByteCDI;
