import { isDNSClean } from "./is_dns_clean.ts";
import { getIPInfo } from "./ip_info.ts";
const ipInfo = getIPInfo();
const hostnames = new Set([
	"bing.com",
	"dash.deno.com",
	"deno.com",
	"deno.dev",
	"deno.land",
	"docs.deno.com",
	"examples.deno.land",
	"github.com",
	"google.com",
	"microsoft.com",
	"outlook.com"
]);
Deno.test("IPv4", {
	ignore: ipInfo.externalIPv4 === null,
	permissions: {
		net: true
	}
}, async (t) => {
	for (const hostname of hostnames.values()) {
		await t.step(hostname, async () => {
			try {
				void await isDNSClean(hostname, "A");
			} catch (error) {
				if (!(
					error instanceof Deno.errors.NetworkUnreachable ||
					String(error).search(/network.*?unreachable|unreachable.*?network/iu) !== -1
				)) {
					throw error;
				}
			}
		});
	}
});
Deno.test("IPv6", {
	ignore: ipInfo.externalIPv6 === null,
	permissions: {
		net: true
	}
}, async (t) => {
	for (const hostname of hostnames.values()) {
		await t.step(hostname, async () => {
			try {
				void await isDNSClean(hostname, "AAAA");
			} catch (error) {
				if (!(
					error instanceof Deno.errors.NetworkUnreachable ||
					String(error).search(/network.*?unreachable|unreachable.*?network/iu) !== -1
				)) {
					throw error;
				}
			}
		});
	}
});
