import { isObjectPlain } from "./is_plain.ts";
Deno.bench("1", { permissions: "none" }, () => {
	isObjectPlain(new Map([
		["a", 1],
		["b", 2],
		["c", 3]
	]));
});
Deno.bench("2", { permissions: "none" }, () => {
	isObjectPlain({
		a: 1,
		b: 2,
		c: 3
	});
});
