import { assertEquals } from "https://deno.land/std@0.200.0/assert/assert_equals.ts";
import { NumberFilter } from "./number.ts";
Deno.test("Equal 1", () => {
	assertEquals(new NumberFilter().test(NaN), false);
});
Deno.test("Equal 2", () => {
	assertEquals(new NumberFilter().test(1024), true);
});
Deno.test("Equal 3", () => {
	assertEquals(new NumberFilter().test(-10), true);
});
Deno.test("Equal 4", () => {
	assertEquals(new NumberFilter().sign("positive").test(1024), true);
});
Deno.test("Equal 5", () => {
	assertEquals(new NumberFilter({ sign: "positive" }).test(-10), false);
});
