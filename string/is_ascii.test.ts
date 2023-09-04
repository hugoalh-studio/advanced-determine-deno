import { assertEquals } from "https://deno.land/std@0.201.0/assert/assert_equals.ts";
import { isStringASCII } from "./is_ascii.ts";
Deno.test("False 1", () => {
	assertEquals(isStringASCII("日本語"), false);
});
Deno.test("True 1", () => {
	assertEquals(isStringASCII("Hello, world!"), true);
});
