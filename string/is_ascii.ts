const regexpASCII = /^\p{ASCII}*$/v;
/**
 * Determine whether the string is ASCII.
 * @param {string} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isStringASCII(item: string): boolean {
	return regexpASCII.test(item);
}
export default isStringASCII;
