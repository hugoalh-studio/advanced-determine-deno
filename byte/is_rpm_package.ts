import { BytesMatcher } from "./_matcher.ts";
const matcher: BytesMatcher = new BytesMatcher().addExactHex(0, "ED AB EE DB");
/**
 * Determine whether the byte is RedHat Package Manager (RPM) package (`.rpm`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteRPMPackage(item: Uint8Array): boolean {
	return matcher.match(item);
}
export default isByteRPMPackage;
