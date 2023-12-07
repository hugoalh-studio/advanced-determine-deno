import { isArrayUnique } from "./is_unique.ts";
import { isArrayUniqueReference } from "./is_unique_reference.ts";
const sample1 = { foo: "bar" };
Deno.bench("Unique False 1", { permissions: "none" }, () => {
	isArrayUnique([sample1, sample1]);
});
Deno.bench("Unique False 2", { permissions: "none" }, () => {
	isArrayUnique([sample1, { foo: "bar" }]);
});
Deno.bench("Unique False 3", { permissions: "none" }, () => {
	isArrayUnique([{ foo: "bar" }, { foo: "bar" }]);
});
Deno.bench("Unique True 1", { permissions: "none" }, () => {
	isArrayUnique([{ foo: "bar" }, { foo: "baz" }]);
});
Deno.bench("UniqueReference False 1", { permissions: "none" }, () => {
	isArrayUniqueReference([sample1, sample1]);
});
Deno.bench("UniqueReference True 1", { permissions: "none" }, () => {
	isArrayUniqueReference([sample1, { foo: "bar" }]);
});
Deno.bench("UniqueReference True 2", { permissions: "none" }, () => {
	isArrayUniqueReference([{ foo: "bar" }, { foo: "bar" }]);
});
