import { isNumberNegative } from "./is_negative.ts";
Deno.bench("False 1", { permissions: "none" }, () => {
	isNumberNegative(69);
});
Deno.bench("True 1", { permissions: "none" }, () => {
	isNumberNegative(-64);
});
