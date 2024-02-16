import { shuffleArray } from "https://deno.land/x/shuffle_array@v1.0.7/mod.ts";
import { resolveIPVersion } from "./ip_version.ts";
export type DNSCleanSupportRecordType = "A" | "AAAA" | "ANAME" | "CNAME" | "NS" | "PTR";
class DNSResolveFromProvider {// This class is private, validators are unnecessary.
	#ipv4: Set<string> = new Set<string>();
	#ipv6: Set<string> = new Set<string>();
	constructor(ipAddresses: string[]) {
		for (const ipAddress of ipAddresses) {
			switch (resolveIPVersion(ipAddress)) {
				case 4:
					this.#ipv4.add(ipAddress);
					break;
				case 6:
					this.#ipv6.add(ipAddress);
					break;
				default:
					// Ignore.
					break;
			}
		}
	}
	async resolve(query: string, recordType: DNSCleanSupportRecordType): Promise<string[]> {
		for (const address of ((recordType === "AAAA") ? this.#ipv6 : this.#ipv4).values()) {
			try {
				return await Deno.resolveDns(query, recordType, { nameServer: { ipAddr: address } });
			} catch {
				// Continue on error.
			}
		}
		return [];
	}
}
enum DNSProviderName {
	adguard = "adguard",
	AdGuard = "adguard",
	cloudflare = "cloudflare",
	Cloudflare = "cloudflare",
	google = "google",
	Google = "google",
	gcore = "gcore",
	Gcore = "gcore",
	mullvad = "mullvad",
	Mullvad = "mullvad",
	opendns = "opendns",
	OpenDNS = "opendns",
	quad9 = "quad9",
	Quad9 = "quad9"
}
const dnsProvidersList: Map<DNSProviderName, DNSResolveFromProvider> = new Map([
	[DNSProviderName.AdGuard, new DNSResolveFromProvider(["94.140.14.140", "94.140.14.141", "2a10:50c0::1:ff", "2a10:50c0::2:ff"])],
	[DNSProviderName.Cloudflare, new DNSResolveFromProvider(["1.1.1.1", "1.0.0.1", "2606:4700:4700::64", "2606:4700:4700::6400", "2606:4700:4700::1111", "2606:4700:4700::1001"])],
	[DNSProviderName.Google, new DNSResolveFromProvider(["8.8.8.8", "8.8.4.4", "2001:4860:4860::6464", "2001:4860:4860::64", "2001:4860:4860::8888", "2001:4860:4860::8844"])],
	[DNSProviderName.Gcore, new DNSResolveFromProvider(["95.85.95.85", "2.56.220.2", "2a03:90c0:999d::1", "2a03:90c0:9992::1"])],
	[DNSProviderName.Mullvad, new DNSResolveFromProvider(["194.242.2.2", "2a07:e340::2"])],
	[DNSProviderName.OpenDNS, new DNSResolveFromProvider(["208.67.222.2", "208.67.220.2", "2620:0:ccc::2", "2620:0:ccd::2"])],
	[DNSProviderName.Quad9, new DNSResolveFromProvider(["9.9.9.10", "149.112.112.10", "2620:fe::10", "2620:fe::fe:10"])]
]);
/*
export async function isDNSClean(query: string | URL, recordType: DNSCleanSupportRecordType, samples?: number): Promise<boolean>;
export async function isDNSClean(query: string | URL, recordType: DNSCleanSupportRecordType, providers?: (DNSProviderName | keyof typeof DNSProviderName)[]): Promise<boolean>;
*/
/**
 * Determine whether the DNS query is clean (i.e.: not hijack, poison, or redirect). Only record types of "A", "AAAA", "ANAME", "CNAME", "NS", and "PTR" are supported.
 * 
 * **Require Permission:**
 * - Network (`allow-net`): All
 * @param {string | URL} query Query.
 * @param {DNSCleanSupportRecordType} recordType Record type.
 * @param {number} [samples=2] Number of samples.
 * @returns {Promise<boolean>} Determine result.
 */
export async function isDNSClean(query: string | URL, recordType: DNSCleanSupportRecordType, samples = 2): Promise<boolean> {
	const queryResolve: string = (typeof query === "string") ? query : query.hostname;
	if (!(Number.isSafeInteger(samples) && samples > 0)) {
		throw new RangeError(`Argument \`samples\` is not a number which is integer, safe, and > 0!`);
	}
	const resultsLocal: string[] = await Deno.resolveDns(queryResolve, recordType);
	const resultsRemote: string[] = (await Promise.all(shuffleArray(Array.from(dnsProvidersList.values())).slice(0, samples).map((dnsProvider: DNSResolveFromProvider): Promise<string[]> => {
		return dnsProvider.resolve(queryResolve, recordType);
	}))).flat();
	for (const resultLocal of resultsLocal) {
		if (resultsRemote.includes(resultLocal)) {
			return true;
		}
	}
	return false;
}
export default isDNSClean;
