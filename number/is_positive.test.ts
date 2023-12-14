import { assertEquals } from "https://deno.land/std@0.209.0/assert/assert_equals.ts";
import { isNumberPositive } from "./is_positive.ts";
Deno.test("False 1", { permissions: "none" }, () => {
	assertEquals(isNumberPositive(-64), false);
});
Deno.test("True 1", { permissions: "none" }, () => {
	assertEquals(isNumberPositive(69), true);
});
