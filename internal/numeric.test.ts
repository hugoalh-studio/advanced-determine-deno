import { assertEquals } from "https://deno.land/std@0.200.0/assert/assert_equals.ts";
import { integralNumericTypeRange } from "./numeric.ts";
Deno.test("IntegralNumericTypeRange Equal 1", () => {
	assertEquals(integralNumericTypeRange("Byte"), [0n, 2n ** 8n - 1n]);
});
