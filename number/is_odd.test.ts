import { assertEquals } from "TEST/assert_equals.ts";
import { isNumberOdd } from "./is_odd.ts";
Deno.test("False 1", { permissions: "none" }, () => {
	assertEquals(isNumberOdd(64), false);
});
Deno.test("True 1", { permissions: "none" }, () => {
	assertEquals(isNumberOdd(69), true);
});
