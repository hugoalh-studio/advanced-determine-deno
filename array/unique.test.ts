import { assertEquals } from "TEST/assert_equals.ts";
import { isArrayUnique } from "./is_unique.ts";
import { isArrayUniqueReference } from "./is_unique_reference.ts";
const sample1 = { foo: "bar" };
Deno.test("Unique False 1", { permissions: "none" }, () => {
	assertEquals(isArrayUnique([sample1, sample1]), false);
});
Deno.test("Unique False 2", { permissions: "none" }, () => {
	assertEquals(isArrayUnique([sample1, { foo: "bar" }]), false);
});
Deno.test("Unique False 3", { permissions: "none" }, () => {
	assertEquals(isArrayUnique([{ foo: "bar" }, { foo: "bar" }]), false);
});
Deno.test("Unique True 1", { permissions: "none" }, () => {
	assertEquals(isArrayUnique([{ foo: "bar" }, { foo: "baz" }]), true);
});
Deno.test("UniqueReference False 1", { permissions: "none" }, () => {
	assertEquals(isArrayUniqueReference([sample1, sample1]), false);
});
Deno.test("UniqueReference True 1", { permissions: "none" }, () => {
	assertEquals(isArrayUniqueReference([sample1, { foo: "bar" }]), true);
});
Deno.test("UniqueReference True 2", { permissions: "none" }, () => {
	assertEquals(isArrayUniqueReference([{ foo: "bar" }, { foo: "bar" }]), true);
});
