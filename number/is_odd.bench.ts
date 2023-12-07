import { isNumberOdd } from "./is_odd.ts";
Deno.bench("False 1", { permissions: "none" }, () => {
	isNumberOdd(64);
});
Deno.bench("True 1", { permissions: "none" }, () => {
	isNumberOdd(69);
});
