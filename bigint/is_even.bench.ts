import { isBigIntEven } from "./is_even.ts";
Deno.bench("False 1", { permissions: "none" }, () => {
	isBigIntEven(69n);
});
Deno.bench("True 1", { permissions: "none" }, () => {
	isBigIntEven(64n);
});
