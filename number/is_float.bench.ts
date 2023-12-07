import { isNumberFloat } from "./is_float.ts";
Deno.bench("False 1", { permissions: "none" }, () => {
	isNumberFloat(69);
});
Deno.bench("False 2", { permissions: "none" }, () => {
	isNumberFloat(-69);
});
Deno.bench("True 1", { permissions: "none" }, () => {
	isNumberFloat(6.4);
});
Deno.bench("True 2", { permissions: "none" }, () => {
	isNumberFloat(-6.4);
});
