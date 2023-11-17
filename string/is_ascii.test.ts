import { assertEquals } from "https://deno.land/std@0.207.0/assert/assert_equals.ts";
import { isStringASCII } from "./is_ascii.ts";
Deno.test("False 1", { permissions: "none" }, () => {
	assertEquals(isStringASCII("日本語"), false);
});
Deno.test("True 1", { permissions: "none" }, () => {
	assertEquals(isStringASCII("Hello, world!"), true);
});
