import { BytesMatcher } from "./_matcher.ts";
const matcher: BytesMatcher = new BytesMatcher().addExactHex(0, "0A 0D 0D 0A");
/**
 * Determine whether the byte is PCAP Next Generation Dump (`.pcapng`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isBytePCAPNG(item: Uint8Array): boolean {
	return matcher.match(item);
}
export default isBytePCAPNG;
