import { isByteMatch } from "./_matcher.ts";
/**
 * Determine whether the item is Libpcap (`.pcap`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteLibpcap(item: Uint8Array): boolean {
	return isByteMatch(item, [
		"D4 C3 B2 A1",
		"A1 B2 C3 D4",
		"4D 3C B2 A1",
		"A1 B2 3C 4D"
	]);
}
export default isByteLibpcap;
