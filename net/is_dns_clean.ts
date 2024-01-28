import { shuffleArray } from "https://deno.land/x/shuffle_array@v1.0.7/mod.ts";
const dnsProvidersIPv4: Set<string> = new Set<string>([
	/* Cloudflare */"1.0.0.1",
	/* Cloudflare */"1.1.1.1",
	/* Google */"8.8.4.4",
	/* Google */"8.8.8.8",
	/* OpenDNS */"208.67.220.2",
	/* OpenDNS */"208.67.222.2"
]);
const dnsProvidersIPv6: Set<string> = new Set<string>([
	/* Cloudflare */"2606:4700:4700::64",
	/* Cloudflare */"2606:4700:4700::1001",
	/* Cloudflare */"2606:4700:4700::1111",
	/* Cloudflare */"2606:4700:4700::6400",
	/* Google */"2001:4860:4860::64",
	/* Google */"2001:4860:4860::6464",
	/* Google */"2001:4860:4860::8844",
	/* Google */"2001:4860:4860::8888",
	/* OpenDNS */"2620:0:ccc::2",
	/* OpenDNS */"2620:0:ccd::2"
]);
/**
 * Determine whether the DNS query is clean (i.e.: not hijack, poison, or redirect). Only "A" and "AAAA" record types are supported.
 * 
 * **Require Permission:**
 * - Network (`allow-net`): All
 * @param {string | URL} query
 * @param {"A" | "AAAA"} recordType
 * @param {number} [samples=2] Number of samples.
 * @returns {Promise<boolean>} Determine result.
 */
export async function isDNSClean(query: string | URL, recordType: "A" | "AAAA", samples = 2): Promise<boolean> {
	const queryResolve: string = (typeof query === "string") ? query : query.hostname;
	if (!(Number.isSafeInteger(samples) && samples > 0)) {
		throw new RangeError(`Argument \`samples\` is not a number which is integer, safe, and > 0!`);
	}
	const resultsLocal: string[] = await Deno.resolveDns(queryResolve, recordType).catch((): string[] => {
		return [];
	});
	const dnsProviders: string[] = shuffleArray(Array.from((recordType === "AAAA" ? dnsProvidersIPv6 : dnsProvidersIPv4).values()));
	const resultsRemote: string[] = [];
	for (let count = 0, index = 0; count < samples && index < dnsProviders.length; count += 1, index += 1) {
		resultsRemote.push(...await Deno.resolveDns(queryResolve, recordType, { nameServer: { ipAddr: dnsProviders[index] } }).catch((): string[] => {
			count -= 1;
			return [];
		}));
	}
	for (const resultClient of resultsLocal) {
		if (resultsRemote.includes(resultClient)) {
			return true;
		}
	}
	return false;
}
export default isDNSClean;
