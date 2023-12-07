import { isBigIntPositive } from "./is_positive.ts";
Deno.bench("False 1", { permissions: "none" }, () => {
	isBigIntPositive(-64n);
});
Deno.bench("True 1", { permissions: "none" }, () => {
	isBigIntPositive(69n);
});
