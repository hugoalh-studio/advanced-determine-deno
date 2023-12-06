import { isNumberNegative } from "./is_negative.ts";
Deno.bench("1", { permissions: "none" }, () => {
	isNumberNegative(69);
});
Deno.bench("2", { permissions: "none" }, () => {
	isNumberNegative(-64);
});
