import { assertEquals } from "https://deno.land/std@0.202.0/assert/assert_equals.ts";
import { isObjectPlain } from "./is_plain.ts";
Deno.test("False 1", { permissions: "none" }, () => {
	assertEquals(isObjectPlain(new Map([
		["a", 1],
		["b", 2],
		["c", 3]
	])), false);
});
Deno.test("True 1", { permissions: "none" }, () => {
	assertEquals(isObjectPlain({
		a: 1,
		b: 2,
		c: 3
	}), true);
});
