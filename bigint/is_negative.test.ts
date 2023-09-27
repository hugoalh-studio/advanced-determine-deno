import { assertEquals } from "https://deno.land/std@0.203.0/assert/assert_equals.ts";
import { isBigIntNegative } from "./is_negative.ts";
Deno.test("False 1", { permissions: "none" }, () => {
	assertEquals(isBigIntNegative(69n), false);
});
Deno.test("True 1", { permissions: "none" }, () => {
	assertEquals(isBigIntNegative(-64n), true);
});
