import { isNumberSafe } from "./is_safe.ts";
Deno.bench("False 1", { permissions: "none" }, () => {
	isNumberSafe(Number(97546105778997100000n));
});
Deno.bench("True 1", { permissions: "none" }, () => {
	isNumberSafe(69);
});
