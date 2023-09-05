import { isJSON } from "./is_json.ts";
Deno.bench("1", { permissions: "none" }, () => {
	isJSON({
		a: 1,
		b: 2,
		c: 3,
		d: () => { }
	});
});
Deno.bench("2", { permissions: "none" }, () => {
	isJSON({
		a: 1,
		b: 2,
		c: 3,
		d: new Map()
	});
});
Deno.bench("3", { permissions: "none" }, () => {
	isJSON({
		a: 1,
		b: 2,
		c: 3,
		d: new Set()
	});
});
Deno.bench("4", { permissions: "none" }, () => {
	isJSON(NaN);
});
Deno.bench("5", { permissions: "none" }, () => {
	isJSON(Infinity);
});
Deno.bench("6", { permissions: "none" }, () => {
	isJSON(-Infinity);
});
Deno.bench("7", { permissions: "none" }, () => {
	isJSON(undefined);
});
Deno.bench("8", { permissions: "none" }, () => {
	isJSON(void 0);
});
Deno.bench("9", { permissions: "none" }, () => {
	isJSON(this);
});
Deno.bench("10", { permissions: "none" }, () => {
	isJSON(async function* () { });
});
Deno.bench("11", { permissions: "none" }, () => {
	isJSON({
		a: 1,
		b: 2,
		c: 3
	});
});
Deno.bench("12", { permissions: "none" }, () => {
	isJSON([1, 2, 3]);
});
