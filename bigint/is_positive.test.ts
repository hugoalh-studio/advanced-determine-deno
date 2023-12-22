import { assertEquals } from "https://deno.land/std@0.210.0/assert/assert_equals.ts";
import { isBigIntPositive } from "./is_positive.ts";
Deno.test("False 1", { permissions: "none" }, () => {
	assertEquals(isBigIntPositive(-64n), false);
});
Deno.test("True 1", { permissions: "none" }, () => {
	assertEquals(isBigIntPositive(69n), true);
});
