import { type IntegralNumericTypeEnumStringify } from "./internal/enum.ts";
import { integralNumericTypeRange, isPrimeNumeric } from "./internal/numeric.ts";
const MAX_SAFE_INTEGER = BigInt(Number.MAX_SAFE_INTEGER);
const MIN_SAFE_INTEGER = BigInt(Number.MIN_SAFE_INTEGER);
/**
 * Determine whether the big integer is even.
 * @param {bigint} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isBigIntEven(item: bigint): boolean {
	return (item % 2n === 0n);
}
export {
	isBigIntEven as isBigIntegerEven
};
/**
 * Determine whether the big integer is match the specified integral numeric type.
 * @param {IntegralNumericTypeEnumStringify} typeName Name of the integral numeric type.
 * @param {bigint} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isBigIntIntegralNumericType(typeName: IntegralNumericTypeEnumStringify, item: bigint): boolean {
	const [minimum, maximum] = integralNumericTypeRange(typeName);
	return (minimum <= item && item <= maximum);
}
export {
	isBigIntIntegralNumericType as isBigIntegerIntegralNumericType
};
/**
 * Determine whether the big integer is negative.
 * @param {bigint} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isBigIntNegative(item: bigint): boolean {
	return (item < 0n);
}
export {
	isBigIntNegative as isBigIntegerNegative
};
/**
 * Determine whether the big integer is odd.
 * @param {bigint} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isBigIntOdd(item: bigint): boolean {
	return (item % 2n !== 0n);
}
export {
	isBigIntOdd as isBigIntegerOdd
};
/**
 * Determine whether the big integer is positive.
 * @param {bigint} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isBigIntPositive(item: bigint): boolean {
	return (item >= 0n);
}
export {
	isBigIntPositive as isBigIntegerPositive
};
/**
 * Determine whether the big integer is prime.
 * @param {bigint} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isBigIntPrime(item: bigint): boolean {
	return isPrimeNumeric(item);
}
export {
	isBigIntPrime as isBigIntegerPrime
};
/**
 * Determine whether the big integer is safe with IEEE-754.
 * @param {bigint} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isBigIntSafe(item: bigint): boolean {
	return (MIN_SAFE_INTEGER <= item && item <= MAX_SAFE_INTEGER);
}
export {
	isBigIntSafe as isBigIntegerSafe
};
