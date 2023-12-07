import { assertEquals } from "https://deno.land/std@0.208.0/assert/assert_equals.ts";
import { StringDissector } from "./dissect.ts";
const sample1 = "Vel ex sit est sit est tempor enim et voluptua consetetur gubergren gubergren ut.";
const sample2 = "🤝💑💏👪👨‍👩‍👧‍👦👩‍👦👩‍👧‍👦🧑‍🤝‍🧑";
Deno.test("1", { permissions: "none" }, () => {
	assertEquals(Array.from(new StringDissector().dissectExtend(sample1)).map((value) => {
		return value.value;
	}), ["Vel", " ", "ex", " ", "sit", " ", "est", " ", "sit", " ", "est", " ", "tempor", " ", "enim", " ", "et", " ", "voluptua", " ", "consetetur", " ", "gubergren", " ", "gubergren", " ", "ut", "."]);
});
Deno.test("2", { permissions: "none" }, () => {
	assertEquals(Array.from(new StringDissector().dissectExtend(sample2)).map((value) => {
		return value.value;
	}), ["🤝", "💑", "💏", "👪", "👨‍👩‍👧‍👦", "👩‍👦", "👩‍👧‍👦", "🧑‍🤝‍🧑"]);
});
