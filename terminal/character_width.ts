import { unicodeWidth } from "https://deno.land/std@0.217.0/console/unicode_width.ts";
import { stripAnsiCode } from "https://deno.land/std@0.217.0/fmt/colors.ts";
/**
 * Get the physical width of a string in the console.
 * @param {string} item Item that need to determine.
 * @returns {number} Width of the string.
 */
export function getCharactersWidth(item: string): number {
	return unicodeWidth(stripAnsiCode(item));
}
export default getCharactersWidth;
