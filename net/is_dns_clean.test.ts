import { isDNSClean } from "./is_dns_clean.ts";
import { getIPInfo } from "./ip_info.ts";
const ipInfo = getIPInfo();
const hostnames = new Set([
	"bing.com",
	"dash.deno.com",
	"deno.com",
	"deno.dev",
	"deno.land",
	"discord.com",
	"docs.deno.com",
	"examples.deno.land",
	"github.com",
	"gitlab.com",
	"google.com",
	"microsoft.com",
	"nodejs.org",
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
			void await isDNSClean(hostname, "A");
		});
	}
});
Deno.test("IPv6", {
	ignore: true || ipInfo.externalIPv6 === null,// Disabled due to not all of the tester have IPv6 access.
	permissions: {
		net: true
	}
}, async (t) => {
	for (const hostname of hostnames.values()) {
		await t.step(hostname, async () => {
			void await isDNSClean(hostname, "AAAA");
		});
	}
});
