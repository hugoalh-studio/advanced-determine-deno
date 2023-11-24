import { assertEquals } from "https://deno.land/std@0.208.0/assert/assert_equals.ts";
import { isNumberEven } from "./is_even.ts";
Deno.test("False 1", { permissions: "none" }, () => {
	assertEquals(isNumberEven(69), false);
});
Deno.test("True 1", { permissions: "none" }, () => {
	assertEquals(isNumberEven(64), true);
});
