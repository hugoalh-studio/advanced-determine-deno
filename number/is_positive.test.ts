import { assertEquals } from "TEST/assert_equals.ts";
import { isNumberPositive } from "./is_positive.ts";
Deno.test("False 1", { permissions: "none" }, () => {
	assertEquals(isNumberPositive(-64), false);
});
Deno.test("True 1", { permissions: "none" }, () => {
	assertEquals(isNumberPositive(69), true);
});
