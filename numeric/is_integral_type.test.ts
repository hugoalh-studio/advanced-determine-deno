import { assertEquals } from "https://deno.land/std@0.202.0/assert/assert_equals.ts";
import { isNumericIntegralType } from "./is_integral_type.ts";
Deno.test("False 1", { permissions: "none" }, () => {
	assertEquals(isNumericIntegralType("Byte", 9876), false);
});
Deno.test("True 1", { permissions: "none" }, () => {
	assertEquals(isNumericIntegralType("Byte", 8n), true);
});
