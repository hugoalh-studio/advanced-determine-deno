import { assertEquals } from "https://deno.land/std@0.199.0/assert/assert_equals.ts";
import { isStringASCII, isStringLowerCase, isStringMultipleLine, isStringSingleLine, isStringUpperCase } from "./string.ts";
Deno.test("ASCII Equal 1", () => {
	assertEquals(isStringASCII("qwe rty"), true);
});
Deno.test("ASCII Equal 2", () => {
	assertEquals(isStringASCII("日本語"), false);
});
Deno.test("LowerCase Equal 1", () => {
	assertEquals(isStringLowerCase("qwe rty"), true);
});
Deno.test("LowerCase Equal 2", () => {
	assertEquals(isStringLowerCase("Qwe rty"), false);
});
Deno.test("MultipleLine Equal 1", () => {
	assertEquals(isStringMultipleLine("qwe rty"), false);
});
Deno.test("MultipleLine Equal 2", () => {
	assertEquals(isStringMultipleLine(`Wisi sed et at vero eos nostrud volutpat sed stet dignissim sit sanctus in eros.
Et laoreet odio sanctus ea.
Sea in dolores diam tincidunt labore sea stet vero dolor ut est.
At aliquyam diam facilisis lorem et takimata et volutpat eros erat ipsum velit labore sed ea illum.
Dolor lorem sed et volutpat exerci gubergren gubergren tempor quis ea eirmod eos ut dolor autem ipsum accumsan.`), true);
});
Deno.test("SingleLine Equal 1", () => {
	assertEquals(isStringSingleLine("qwe rty"), true);
});
Deno.test("SingleLine Equal 2", () => {
	assertEquals(isStringSingleLine(`Wisi sed et at vero eos nostrud volutpat sed stet dignissim sit sanctus in eros.
Et laoreet odio sanctus ea.
Sea in dolores diam tincidunt labore sea stet vero dolor ut est.
At aliquyam diam facilisis lorem et takimata et volutpat eros erat ipsum velit labore sed ea illum.
Dolor lorem sed et volutpat exerci gubergren gubergren tempor quis ea eirmod eos ut dolor autem ipsum accumsan.`), false);
});
Deno.test("UpperCase Equal 1", () => {
	assertEquals(isStringUpperCase("qwe rty"), false);
});
Deno.test("UpperCase Equal 2", () => {
	assertEquals(isStringUpperCase("Qwe rty"), false);
});
Deno.test("UpperCase Equal 3", () => {
	assertEquals(isStringUpperCase("QWE RTY"), true);
});
