//deno-lint-ignore no-control-regex
const regexpNonASCII = /[^\u0000-\u007F]/v;
/**
 * Determine whether the string is ASCII.
 * @param {string} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isStringASCII(item: string): boolean {
	return !regexpNonASCII.test(item);
}
export default isStringASCII;
