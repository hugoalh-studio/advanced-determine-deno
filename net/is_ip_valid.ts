import { isIP as netIsIP, isIPv4 as netIsIPv4, isIPv6 as netIsIPv6 } from "node:net";
/**
 * Determine whether the item is a valid IP address. IPv4 address must be in dot-decimal notation with no leading zeroes.
 * @param {string} item Item that need to determine.
 * @param {4 | 6 | "*" | "4" | "6"} [version="*"] IP address version.
 * @returns {boolean} Determine result.
 * @example
 * isIPValid("::1");
 * //=> true
 * @example
 * isIPValid("127.0.0.1");
 * //=> true
 * @example
 * isIPValid("127.000.000.001");
 * //=> false
 * @example
 * isIPValid("127.0.0.1/24");
 * //=> false
 * @example
 * isIPValid("fhqwhgads");
 * //=> false
 * @example
 * isIPValid("127.0.0.1", 4);
 * //=> true
 * @example
 * isIPValid("127.000.000.001", 4);
 * //=> false
 * @example
 * isIPValid("127.0.0.1/24", 4);
 * //=> false
 * @example
 * isIPValid("fhqwhgads", 4);
 * //=> false
 * @example
 * isIPValid("::1", 6);
 * //=> true
 * @example
 * isIPValid("fhqwhgads", 6);
 * //=> false
 */
export function isIPValid(item: string, version: 4 | 6 | "*" | "4" | "6" = "*"): boolean {
	switch (version) {
		case "4":
		case 4:
			return netIsIPv4(item);
		case "6":
		case 6:
			return netIsIPv6(item);
		default:
			return (netIsIP(item) !== 0);
	}
}
export default isIPValid;
