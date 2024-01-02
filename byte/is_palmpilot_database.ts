import { BytesMatcher } from "./_matcher.ts";
export const bytesMatcherPalmPilotDatabase: BytesMatcher = new BytesMatcher({
	offset: 11,
	pattern: "00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
});
/**
 * **\[EXPERIMENTAL\]** Determine whether the byte is PalmPilot Database/Document (`.pdb`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isBytePalmPilotDatabase(item: Uint8Array): boolean {
	return bytesMatcherPalmPilotDatabase.test(item);
}
export default isBytePalmPilotDatabase;
