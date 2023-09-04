import { assertEquals } from "https://deno.land/std@0.201.0/assert/assert_equals.ts";
import { isBigIntEven } from "./is_even.ts"
Deno.test("False 1", () => {
	assertEquals(isBigIntEven(69n), false);
});
Deno.test("True 1", () => {
	assertEquals(isBigIntEven(64n), true);
});
