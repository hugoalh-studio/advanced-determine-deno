import { assertEquals } from "https://deno.land/std@0.200.0/assert/assert_equals.ts";
import { JSONFilter } from "./json.ts";
Deno.test("Equal 1", () => {
	assertEquals(new JSONFilter().test({}), false);
});
Deno.test("Equal 2", () => {
	assertEquals(new JSONFilter().test({ number: 1 }), true);
});
Deno.test("Equal 3", () => {
	assertEquals(new JSONFilter().test({ magic: () => { console.log("Test!") } }), false);
});
Deno.test("Equal 4", () => {
	assertEquals(new JSONFilter().testStringify("{}"), false);
});
Deno.test("Equal 5", () => {
	assertEquals(new JSONFilter().testStringify("word"), false);
});
Deno.test("Equal 6", () => {
	assertEquals(new JSONFilter().testStringify("{ \"number\": 1 }"), true);
});
