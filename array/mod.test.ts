import { assertEquals } from "https://deno.land/std@0.201.0/assert/assert_equals.ts";
import { isArrayUnique } from "./is_unique.ts";
import { isArrayUniqueReference } from "./is_unique_reference.ts";
const element1 = { foo: "bar" };
Deno.test("Unique False 1", () => {
	assertEquals(isArrayUnique([element1, element1]), false);
});
Deno.test("Unique False 2", () => {
	assertEquals(isArrayUnique([{ foo: "bar" }, { foo: "bar" }]), false);
});
Deno.test("Unique True 1", () => {
	assertEquals(isArrayUnique([1, 2, 3]), true);
});
Deno.test("UniqueReference False 1", () => {
	assertEquals(isArrayUniqueReference([element1, element1]), false);
});
Deno.test("UniqueReference True 1", () => {
	assertEquals(isArrayUniqueReference([{ foo: "bar" }, { foo: "bar" }]), true);
});
