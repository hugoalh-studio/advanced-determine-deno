import { assertEquals } from "https://deno.land/std@0.207.0/assert/assert_equals.ts";
import { isJSON } from "./is_json.ts";
Deno.test("False 1", { permissions: "none" }, () => {
	assertEquals(isJSON({
		a: 1,
		b: 2,
		c: 3,
		d: () => { }
	}), false);
});
Deno.test("False 2", { permissions: "none" }, () => {
	assertEquals(isJSON({
		a: 1,
		b: 2,
		c: 3,
		d: new Map()
	}), false);
});
Deno.test("False 3", { permissions: "none" }, () => {
	assertEquals(isJSON({
		a: 1,
		b: 2,
		c: 3,
		d: new Set()
	}), false);
});
Deno.test("False 4", { permissions: "none" }, () => {
	assertEquals(isJSON(NaN), false);
});
Deno.test("False 5", { permissions: "none" }, () => {
	assertEquals(isJSON(Infinity), false);
});
Deno.test("False 6", { permissions: "none" }, () => {
	assertEquals(isJSON(-Infinity), false);
});
Deno.test("False 7", { permissions: "none" }, () => {
	assertEquals(isJSON(undefined), false);
});
Deno.test("False 8", { permissions: "none" }, () => {
	assertEquals(isJSON(void 0), false);
});
Deno.test("False 9", { permissions: "none" }, () => {
	assertEquals(isJSON(this), false);
});
Deno.test("False 10", { permissions: "none" }, () => {
	assertEquals(isJSON(async function* () { }), false);
});
Deno.test("True 1", { permissions: "none" }, () => {
	assertEquals(isJSON({
		a: 1,
		b: 2,
		c: 3
	}), true);
});
Deno.test("True 2", { permissions: "none" }, () => {
	assertEquals(isJSON([1, 2, 3]), true);
});
