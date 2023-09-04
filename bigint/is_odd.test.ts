import { assertEquals } from "https://deno.land/std@0.201.0/assert/assert_equals.ts";
import { isBigIntOdd } from "./is_odd.ts"
Deno.test("False 1", () => {
	assertEquals(isBigIntOdd(64n), false);
});
Deno.test("True 1", () => {
	assertEquals(isBigIntOdd(69n), true);
});
