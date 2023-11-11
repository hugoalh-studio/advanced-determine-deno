import { assertEquals } from "https://deno.land/std@0.206.0/assert/assert_equals.ts";
import { isBigIntOdd } from "./is_odd.ts";
Deno.test("False 1", { permissions: "none" }, () => {
	assertEquals(isBigIntOdd(64n), false);
});
Deno.test("True 1", { permissions: "none" }, () => {
	assertEquals(isBigIntOdd(69n), true);
});
