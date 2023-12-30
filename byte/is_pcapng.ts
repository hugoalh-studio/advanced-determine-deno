import { isByteMatch } from "./_matcher.ts";
/**
 * Determine whether the item is PCAP Next Generation Dump (`.pcapng`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isBytePCAPNG(item: Uint8Array): boolean {
	return isByteMatch(item, "0A 0D 0D 0A");
}
export default isBytePCAPNG;
