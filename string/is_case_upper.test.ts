import { assertEquals } from "https://deno.land/std@0.213.0/assert/assert_equals.ts";
import { isStringCaseUpper } from "./is_case_upper.ts";
Deno.test("False 1", { permissions: "none" }, () => {
	assertEquals(isStringCaseUpper("Hello, world!"), false);
});
Deno.test("False 2", { permissions: "none" }, () => {
	assertEquals(isStringCaseUpper("qwerty"), false);
});
Deno.test("True 1", { permissions: "none" }, () => {
	assertEquals(isStringCaseUpper("QWERTY"), true);
});
