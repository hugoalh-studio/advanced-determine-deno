import { BytesMatcher } from "./_matcher.ts";
export const bytesMatcherPCAPNG: BytesMatcher = new BytesMatcher("0A 0D 0D 0A");
/**
 * **\[EXPERIMENTAL\]** Determine whether the byte is PCAP Next Generation Dump (`.pcapng`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isBytePCAPNG(item: Uint8Array): boolean {
	return bytesMatcherPCAPNG.test(item);
}
export default isBytePCAPNG;
