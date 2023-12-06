import { isBigIntOdd } from "./is_odd.ts";
Deno.bench("1", { permissions: "none" }, () => {
	isBigIntOdd(64n);
});
Deno.bench("2", { permissions: "none" }, () => {
	isBigIntOdd(69n);
});
