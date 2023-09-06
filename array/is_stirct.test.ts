import { assertEquals } from "https://deno.land/std@0.201.0/assert/assert_equals.ts";
import { isArrayStrict } from "./is_strict.ts";
Deno.test("False 1", { permissions: "none" }, () => {
	assertEquals(isArrayStrict("Pattern pattern PATTERN".match(/pattern/giu) ?? []), false);
});
Deno.test("True 1", { permissions: "none" }, () => {
	assertEquals(isArrayStrict([1, 2, 3]), true);
});
