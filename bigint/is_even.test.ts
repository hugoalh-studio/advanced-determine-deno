import { assertEquals } from "https://deno.land/std@0.209.0/assert/assert_equals.ts";
import { isBigIntEven } from "./is_even.ts";
Deno.test("False 1", { permissions: "none" }, () => {
	assertEquals(isBigIntEven(69n), false);
});
Deno.test("True 1", { permissions: "none" }, () => {
	assertEquals(isBigIntEven(64n), true);
});
