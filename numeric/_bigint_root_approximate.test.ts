import { assertEquals } from "TEST/assert_equals.ts";
import { randomInt } from "node:crypto";
import { bigintRootApproximate } from "./_bigint_root_approximate.ts";
Deno.test("Matrix", { permissions: "none" }, async (t) => {
	const set = new Set();
	while (set.size < 500) {
		const radicandNumber = randomInt(0, 100000000);
		const indexNumber = randomInt(1, 25);
		const token = `${radicandNumber}//${indexNumber}`;
		if (set.has(token)) {
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
