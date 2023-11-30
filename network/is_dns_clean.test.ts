import { assertEquals } from "https://deno.land/std@0.208.0/assert/assert_equals.ts";
import { isDNSClean } from "./is_dns_clean.ts";
Deno.test("github.com - A", {
	permissions: {
		net: true
	}
}, async () => {
	assertEquals(await isDNSClean("github.com", "A"), true);
});
Deno.test("github.com - AAAA", {
	permissions: {
		net: true
	}
}, async () => {
	assertEquals(await isDNSClean("github.com", "AAAA"), true);
});
Deno.test("google.com - A", {
	permissions: {
		net: true
	}
}, async () => {
	assertEquals(await isDNSClean("google.com", "A"), true);
});
Deno.test("google.com - AAAA", {
	permissions: {
		net: true
	}
}, async () => {
	assertEquals(await isDNSClean("google.com", "AAAA"), true);
});
