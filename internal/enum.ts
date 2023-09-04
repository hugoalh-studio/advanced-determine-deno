export type EnumCase<T extends string> = T | Capitalize<T> | Uncapitalize<T>;
/**
 * @template {unknown} Eo
 * @template {unknown} Es
 * @param {Eo} enumObject
 * @param {Eo | Es} input
 * @param {string} parameterDescription
 * @returns {Eo}
 */
export function resolveEnum<Eo, Es>(enumObject: object, input: Eo | Es, parameterDescription: string): Eo {
	if (Object.values(enumObject as object).includes(input)) {
		return input as Eo;
	}
	if (typeof input !== "string") {
		throw new TypeError(`${parameterDescription.slice(0, 1).toUpperCase()}${parameterDescription.slice(1)} is not a string!`);
	}
	for (const key of Object.keys(enumObject as object)) {
		if (
			input === key ||
			input === `${key.slice(0, 1).toLowerCase()}${key.slice(1)}` ||
			input === `${key.slice(0, 1).toUpperCase()}${key.slice(1)}`
		) {
			//@ts-ignore Determine error.
			return enumObject[key] as Eo;
		}
	}
	throw new RangeError(`\`${input}\` is not a valid value for ${parameterDescription.slice(0, 1).toLowerCase()}${parameterDescription.slice(1)}! Only accept these values: "${Array.from(new Set(Object.keys(enumObject as object).flatMap((value: string): string[] => {
		return [value, `${value.slice(0, 1).toLowerCase()}${value.slice(1)}`, `${value.slice(0, 1).toUpperCase()}${value.slice(1)}`];
	})).values()).sort().join("\", \"")}"`);
}
