import { BytesMatcher } from "./_matcher.ts";
const matcher: BytesMatcher = new BytesMatcher().addExactHex(11, "00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00");
/**
 * Determine whether the byte is PalmPilot Database/Document (`.pdb`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isBytePalmPilotDatabase(item: Uint8Array): boolean {
	return matcher.match(item);
}
export default isBytePalmPilotDatabase;
