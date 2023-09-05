/**
 * Determine whether the string is trimmable at the end.
 * @param {string} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isStringTrimmableEnd(item: string): boolean {
	return (item.length !== item.trimEnd().length);
}
export default isStringTrimmableEnd;
