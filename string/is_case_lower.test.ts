import { assertEquals } from "https://deno.land/std@0.209.0/assert/assert_equals.ts";
import { isStringCaseLower } from "./is_case_lower.ts";
Deno.test("False 1", { permissions: "none" }, () => {
	assertEquals(isStringCaseLower("Hello, world!"), false);
});
Deno.test("True 1", { permissions: "none" }, () => {
	assertEquals(isStringCaseLower("qwerty"), true);
});
