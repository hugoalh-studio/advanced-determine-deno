import { isArrayUnique } from "./is_unique.ts";
import { isArrayUniqueReference } from "./is_unique_reference.ts";
const element1 = { foo: "bar" };
Deno.bench("Unique 1", { permissions: "none" }, () => {
	isArrayUnique([element1, element1]);
});
Deno.bench("Unique 2", { permissions: "none" }, () => {
	isArrayUnique([{ foo: "bar" }, { foo: "bar" }]);
});
Deno.bench("Unique 3", { permissions: "none" }, () => {
	isArrayUnique([1, 2, 3]);
});
Deno.bench("UniqueReference 1", { permissions: "none" }, () => {
	isArrayUniqueReference([element1, element1]);
});
Deno.bench("UniqueReference 2", { permissions: "none" }, () => {
	isArrayUniqueReference([{ foo: "bar" }, { foo: "bar" }]);
});
