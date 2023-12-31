import { BytesMatcher } from "./_matcher.ts";
const matcher: BytesMatcher = new BytesMatcher().addExactHex(0, "D4 C3 B2 A1", "A1 B2 C3 D4", "4D 3C B2 A1", "A1 B2 3C 4D");
/**
 * Determine whether the byte is Libpcap (`.pcap`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteLibpcap(item: Uint8Array): boolean {
	return matcher.match(item);
}
export default isByteLibpcap;
