import { assertEquals } from "https://deno.land/std@0.213.0/assert/assert_equals.ts";
import { isNumberSafe } from "./is_safe.ts";
Deno.test("False 1", { permissions: "none" }, () => {
	assertEquals(isNumberSafe(Number(97546105778997100000n)), false);
});
Deno.test("True 1", { permissions: "none" }, () => {
	assertEquals(isNumberSafe(69), true);
});
