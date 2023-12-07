import { isNumberPositive } from "./is_positive.ts";
Deno.bench("False 1", { permissions: "none" }, () => {
	isNumberPositive(-64);
});
Deno.bench("True 1", { permissions: "none" }, () => {
	isNumberPositive(69);
});
