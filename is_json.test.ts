import { assertEquals } from "https://deno.land/std@0.201.0/assert/assert_equals.ts";
import { isJSON } from "./is_json.ts";
Deno.test("False 1", () => {
	assertEquals(isJSON({
		a: 1,
		b: 2,
		c: 3,
		d: () => {}
	}), false);
});
Deno.test("False 2", () => {
	assertEquals(isJSON({
		a: 1,
		b: 2,
		c: 3,
		d: new Map()
	}), false);
});
Deno.test("False 3", () => {
	assertEquals(isJSON({
		a: 1,
		b: 2,
		c: 3,
		d: new Set()
	}), false);
});
Deno.test("True 1", () => {
	assertEquals(isJSON({
		a: 1,
		b: 2,
		c: 3
	}), true);
});
Deno.test("True 2", () => {
	assertEquals(isJSON([1, 2, 3]), true);
});
