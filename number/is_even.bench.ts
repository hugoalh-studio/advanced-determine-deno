import { isNumberEven } from "./is_even.ts";
Deno.bench("False 1", { permissions: "none" }, () => {
	isNumberEven(69);
});
Deno.bench("True 1", { permissions: "none" }, () => {
	isNumberEven(64);
});
