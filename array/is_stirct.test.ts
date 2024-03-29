import { assertEquals } from "TEST/assert_equals.ts";
import { isArrayStrict } from "./is_strict.ts";
Deno.test("False 1", { permissions: "none" }, () => {
	assertEquals(isArrayStrict(Object.freeze([1, 2, 3, "foo", "bar", "baz"]) as unknown[]), false);
});
Deno.test("True 1", { permissions: "none" }, () => {
	assertEquals(isArrayStrict([1, 2, 3, "foo", "bar", "baz"]), true);
});
