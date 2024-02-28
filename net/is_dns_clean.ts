import { shuffleArray } from "https://deno.land/x/shuffle_array@v1.0.7/mod.ts";
import { resolveIPVersion } from "./ip_version.ts";
/**
 * Supported DNS record type in function `isDNSClean`.
 */
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
			} catch (error: unknown) {
				if (error instanceof Deno.errors.NotFound) {
					continue;
				}
				throw error;
			}
		}
		return [];
	}
}
/**
 * Enum of the DNS provider name.
 */
export enum DNSProviderName {
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
	Quad9 = "quad9",
	quad101 = "quad101",
	Quad101 = "quad101"
}
const dnsProvidersList: Map<`${DNSProviderName}`, DNSResolveFromProvider> = new Map<`${DNSProviderName}`, DNSResolveFromProvider>([
	["adguard", new DNSResolveFromProvider(["94.140.14.140", "94.140.14.141", "2a10:50c0::1:ff", "2a10:50c0::2:ff"])],
	["cloudflare", new DNSResolveFromProvider(["1.1.1.1", "1.0.0.1", "2606:4700:4700::64", "2606:4700:4700::6400", "2606:4700:4700::1111", "2606:4700:4700::1001"])],
	["google", new DNSResolveFromProvider(["8.8.8.8", "8.8.4.4", "2001:4860:4860::6464", "2001:4860:4860::64", "2001:4860:4860::8888", "2001:4860:4860::8844"])],
	["gcore", new DNSResolveFromProvider(["95.85.95.85", "2.56.220.2", "2a03:90c0:999d::1", "2a03:90c0:9992::1"])],
	["mullvad", new DNSResolveFromProvider(["194.242.2.2", "2a07:e340::2"])],
	["opendns", new DNSResolveFromProvider(["208.67.222.2", "208.67.220.2", "2620:0:ccc::2", "2620:0:ccd::2"])],
	["quad9", new DNSResolveFromProvider(["9.9.9.10", "149.112.112.10", "2620:fe::10", "2620:fe::fe:10"])],
	["quad101", new DNSResolveFromProvider(["101.101.101.101", "101.102.103.104", "2001:de4::101", "2001:de4::102"])]
]);
/**
 * Determine whether the DNS query is clean (i.e.: not hijack, poison, or redirect). Only record types of "A", "AAAA", "ANAME", "CNAME", "NS", and "PTR" are supported.
 * 
 * **Require Permission:**
 * - Network (`allow-net`): All
 * @param {string} query Query.
 * @param {DNSCleanSupportRecordType} recordType Record type.
 * @param {number | (DNSProviderName | keyof typeof DNSProviderName)[]} [samples=2] Number of samples, or array of DNS providers.
 * @returns {Promise<boolean>} Determine result.
 */
export async function isDNSClean(query: string, recordType: DNSCleanSupportRecordType, samples: number | (DNSProviderName | keyof typeof DNSProviderName)[] = 2): Promise<boolean> {
	const dnsProviders: DNSResolveFromProvider[] = ((): DNSResolveFromProvider[] => {
		if (Array.isArray(samples)) {
			return Array.from<DNSResolveFromProvider>(new Set<DNSResolveFromProvider>(samples.map((sample: DNSProviderName | keyof typeof DNSProviderName): DNSResolveFromProvider => {
				const value: DNSResolveFromProvider | undefined = dnsProvidersList.get(DNSProviderName[sample]);
				if (typeof value === "undefined") {
					throw new RangeError(`\`${sample}\` is not a valid DNS provider! Only accept these values: ${Array.from<string>(new Set(Object.keys(DNSProviderName).sort()).values()).join(", ")}`);
				}
				return value;
			})).values());
		}
		if (samples !== Infinity && !(Number.isSafeInteger(samples) && samples > 0)) {
			throw new RangeError(`Argument \`samples\` is not \`Infinity\`, or a number which is integer, safe, and > 0!`);
		}
		return shuffleArray(Array.from<DNSResolveFromProvider>(dnsProvidersList.values())).slice(0, samples);
	})();
	const resultsLocal: string[] = await Deno.resolveDns(query, recordType).catch((reason: unknown): string[] => {
		if (reason instanceof Deno.errors.NotFound) {
			return [];
		}
		throw reason;
	});
	const resultsRemote: string[] = (await Promise.all(dnsProviders.map((dnsProvider: DNSResolveFromProvider): Promise<string[]> => {
		return dnsProvider.resolve(query, recordType);
	}))).flat();
	if (resultsLocal.length === 0 && resultsRemote.length === 0) {
		return true;
	}
	for (const resultLocal of resultsLocal) {
		if (resultsRemote.includes(resultLocal)) {
			return true;
		}
	}
	return false;
}
export default isDNSClean;
