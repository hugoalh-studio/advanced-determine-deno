import { assertEquals } from "https://deno.land/std@0.208.0/assert/assert_equals.ts";
import { isBigIntSafe } from "./is_safe.ts";
Deno.test("False 1", { permissions: "none" }, () => {
	assertEquals(isBigIntSafe(97546105778997100000n), false);
});
Deno.test("True 1", { permissions: "none" }, () => {
	assertEquals(isBigIntSafe(69n), true);
});
