import { enumResolver, IntegralNumericTypeEnum, type IntegralNumericTypeEnumKeysType, type IntegralNumericTypeEnumValuesType } from "./enum.ts";
/**
 * @access private
 * @param {bigint} n
 * @param {bigint} [x0=1n]
 * @returns {bigint}
 * @note From https://stackoverflow.com/a/53684036.
 */
function bigIntegerSquareRoot(n: bigint, x0 = 1n): bigint {
	const x1: bigint = (n / x0 + x0) >> 1n;
	if (
		x0 === x1 ||
		x0 === x1 - 1n
	) {
		return x0;
	}
	return bigIntegerSquareRoot(n, x1);
}
/**
 * @access private
 * @param {bigint} base
 * @returns {[bigint, bigint]}
 */
function integralNumericTypeRangeIntBase(base: bigint): [bigint, bigint] {
	const gridHalf: bigint = (2n ** base) / 2n;
	return [-gridHalf, gridHalf - 1n];
}
/**
 * @access private
 * @param {bigint} base
 * @returns {[bigint, bigint]}
 */
function integralNumericTypeRangeUIntBase(base: bigint): [bigint, bigint] {
	return [0n, (2n ** base) - 1n];
}
/**
 * @param {IntegralNumericTypeEnumKeysType} name
 * @returns {[bigint, bigint]}
 */
export function integralNumericTypeRange(name: IntegralNumericTypeEnumKeysType): [bigint, bigint] {
	let nameResolve: IntegralNumericTypeEnumValuesType | undefined = undefined;
	try {
		nameResolve = enumResolver<IntegralNumericTypeEnumKeysType, IntegralNumericTypeEnumValuesType>(IntegralNumericTypeEnum, name, "");
	} catch {
		// Handle at below.
	}
	switch (nameResolve) {
		case "int8":
			return integralNumericTypeRangeIntBase(8n);
		case "int16":
			return integralNumericTypeRangeIntBase(16n);
		case "int32":
			return integralNumericTypeRangeIntBase(32n);
		case "int64":
			return integralNumericTypeRangeIntBase(64n);
		case "int128":
			return integralNumericTypeRangeIntBase(128n);
		case "uint8":
			return integralNumericTypeRangeUIntBase(8n);
		case "uint16":
			return integralNumericTypeRangeUIntBase(16n);
		case "uint32":
			return integralNumericTypeRangeUIntBase(32n);
		case "uint64":
			return integralNumericTypeRangeUIntBase(64n);
		case "uint128":
			return integralNumericTypeRangeUIntBase(128n);
		default:
			throw new RangeError(`\`${name}\` is not a valid integral numeric type! Only accept these values: "${Array.from(new Set(Object.keys(IntegralNumericTypeEnum).flatMap((value: string): string[] => {
				return [value, `${value.slice(0, 1).toLowerCase()}${value.slice(1)}`, `${value.slice(0, 1).toUpperCase()}${value.slice(1)}`];
			})).values()).sort().join("\", \"")}"`);
	}
}
/**
 * @param {bigint | number} item
 * @returns {boolean}
 */
export function isPrimeNumeric(item: bigint | number): boolean {
	const itemBigInteger: bigint = (typeof item === "bigint") ? item : BigInt(item);
	if (
		itemBigInteger === 2n ||
		itemBigInteger === 3n ||
		itemBigInteger === 5n ||
		itemBigInteger === 7n
	) {
		return true;
	}
	if (
		itemBigInteger < 2n ||
		itemBigInteger % 2n === 0n ||
		itemBigInteger % 3n === 0n ||
		itemBigInteger % 5n === 0n ||
		itemBigInteger % 7n === 0n
	) {
		return false;
	}
	for (let divisor = 3n; divisor <= bigIntegerSquareRoot(itemBigInteger) + 1n; divisor += 2n) {
		if (itemBigInteger % divisor === 0n) {
			return false;
		}
	}
	return true;
}
