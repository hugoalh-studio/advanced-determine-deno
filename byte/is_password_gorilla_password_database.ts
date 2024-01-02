import { BytesMatcher } from "./_matcher.ts";
export const bytesMatcherPasswordGorillaPasswordDatabase: BytesMatcher = new BytesMatcher("50 57 53 33");
/**
 * **\[EXPERIMENTAL\]** Determine whether the byte is Password Gorilla Password Database (`.psafe3`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isBytePasswordGorillaPasswordDatabase(item: Uint8Array): boolean {
	return bytesMatcherPasswordGorillaPasswordDatabase.test(item);
}
export default isBytePasswordGorillaPasswordDatabase;
