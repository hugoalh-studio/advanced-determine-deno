import { assertEquals } from "https://deno.land/std@0.208.0/assert/assert_equals.ts";
import regexpIP from "https://esm.sh/ip-regex@^5.0.0";
import { isDNSClean } from "./is_dns_clean.ts";
const myIP = await fetch("https://api64.ipify.org/", {
	method: "GET",
	redirect: "error"
}).then((response) => {
	return response.text();
});
const isMyIPv4 = regexpIP.v4({ exact: true }).test(myIP);
const isMyIPv6 = regexpIP.v6({ exact: true }).test(myIP);
Deno.test("github.com - A", {
	ignore: !isMyIPv4,
	permissions: {
		net: true
	}
}, async () => {
	assertEquals(await isDNSClean("github.com", "A"), true);
});
Deno.test("github.com - AAAA", {
	ignore: !isMyIPv6,
	permissions: {
		net: true
	}
}, async () => {
	assertEquals(await isDNSClean("github.com", "AAAA"), true);
});
Deno.test("google.com - A", {
	ignore: !isMyIPv4,
	permissions: {
		net: true
	}
}, async () => {
	assertEquals(await isDNSClean("google.com", "A"), true);
});
Deno.test("google.com - AAAA", {
	ignore: !isMyIPv6,
	permissions: {
		net: true
	}
}, async () => {
	assertEquals(await isDNSClean("google.com", "AAAA"), true);
});
Deno.test("microsoft.com - A", {
	ignore: !isMyIPv4,
	permissions: {
		net: true
	}
}, async () => {
	assertEquals(await isDNSClean("microsoft.com", "A"), true);
});
Deno.test("microsoft.com - AAAA", {
	ignore: !isMyIPv6,
	permissions: {
		net: true
	}
}, async () => {
	assertEquals(await isDNSClean("microsoft.com", "AAAA"), true);
});
