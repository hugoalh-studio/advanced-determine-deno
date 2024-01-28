import { assertEquals } from "TEST/assert_equals.ts";
import { isBigIntEven } from "./is_even.ts";
Deno.test("False 1", { permissions: "none" }, () => {
	assertEquals(isBigIntEven(69n), false);
});
Deno.test("True 1", { permissions: "none" }, () => {
	assertEquals(isBigIntEven(64n), true);
});
