/**
 * Determine whether the array is contain unique references.
 * @param {unknown[]} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isArrayUniqueReference(item: unknown[]): boolean {
	return (item.length === new Set<unknown>(item).size);
}
export default isArrayUniqueReference;
