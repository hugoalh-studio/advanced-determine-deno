/**
 * Enum of the numeric integral type.
 */
export enum NumericIntegralType {
	bigint = "int64",
	bigInt = "int64",
	Bigint = "int64",
	BigInt = "int64",
	biguint = "uint64",
	bigUint = "uint64",
	bigUInt = "uint64",
	BigUint = "uint64",
	BigUInt = "uint64",
	byte = "uint8",
	Byte = "uint8",
	char = "int8",
	Char = "int8",
	int8 = "int8",
	Int8 = "int8",
	int16 = "int16",
	Int16 = "int16",
	int32 = "int32",
	Int32 = "int32",
	int64 = "int64",
	Int64 = "int64",
	int128 = "int128",
	Int128 = "int128",
	integer = "int32",
	Integer = "int32",
	long = "int64",
	Long = "int64",
	rune = "int32",
	Rune = "int32",
	short = "int16",
	Short = "int16",
	smallint = "int16",
	smallInt = "int16",
	SmallInt = "int16",
	smalluint = "uint16",
	smallUint = "uint16",
	smallUInt = "uint16",
	SmallUint = "uint16",
	SmallUInt = "uint16",
	tinyint = "int8",
	tinyInt = "int8",
	TinyInt = "int8",
	tinyuint = "uint8",
	tinyUint = "uint8",
	tinyUInt = "uint8",
	TinyUint = "uint8",
	TinyUInt = "uint8",
	uchar = "uint8",
	uChar = "uint8",
	Uchar = "uint8",
	UChar = "uint8",
	uint8 = "uint8",
	uInt8 = "uint8",
	Uint8 = "uint8",
	UInt8 = "uint8",
	uint16 = "uint16",
	uInt16 = "uint16",
	Uint16 = "uint16",
	UInt16 = "uint16",
	uint32 = "uint32",
	uInt32 = "uint32",
	Uint32 = "uint32",
	UInt32 = "uint32",
	uint64 = "uint64",
	uInt64 = "uint64",
	Uint64 = "uint64",
	UInt64 = "uint64",
	uint128 = "uint128",
	uInt128 = "uint128",
	Uint128 = "uint128",
	UInt128 = "uint128",
	uinteger = "uint32",
	uInteger = "uint32",
	Uinteger = "uint32",
	UInteger = "uint32",
	ulong = "uint64",
	uLong = "uint64",
	Ulong = "uint64",
	ULong = "uint64",
	ushort = "uint16",
	uShort = "uint16",
	Ushort = "uint16",
	UShort = "uint16"
}
/**
 * Key of enum of the numeric integral type.
 */
export type NumericIntegralTypeStringify = keyof typeof NumericIntegralType;
/**
 * @access private
 */
interface NumericIntegralTypeRange {
	maximum: bigint;
	minimum: bigint;
}
/**
 * @access private
 * @param {bigint} base
 * @returns {NumericIntegralTypeRange}
 */
function resolveNumericIntegralTypeRangeIntBase(base: bigint): NumericIntegralTypeRange {
	const gridHalf: bigint = (2n ** base) / 2n;
	return {
		maximum: gridHalf - 1n,
		minimum: -gridHalf
	};
}
/**
 * @access private
 * @param {bigint} base
 * @returns {NumericIntegralTypeRange}
 */
function resolveNumericIntegralTypeRangeUIntBase(base: bigint): NumericIntegralTypeRange {
	return {
		maximum: (2n ** base) - 1n,
		minimum: 0n
	};
}
/**
 * @access private
 * @param {NumericIntegralType | NumericIntegralTypeStringify} name
 * @returns {NumericIntegralTypeRange}
 */
function resolveNumericIntegralTypeRange(name: NumericIntegralType | NumericIntegralTypeStringify): NumericIntegralTypeRange {
	switch (NumericIntegralType[name]) {
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
			throw new RangeError(`\`${name}\` is not a valid integral numeric type! Only accept these values: ${Array.from(new Set(Object.keys(NumericIntegralType).sort()).values()).join(", ")}`);
	}
}
/**
 * Determine whether the numeric is in the range of the specify integral type.
 * @param {NumericIntegralType | NumericIntegralTypeStringify} typeName Name of the integral numeric type.
 * @param {bigint | number} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isNumericIntegralType(typeName: NumericIntegralType | NumericIntegralTypeStringify, item: bigint | number): boolean {
	const { maximum, minimum } = resolveNumericIntegralTypeRange(typeName);
	if (typeof item === "bigint") {
		return (minimum <= item && item <= maximum);
	}
	return (Number.isInteger(item) && Number(minimum) <= item && item <= Number(maximum));
}
export default isNumericIntegralType;
