import { networkInterfaces } from "node:os";
export interface NetworkIPAddressInformation {
	externalIPv4: string | null;
	externalIPv6: string | null;
	internalIPv4: string | null;
	internalIPv6: string | null;
}
/**
 * Get the IP address information of the machine.
 * 
 * **Require Permission:**
 * - System Info (`allow-sys`): All
 * @returns {NetworkIPAddressInformation} IP address information of the machine.
 */
export function getIPInfo(): NetworkIPAddressInformation {
	const result: NetworkIPAddressInformation = {
		externalIPv4: null,
		externalIPv6: null,
		internalIPv4: null,
		internalIPv6: null
	};
	for (const networkInterface of Object.values(networkInterfaces()).flat()) {
		if (typeof networkInterface === "undefined") {
			continue;
		}
		const { address, family, internal } = networkInterface;
		if (internal) {
			if (family === "IPv4") {
				result.internalIPv4 ??= address;
			} else if (family === "IPv6") {
				result.internalIPv6 ??= address;
			}
		} else {
			if (family === "IPv4") {
				result.externalIPv4 ??= address;
			} else if (family === "IPv6") {
				result.externalIPv6 ??= address;
			}
		}
	}
	return result;
}
export {
	getIPInfo as getIPInformation
};
export default getIPInfo;
