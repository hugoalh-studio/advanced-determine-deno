import { isDNSClean } from "./is_dns_clean.ts";
import { resolveIPVersion } from "./ip_version.ts";
const myIPVersion = await fetch("https://api64.ipify.org/", {
	method: "GET",
	redirect: "error"
}).then((response) => {
	return response.text();
}).then((ip) => {
	return resolveIPVersion(ip);
});
Deno.test("github.com - A", {
	ignore: myIPVersion !== 4,
	permissions: {
		net: true
	}
}, async () => {
	void await isDNSClean("github.com", "A");
});
Deno.test("github.com - AAAA", {
	ignore: myIPVersion !== 6,
	permissions: {
		net: true
	}
}, async () => {
	void await isDNSClean("github.com", "AAAA");
});
Deno.test("google.com - A", {
	ignore: myIPVersion !== 4,
	permissions: {
		net: true
	}
}, async () => {
	void await isDNSClean("google.com", "A");
});
Deno.test("google.com - AAAA", {
	ignore: myIPVersion !== 6,
	permissions: {
		net: true
	}
}, async () => {
	void await isDNSClean("google.com", "AAAA");
});
Deno.test("microsoft.com - A", {
	ignore: myIPVersion !== 4,
	permissions: {
		net: true
	}
}, async () => {
	void await isDNSClean("microsoft.com", "A");
});
Deno.test("microsoft.com - AAAA", {
	ignore: myIPVersion !== 6,
	permissions: {
		net: true
	}
}, async () => {
	void await isDNSClean("microsoft.com", "AAAA");
});
