import { isBigIntSafe } from "./is_safe.ts";
Deno.bench("False 1", { permissions: "none" }, () => {
	isBigIntSafe(97546105778997100000n);
});
Deno.bench("True 1", { permissions: "none" }, () => {
	isBigIntSafe(69n);
});
