import { assertEquals } from "https://deno.land/std@0.201.0/assert/assert_equals.ts";
import { isNumericPrime } from "./is_prime.ts";
Deno.test("False 1", { permissions: "none" }, () => {
	assertEquals(isNumericPrime(9876), false);
});
Deno.test("False 2", { permissions: "none" }, () => {
	assertEquals(isNumericPrime(8n), false);
});
Deno.test("True 1", { permissions: "none" }, () => {
	assertEquals(isNumericPrime(17), true);
});
Deno.test("True 2", { permissions: "none" }, () => {
	assertEquals(isNumericPrime(23n), true);
});
