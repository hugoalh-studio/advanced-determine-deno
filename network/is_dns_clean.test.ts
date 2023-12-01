import { isDNSClean } from "./is_dns_clean.ts";
import { isIPValid } from "./is_ip_valid.ts";
const myIP = await fetch("https://api64.ipify.org/", {
	method: "GET",
	redirect: "error"
}).then((response) => {
	return response.text();
});
const isMyIPv4 = isIPValid(myIP, 4);
const isMyIPv6 = isIPValid(myIP, 6);
Deno.test("github.com - A", {
	ignore: !isMyIPv4,
	permissions: {
		net: true
	}
}, async () => {
	void await isDNSClean("github.com", "A");
});
Deno.test("github.com - AAAA", {
	ignore: !isMyIPv6,
	permissions: {
		net: true
	}
}, async () => {
	void await isDNSClean("github.com", "AAAA");
});
Deno.test("google.com - A", {
	ignore: !isMyIPv4,
	permissions: {
		net: true
	}
}, async () => {
	void await isDNSClean("google.com", "A");
});
Deno.test("google.com - AAAA", {
	ignore: !isMyIPv6,
	permissions: {
		net: true
	}
}, async () => {
	void await isDNSClean("google.com", "AAAA");
});
Deno.test("microsoft.com - A", {
	ignore: !isMyIPv4,
	permissions: {
		net: true
	}
}, async () => {
	void await isDNSClean("microsoft.com", "A");
});
Deno.test("microsoft.com - AAAA", {
	ignore: !isMyIPv6,
	permissions: {
		net: true
	}
}, async () => {
	void await isDNSClean("microsoft.com", "AAAA");
});
