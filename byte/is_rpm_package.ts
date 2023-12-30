import { isByteMatch } from "./_matcher.ts";
/**
 * Determine whether the item is RedHat Package Manager (RPM) package (`.rpm`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteRPMPackage(item: Uint8Array): boolean {
	return isByteMatch(item, "ED AB EE DB");
}
export default isByteRPMPackage;
