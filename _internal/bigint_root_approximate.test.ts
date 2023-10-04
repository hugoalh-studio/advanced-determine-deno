import { assertEquals } from "https://deno.land/std@0.203.0/assert/assert_equals.ts";
import { randomInt } from "node:crypto";
import { bigintRootApproximate } from "./bigint_root_approximate.ts";
Deno.test("True Matrix 1", { permissions: "none" }, async (t) => {
	const set = new Set();
	for (let times = 0; times < 10000; times += 1) {
		const radicandNumber = randomInt(0, 100000000);
		const indexNumber = randomInt(1, 100);
		const token = `${radicandNumber}//${indexNumber}`;
		if (set.has(token)) {
			times -= 1;
			continue;
		}
		set.add(token);
		await t.step(`Radicand: ${radicandNumber}; Index: ${indexNumber}`, () => {
			const rootNumber = Math.pow(radicandNumber, 1 / indexNumber);
			const rootBigInt = bigintRootApproximate(BigInt(radicandNumber), BigInt(indexNumber));
			assertEquals(BigInt(Math.ceil(rootNumber)), rootBigInt.ceil);
			assertEquals(BigInt(Math.floor(rootNumber)), rootBigInt.floor);
		});
	}
});
