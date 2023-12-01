import { isDNSClean } from "./is_dns_clean.ts";
import { getIPInfo } from "./ip_info.ts";
const ipInfo = getIPInfo();
const hostnames = new Set([
	"bing.com",
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
			void await isDNSClean(hostname, "A");
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
			void await isDNSClean(hostname, "AAAA");
		});
	}
});
