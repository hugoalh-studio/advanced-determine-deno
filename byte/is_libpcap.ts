import { BytesMatcher } from "./_matcher.ts";
export const bytesMatcherLibpcap: BytesMatcher = new BytesMatcher(["D4 C3 B2 A1", "A1 B2 C3 D4", "4D 3C B2 A1", "A1 B2 3C 4D"]);
/**
 * **\[EXPERIMENTAL\]** Determine whether the byte is Libpcap (`.pcap`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteLibpcap(item: Uint8Array): boolean {
	return bytesMatcherLibpcap.test(item);
}
export default isByteLibpcap;
