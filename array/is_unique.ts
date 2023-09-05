import uniqueArray from "https://deno.land/x/unique_array@v1.0.11/mod.ts";
/**
 * Determine whether the array is contain unique elements.
 * @param {unknown[]} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isArrayUnique(item: unknown[]): boolean {
	return (item.length === uniqueArray<unknown>(item).length);
}
export default isArrayUnique;
