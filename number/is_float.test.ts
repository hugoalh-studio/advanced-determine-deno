import { assertEquals } from "https://deno.land/std@0.212.0/assert/assert_equals.ts";
import { isNumberFloat } from "./is_float.ts";
Deno.test("False 1", { permissions: "none" }, () => {
	assertEquals(isNumberFloat(69), false);
});
Deno.test("False 2", { permissions: "none" }, () => {
	assertEquals(isNumberFloat(-69), false);
});
Deno.test("True 1", { permissions: "none" }, () => {
	assertEquals(isNumberFloat(6.4), true);
});
Deno.test("True 2", { permissions: "none" }, () => {
	assertEquals(isNumberFloat(-6.4), true);
});
