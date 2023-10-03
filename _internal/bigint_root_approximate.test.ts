import { assertEquals } from "https://deno.land/std@0.203.0/assert/assert_equals.ts";
import { bigintRootApproximate } from "./bigint_root_approximate.ts";
Deno.test("Main", { permissions: "none" }, async (t) => {
	for (let radicand = 0n; radicand <= BigInt(Number.MAX_SAFE_INTEGER); radicand += 1n) {
		for (let index = 1n; index <= BigInt(Number.MAX_SAFE_INTEGER); index += 1n) {
			const rootNumber = Math.pow(Number(radicand), 1 / Number(index));
			await t.step(`Radicand: ${radicand}; Index: ${index}`, () => {
				const rootBigInt = bigintRootApproximate(radicand, index);
				assertEquals(BigInt(Math.ceil(rootNumber)), rootBigInt.ceil);
				assertEquals(BigInt(Math.floor(rootNumber)), rootBigInt.floor);
			});
		}
	}
});
