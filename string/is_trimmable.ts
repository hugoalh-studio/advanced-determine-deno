/**
 * Determine whether the string is trimmable.
 * @param {string} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isStringTrimmable(item: string): boolean {
	return (item.length !== item.trim().length);
}
export default isStringTrimmable;
