import { assertEquals } from "https://deno.land/std@0.200.0/assert/assert_equals.ts";
import { BigIntFilter } from "./bigint.ts";
Deno.test("Equal 1", () => {
	assertEquals(new BigIntFilter().test(NaN), false);
});
Deno.test("Equal 2", () => {
	assertEquals(new BigIntFilter().test(1024n), true);
});
Deno.test("Equal 3", () => {
	assertEquals(new BigIntFilter().test(-10), false);
});
Deno.test("Equal 4", () => {
	assertEquals(new BigIntFilter().sign("positive").test(1024n), true);
});
Deno.test("Equal 5", () => {
	assertEquals(new BigIntFilter().sign("positive").test(-1024n), false);
});
