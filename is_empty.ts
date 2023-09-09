import { isObjectPlain } from "./object/is_plain.ts";
/**
 * Determine whether the item is empty.
 * 
 * This only reports back what the JavaScript engine is seeing; In particular, the return value may not match the original source code if a transpilation tool was used.
 * @param {unknown} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isEmpty(item: unknown): boolean {
	switch (typeof item) {
		case "bigint":
			return false;
		case "boolean":
			return false;
		case "function":
			return false;
		case "number":
			return false;
		case "object":
			if (item === null) {
				return true;
			}
			if (Array.isArray(item)) {
				return !(item.length > 0);
			}
			if (
				item instanceof Map ||
				item instanceof Set
			) {
				return !(item.size > 0);
			}
			if (isObjectPlain(item)) {
				return !(Object.entries(item).length > 0);
			}
			return false;
		case "string":
			return !(item.length > 0);
		case "symbol":
		case "undefined":
			return true;
		default:
			return false;
	}
}
export default isEmpty;
