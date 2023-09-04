import { assertEquals } from "https://deno.land/std@0.201.0/assert/assert_equals.ts";
import { isStringCaseUpper } from "./is_case_upper.ts";
Deno.test("False 1", () => {
	assertEquals(isStringCaseUpper("Hello, world!"), false);
});
Deno.test("False 2", () => {
	assertEquals(isStringCaseUpper("qwerty"), false);
});
Deno.test("True 1", () => {
	assertEquals(isStringCaseUpper("QWERTY"), true);
});
