import { isIP as netIsIP } from "node:net";
/**
 * Determine the IP address version of the item. IPv4 address must be in dot-decimal notation with no leading zeroes.
 * @param {string} item Item that need to determine.
 * @returns {number} IP address version of the item.
 * - **`4`:** IPv4.
 * - **`6`:** IPv6.
 * - **`0`:** Unknown.
 * @example
 * getIPVersion("::1");
 * //=> 6
 * @example
 * getIPVersion("127.0.0.1");
 * //=> 4
 * @example
 * getIPVersion("127.000.000.001");
 * //=> 0
 * @example
 * getIPVersion("127.0.0.1/24");
 * //=> 0
 * @example
 * getIPVersion("fhqwhgads");
 * //=> 0
 */
export function resolveIPVersion(item: string): number {
	return netIsIP(item);
}
export default resolveIPVersion;
