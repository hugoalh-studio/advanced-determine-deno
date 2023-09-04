import { assertEquals } from "https://deno.land/std@0.201.0/assert/assert_equals.ts";
import { isStringASCII } from "./is_ascii.ts";
import { isStringCaseLower } from "./is_case_lower.ts";
import { isStringCaseUpper } from "./is_case_upper.ts";
import { isStringSingleLine } from "./is_singleline.ts";
const sampleContext = `Wisi sed et at vero eos nostrud volutpat sed stet dignissim sit sanctus in eros.
Et laoreet odio sanctus ea.
Sea in dolores diam tincidunt labore sea stet vero dolor ut est.
At aliquyam diam facilisis lorem et takimata et volutpat eros erat ipsum velit labore sed ea illum.
Dolor lorem sed et volutpat exerci gubergren gubergren tempor quis ea eirmod eos ut dolor autem ipsum accumsan.`;
Deno.test("ASCII False 1", () => {
	assertEquals(isStringASCII("日本語"), false);
});
Deno.test("ASCII True 1", () => {
	assertEquals(isStringASCII("qwe rty"), true);
});
Deno.test("LowerCase Equal 1", () => {
	assertEquals(isStringCaseLower("qwe rty"), true);
});
Deno.test("LowerCase Equal 2", () => {
	assertEquals(isStringCaseLower("Qwe rty"), false);
});
Deno.test("SingleLine Equal 1", () => {
	assertEquals(isStringSingleLine("qwe rty"), true);
});
Deno.test("SingleLine Equal 2", () => {
	assertEquals(isStringSingleLine(sampleContext), false);
});
Deno.test("UpperCase Equal 1", () => {
	assertEquals(isStringCaseUpper("qwe rty"), false);
});
Deno.test("UpperCase Equal 2", () => {
	assertEquals(isStringCaseUpper("Qwe rty"), false);
});
Deno.test("UpperCase Equal 3", () => {
	assertEquals(isStringCaseUpper("QWE RTY"), true);
});
