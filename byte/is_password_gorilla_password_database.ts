import { BytesMatcher } from "./_matcher.ts";
export const bytesMatcherPasswordGorillaPasswordDatabase: BytesMatcher = new BytesMatcher().addExactGroupHex(0, "50 57 53 33").freeze();
/**
 * Determine whether the byte is Password Gorilla Password Database (`.psafe3`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isBytePasswordGorillaPasswordDatabase(item: Uint8Array): boolean {
	return bytesMatcherPasswordGorillaPasswordDatabase.match(item);
}
export default isBytePasswordGorillaPasswordDatabase;
