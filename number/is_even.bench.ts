import { isNumberEven } from "./is_even.ts";
Deno.bench("1", { permissions: "none" }, () => {
	isNumberEven(69);
});
Deno.bench("2", { permissions: "none" }, () => {
	isNumberEven(64);
});
