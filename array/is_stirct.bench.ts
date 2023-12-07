import { isArrayStrict } from "./is_strict.ts";
Deno.bench("False 1", { permissions: "none" }, () => {
	isArrayStrict(Object.freeze([1, 2, 3, "foo", "bar", "baz"]) as unknown[]);
});
Deno.bench("True 1", { permissions: "none" }, () => {
	isArrayStrict([1, 2, 3, "foo", "bar", "baz"]);
});
