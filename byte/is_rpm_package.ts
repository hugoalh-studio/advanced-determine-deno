import { BytesMatcher } from "./_matcher.ts";
export const bytesMatcherRPMPackage: BytesMatcher = new BytesMatcher("ED AB EE DB");
/**
 * **\[EXPERIMENTAL\]** Determine whether the byte is RedHat Package Manager (RPM) package (`.rpm`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteRPMPackage(item: Uint8Array): boolean {
	return bytesMatcherRPMPackage.test(item);
}
export default isByteRPMPackage;
