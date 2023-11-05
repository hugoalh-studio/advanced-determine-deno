export type Primitive = bigint | boolean | null | number | string | symbol | undefined;
export function isPrimitive(item: unknown): item is Primitive {
	switch (typeof item) {
		case "bigint":
		case "boolean":
		case "number":
		case "string":
		case "symbol":
		case "undefined":
			return true;
		case "object":
			return (item === null);
		default:
			return false;
	}
}
export default isPrimitive;