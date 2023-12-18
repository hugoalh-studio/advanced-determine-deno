import { environmentValueDelimiter } from "./value_delimiter.ts";
/**
 * Split environment value with operate system specific delimiter.
 * @access private
 * @param {string} item
 * @returns {string[]}
 */
export function splitEnvironmentValue(item: string): string[] {
	return item.split(environmentValueDelimiter).map((value: string): string => {
		return value.trim();
	}).filter((value: string): boolean => {
		return (value.length > 0);
	});
}
