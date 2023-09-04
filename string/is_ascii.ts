//deno-lint-ignore no-control-regex
const nonASCIIRegExp = /[^\u0000-\u007F]/u;
/**
 * Determine whether the string is ASCII.
 * @param {string} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isStringASCII(item: string): boolean {
	return !nonASCIIRegExp.test(item);
}
export default isStringASCII;
