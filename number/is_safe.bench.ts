import { isNumberSafe } from "./is_safe.ts";
Deno.bench("1", { permissions: "none" }, () => {
	isNumberSafe(Number(97546105778997100000n));
});
Deno.bench("2", { permissions: "none" }, () => {
	isNumberSafe(69);
});
