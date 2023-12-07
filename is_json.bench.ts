import { isJSON } from "./is_json.ts";
Deno.bench("False 1", { permissions: "none" }, () => {
	isJSON({
		a: 1,
		b: 2,
		c: 3,
		d: () => { }
	});
});
Deno.bench("False 2", { permissions: "none" }, () => {
	isJSON({
		a: 1,
		b: 2,
		c: 3,
		d: new Map()
	});
});
Deno.bench("False 3", { permissions: "none" }, () => {
	isJSON({
		a: 1,
		b: 2,
		c: 3,
		d: new Set()
	});
});
Deno.bench("False 4", { permissions: "none" }, () => {
	isJSON(NaN);
});
Deno.bench("False 5", { permissions: "none" }, () => {
	isJSON(Infinity);
});
Deno.bench("False 6", { permissions: "none" }, () => {
	isJSON(-Infinity);
});
Deno.bench("False 7", { permissions: "none" }, () => {
	isJSON(undefined);
});
Deno.bench("False 8", { permissions: "none" }, () => {
	isJSON(void 0);
});
Deno.bench("False 9", { permissions: "none" }, () => {
	isJSON(this);
});
Deno.bench("False 10", { permissions: "none" }, () => {
	isJSON(async function* () { });
});
Deno.bench("True 1", { permissions: "none" }, () => {
	isJSON({
		a: 1,
		b: 2,
		c: 3
	});
});
Deno.bench("True 2", { permissions: "none" }, () => {
	isJSON([1, 2, 3]);
});
