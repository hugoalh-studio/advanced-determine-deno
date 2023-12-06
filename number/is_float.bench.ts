import { isNumberFloat } from "./is_float.ts";
Deno.bench("1", { permissions: "none" }, () => {
	isNumberFloat(69);
});
Deno.bench("2", { permissions: "none" }, () => {
	isNumberFloat(-69);
});
Deno.bench("3", { permissions: "none" }, () => {
	isNumberFloat(6.4);
});
Deno.bench("4", { permissions: "none" }, () => {
	isNumberFloat(-6.4);
});
