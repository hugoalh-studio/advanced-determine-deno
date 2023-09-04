import { isArrayUnique } from "./is_unique.ts";
import { isArrayUniqueReference } from "./is_unique_reference.ts";
const element1 = { foo: "bar" };
Deno.bench("Unique 1", () => {
	isArrayUnique([element1, element1]);
});
Deno.bench("Unique 2", () => {
	isArrayUnique([{ foo: "bar" }, { foo: "bar" }]);
});
Deno.bench("Unique 3", () => {
	isArrayUnique([1, 2, 3]);
});
Deno.bench("UniqueReference 1", () => {
	isArrayUniqueReference([element1, element1]);
});
Deno.bench("UniqueReference 2", () => {
	isArrayUniqueReference([{ foo: "bar" }, { foo: "bar" }]);
});
