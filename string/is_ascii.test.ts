import { assertEquals } from "TEST/assert_equals.ts";
import { isStringASCII } from "./is_ascii.ts";
Deno.test("False 1", { permissions: "none" }, () => {
	assertEquals(isStringASCII("日本語"), false);
});
Deno.test("False 2", { permissions: "none" }, () => {
	assertEquals(isStringASCII("👀"), false);
});
Deno.test("True 1", { permissions: "none" }, () => {
	assertEquals(isStringASCII("Hello, world!"), true);
});
Deno.test("True 2", { permissions: "none" }, () => {
	assertEquals(isStringASCII(""), true);
});
