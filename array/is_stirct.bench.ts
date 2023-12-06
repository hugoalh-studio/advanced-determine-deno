import { isArrayStrict } from "./is_strict.ts";
Deno.bench("1", { permissions: "none" }, () => {
	isArrayStrict(Object.freeze([1, 2, 3, "foo", "bar", "baz"]) as unknown[]);
});
Deno.bench("2", { permissions: "none" }, () => {
	isArrayStrict([1, 2, 3, "foo", "bar", "baz"]);
});
