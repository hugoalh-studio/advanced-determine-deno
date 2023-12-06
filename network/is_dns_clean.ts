import { shuffleArray } from "https://deno.land/x/shuffle_array@v1.0.7/mod.ts";
const servicesIPv4: Set<string> = new Set<string>([
	/* Cloudflare */"1.0.0.1",
	/* Cloudflare */"1.1.1.1",
	/* Google */"8.8.4.4",
	/* Google */"8.8.8.8",
	/* OpenDNS */"208.67.220.2",
	/* OpenDNS */"208.67.222.2"
]);
const servicesIPv6: Set<string> = new Set<string>([
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
	const resultClient: string[] = await Deno.resolveDns(queryResolve, recordType).catch((): string[] => {
		return [];
	});
	const servicesIP: string[] = shuffleArray(Array.from((recordType === "AAAA" ? servicesIPv6 : servicesIPv4).values()));
	const resultServices: string[] = [];
	for (let count = 0, index = 0; count < samples && index < servicesIP.length; count += 1, index += 1) {
		resultServices.push(...await Deno.resolveDns(queryResolve, recordType, { nameServer: { ipAddr: servicesIP[index] } }).catch((): string[] => {
			count -= 1;
			return [];
		}));
	}
	for (const clientValue of resultClient) {
		if (resultServices.includes(clientValue)) {
			return true;
		}
	}
	return false;
}
export default isDNSClean;
