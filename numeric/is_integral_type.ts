import { resolveEnum, type EnumCase } from "../internal/enum.ts";
export enum NumericIntegralTypeEnum {
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
export type NumericIntegralTypeEnumStringify = EnumCase<keyof typeof NumericIntegralTypeEnum>;
type NumericIntegralTypeRange = [
	minimum: bigint,
	maximum: bigint
];
/**
 * @access private
 * @param {bigint} base
 * @returns {NumericIntegralTypeRange}
 */
function resolveNumericIntegralTypeRangeIntBase(base: bigint): NumericIntegralTypeRange {
	const gridHalf: bigint = (2n ** base) / 2n;
	return [-gridHalf, gridHalf - 1n];
}
/**
 * @access private
 * @param {bigint} base
 * @returns {NumericIntegralTypeRange}
 */
function resolveNumericIntegralTypeRangeUIntBase(base: bigint): NumericIntegralTypeRange {
	return [0n, (2n ** base) - 1n];
}
/**
 * @access private
 * @param {NumericIntegralTypeEnum | NumericIntegralTypeEnumStringify} name
 * @returns {NumericIntegralTypeRange}
 */
function resolveNumericIntegralTypeRange(name: NumericIntegralTypeEnum | NumericIntegralTypeEnumStringify): NumericIntegralTypeRange {
	let nameResolve: NumericIntegralTypeEnum | undefined = undefined;
	try {
		nameResolve = resolveEnum<NumericIntegralTypeEnum, NumericIntegralTypeEnumStringify>(NumericIntegralTypeEnum, name, "");
	} catch {
		// Handle at below.
	}
	switch (nameResolve) {
		case "int8":
			return resolveNumericIntegralTypeRangeIntBase(8n);
		case "int16":
			return resolveNumericIntegralTypeRangeIntBase(16n);
		case "int32":
			return resolveNumericIntegralTypeRangeIntBase(32n);
		case "int64":
			return resolveNumericIntegralTypeRangeIntBase(64n);
		case "int128":
			return resolveNumericIntegralTypeRangeIntBase(128n);
		case "uint8":
			return resolveNumericIntegralTypeRangeUIntBase(8n);
		case "uint16":
			return resolveNumericIntegralTypeRangeUIntBase(16n);
		case "uint32":
			return resolveNumericIntegralTypeRangeUIntBase(32n);
		case "uint64":
			return resolveNumericIntegralTypeRangeUIntBase(64n);
		case "uint128":
			return resolveNumericIntegralTypeRangeUIntBase(128n);
		default:
			throw new RangeError(`\`${name}\` is not a valid integral numeric type! Only accept these values: "${Array.from(new Set(Object.keys(NumericIntegralTypeEnum).flatMap((value: string): string[] => {
				return [value, `${value.slice(0, 1).toLowerCase()}${value.slice(1)}`, `${value.slice(0, 1).toUpperCase()}${value.slice(1)}`];
			})).values()).sort().join("\", \"")}"`);
	}
}
/**
 * Determine whether the numeric is in the range of the specified integral type.
 * @param {NumericIntegralTypeEnum | NumericIntegralTypeEnumStringify} typeName Name of the integral numeric type.
 * @param {bigint | number} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isNumericIntegralType(typeName: NumericIntegralTypeEnum | NumericIntegralTypeEnumStringify, item: bigint | number): boolean {
	const [minimum, maximum] = resolveNumericIntegralTypeRange(typeName);
	if (typeof item === "bigint") {
		return (minimum <= item && item <= maximum);
	}
	return (Number.isInteger(item) && Number(minimum) <= item && item <= Number(maximum));
}
export default isNumericIntegralType;
