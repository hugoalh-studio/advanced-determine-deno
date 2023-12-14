import { assertEquals } from "https://deno.land/std@0.209.0/assert/assert_equals.ts";
import { isNumericPrime } from "./is_prime.ts";
Deno.test("Number False 1", { permissions: "none" }, () => {
	assertEquals(isNumericPrime(9876), false);
});
Deno.test("BigInteger False 1", { permissions: "none" }, () => {
	assertEquals(isNumericPrime(8n), false);
});
Deno.test("Number True 1", { permissions: "none" }, () => {
	assertEquals(isNumericPrime(17), true);
});
Deno.test("BigInteger True 1", { permissions: "none" }, () => {
	assertEquals(isNumericPrime(23n), true);
});
