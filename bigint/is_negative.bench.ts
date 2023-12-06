import { isBigIntNegative } from "./is_negative.ts";
Deno.bench("1", { permissions: "none" }, () => {
	isBigIntNegative(69n);
});
Deno.bench("2", { permissions: "none" }, () => {
	isBigIntNegative(-64n);
});
