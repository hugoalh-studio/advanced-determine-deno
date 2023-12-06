import { isNumberOdd } from "./is_odd.ts";
Deno.bench("1", { permissions: "none" }, () => {
	isNumberOdd(64);
});
Deno.bench("2", { permissions: "none" }, () => {
	isNumberOdd(69);
});
