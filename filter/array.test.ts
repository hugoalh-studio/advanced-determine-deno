import { assertEquals } from "https://deno.land/std@0.200.0/assert/assert_equals.ts";
import { ArrayFilter } from "./array.ts";
Deno.test("Equal 1", () => {
	assertEquals(new ArrayFilter().test([]), false);
});
Deno.test("Equal 2", () => {
	assertEquals(new ArrayFilter().allowEmpty().test([]), true);
});
Deno.test("Equal 3", () => {
	assertEquals(new ArrayFilter().unique().test([1, 2, 3]), true);
});
Deno.test("Equal 4", () => {
	assertEquals(new ArrayFilter().test({ 0: 1, 1: 2 }), false);
});
