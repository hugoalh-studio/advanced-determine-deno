import { isNumberPositive } from "./is_positive.ts";
Deno.bench("1", { permissions: "none" }, () => {
	isNumberPositive(-64);
});
Deno.bench("2", { permissions: "none" }, () => {
	isNumberPositive(69);
});
