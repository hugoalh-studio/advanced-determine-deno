import { assertEquals } from "https://deno.land/std@0.201.0/assert/assert_equals.ts";
import { isNumericIntegralType } from "./is_integral_type.ts";
Deno.test("True 1", () => {
	assertEquals(isNumericIntegralType("Byte", 8n), true);
});
