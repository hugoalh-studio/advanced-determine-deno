import { isArrayUnique } from "./is_unique.ts";
import { isArrayUniqueReference } from "./is_unique_reference.ts";
const sample1 = { foo: "bar" };
Deno.bench("Unique 1", { permissions: "none" }, () => {
	isArrayUnique([sample1, sample1]);
});
Deno.bench("Unique 2", { permissions: "none" }, () => {
	isArrayUnique([sample1, { foo: "bar" }]);
});
Deno.bench("Unique 3", { permissions: "none" }, () => {
	isArrayUnique([{ foo: "bar" }, { foo: "bar" }]);
});
Deno.bench("Unique 4", { permissions: "none" }, () => {
	isArrayUnique([{ foo: "bar" }, { foo: "baz" }]);
});
Deno.bench("UniqueReference 1", { permissions: "none" }, () => {
	isArrayUniqueReference([sample1, sample1]);
});
Deno.bench("UniqueReference 2", { permissions: "none" }, () => {
	isArrayUniqueReference([sample1, { foo: "bar" }]);
});
Deno.bench("UniqueReference 3", { permissions: "none" }, () => {
	isArrayUniqueReference([{ foo: "bar" }, { foo: "bar" }]);
});
