import { isBigIntNegative } from "./is_negative.ts";
Deno.bench("False 1", { permissions: "none" }, () => {
	isBigIntNegative(69n);
});
Deno.bench("True 1", { permissions: "none" }, () => {
	isBigIntNegative(-64n);
});
