import { isBigIntEven } from "./is_even.ts";
Deno.bench("1", { permissions: "none" }, () => {
	isBigIntEven(69n);
});
Deno.bench("2", { permissions: "none" }, () => {
	isBigIntEven(64n);
});
