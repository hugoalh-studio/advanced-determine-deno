import { isObjectPlain } from "./is_plain.ts";
Deno.bench("False 1", { permissions: "none" }, () => {
	isObjectPlain(new Map([
		["a", 1],
		["b", 2],
		["c", 3]
	]));
});
Deno.bench("True 1", { permissions: "none" }, () => {
	isObjectPlain({
		a: 1,
		b: 2,
		c: 3
	});
});
