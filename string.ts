const newLineRegExp = /[\n\r]/u;
const nonASCIIRegExp = /[^\u0000-\u007F]/u;
/**
 * Determine whether the string is ASCII.
 * @param {string} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isStringASCII(item: string): boolean {
	return !nonASCIIRegExp.test(item);
}
/**
 * Determine whether the string is lower case.
 * @param {string} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isStringLowerCase(item: string): boolean {
	return (item === item.toLowerCase());
}
/**
 * Determine whether the string is multiple line.
 * @param {string} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isStringMultipleLine(item: string): boolean {
	return newLineRegExp.test(item);
}
/**
 * Determine whether the string is single line.
 * @param {string} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isStringSingleLine(item: string): boolean {
	return !newLineRegExp.test(item);
}
/**
 * Determine whether the string is upper case.
 * @param {string} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isStringUpperCase(item: string): boolean {
	return (item === item.toUpperCase());
}
