import { isBigIntOdd } from "./is_odd.ts";
Deno.bench("False 1", { permissions: "none" }, () => {
	isBigIntOdd(64n);
});
Deno.bench("True 1", { permissions: "none" }, () => {
	isBigIntOdd(69n);
});
