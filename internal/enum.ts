type EnumCase<T extends string> = T | Capitalize<T> | Uncapitalize<T>;
/**
 * @template {unknown} Eo
 * @template {unknown} Es
 * @param {Eo} enumObject
 * @param {Eo | Es} input
 * @param {string} parameterDescription
 * @returns {Eo}
 */
export function enumResolver<Eo, Es>(enumObject: object, input: Eo | Es, parameterDescription: string): Eo {
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
			//@ts-ignore Type determine error.
			return enumObject[key] as Eo;
		}
	}
	throw new RangeError(`\`${input}\` is not a valid value for ${parameterDescription.slice(0, 1).toLowerCase()}${parameterDescription.slice(1)}! Only accept these values: "${Array.from(new Set(Object.keys(enumObject as object).flatMap((value: string): string[] => {
		return [value, `${value.slice(0, 1).toLowerCase()}${value.slice(1)}`, `${value.slice(0, 1).toUpperCase()}${value.slice(1)}`];
	})).values()).sort().join("\", \"")}"`);
}
export enum IEEE754Enum {
	Any = "any",
	Safe = "safe",
	Unsafe = "unsafe"
}
export type IEEE754EnumStringify = EnumCase<keyof typeof IEEE754Enum>;
export enum IntegralNumericTypeEnum {
	Byte = "uint8",
	Char = "int8",
	Int8 = "int8",
	Int16 = "int16",
	Int32 = "int32",
	Int64 = "int64",
	Int128 = "int128",
	Long = "int64",
	Rune = "int32",
	Short = "int16",
	Uchar = "uint8",
	UChar = "uint8",
	Uint8 = "uint8",
	UInt8 = "uint8",
	Uint16 = "uint16",
	UInt16 = "uint16",
	Uint32 = "uint32",
	UInt32 = "uint32",
	Uint64 = "uint64",
	UInt64 = "uint64",
	Uint128 = "uint128",
	UInt128 = "uint128",
	Ulong = "uint64",
	ULong = "uint64",
	Ushort = "uint16",
	UShort = "uint16"
}
export type IntegralNumericTypeEnumStringify = EnumCase<keyof typeof IntegralNumericTypeEnum>;
export enum JSONRootTypeEnum {
	Any = "any",
	Array = "array",
	Literal = "literal",
	Object = "object"
}
export type JSONRootTypeEnumStringify = EnumCase<keyof typeof JSONRootTypeEnum>;
export enum MathematicsFinitenessEnum {
	Any = "any",
	Finite = "finite",
	Infinite = "infinite"
}
export type MathematicsFinitenessEnumStringify = EnumCase<keyof typeof MathematicsFinitenessEnum>;
export enum MathematicsParityEnum {
	Any = "any",
	Even = "even",
	Odd = "odd"
}
export type MathematicsParityEnumStringify = EnumCase<keyof typeof MathematicsParityEnum>;
export enum MathematicsPrimalityEnum {
	Any = "any",
	Composite = "composite",
	Prime = "prime"
}
export type MathematicsPrimalityEnumStringify = EnumCase<keyof typeof MathematicsPrimalityEnum>;
export enum MathematicsSignEnum {
	Any = "any",
	Negative = "negative",
	Positive = "positive"
}
export type MathematicsSignEnumStringify = EnumCase<keyof typeof MathematicsSignEnum>;
export enum NumericTypeEnum {
	Any = "any",
	Float = "float",
	Int = "integer",
	Integer = "integer"
}
export type NumericTypeEnumStringify = EnumCase<keyof typeof NumericTypeEnum>;
export enum StringCaseEnum {
	Any = "any",
	Lower = "lower",
	Lowercase = "lower",
	LowerCase = "lower",
	Upper = "upper",
	Uppercase = "upper",
	UpperCase = "upper"
}
export type StringCaseEnumStringify = EnumCase<keyof typeof StringCaseEnum>;
export enum StringLineEnum {
	Any = "any",
	Multiline = "multiple",
	MultiLine = "multiple",
	Multiple = "multiple",
	Multipleline = "multiple",
	MultipleLine = "multiple",
	Single = "single",
	Singleline = "single",
	SingleLine = "single"
}
export type StringLineEnumStringify = EnumCase<keyof typeof StringLineEnum>;
export enum ThreePhaseConditionEnum {
	Allow = "true",
	Deny = "false",
	Exclude = "false",
	Exclusive = "false",
	False = "false",
	Include = "true",
	Inclusive = "true",
	Neutral = "neutral",
	None = "neutral",
	Null = "neutral",
	True = "true",
	Undefine = "neutral",
	Undefined = "neutral"
}
export type ThreePhaseConditionEnumStringify = EnumCase<keyof typeof ThreePhaseConditionEnum>;
