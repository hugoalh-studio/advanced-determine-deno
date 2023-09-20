import { assertEquals } from "https://deno.land/std@0.202.0/assert/assert_equals.ts";
import { isNumberNegative } from "./is_negative.ts";
Deno.test("False 1", { permissions: "none" }, () => {
	assertEquals(isNumberNegative(69), false);
});
Deno.test("True 1", { permissions: "none" }, () => {
	assertEquals(isNumberNegative(-64), true);
});
