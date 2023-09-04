import { assertEquals } from "https://deno.land/std@0.201.0/assert/assert_equals.ts";
import { isNumberEven } from "./is_even.ts"
Deno.test("False 1", () => {
	assertEquals(isNumberEven(69), false);
});
Deno.test("True 1", () => {
	assertEquals(isNumberEven(64), true);
});
