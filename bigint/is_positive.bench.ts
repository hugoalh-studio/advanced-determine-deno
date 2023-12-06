import { isBigIntPositive } from "./is_positive.ts";
Deno.bench("1", { permissions: "none" }, () => {
	isBigIntPositive(-64n);
});
Deno.bench("2", { permissions: "none" }, () => {
	isBigIntPositive(69n);
});
