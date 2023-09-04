const newLineRegExp = /[\n\r]/u;
/**
 * Determine whether the string is single line.
 * @param {string} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isStringSingleLine(item: string): boolean {
	return !newLineRegExp.test(item);
}
export default isStringSingleLine;
