import { type IntegralNumericTypeEnumKeysType } from "./internal/enum.ts";
import { integralNumericTypeRange, isPrimeNumeric } from "./internal/numeric.ts";
/**
 * @function isNumberEven
 * @description Whether the number is even.
 * @param {number} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
function isNumberEven(item: number): boolean {
	return (Number.isInteger(item) && item % 2 === 0);
}
/**
 * @function isNumberFloat
 * @description Whether the number is float.
 * @param {number} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
function isNumberFloat(item: number): boolean {
	return (item % 1 !== 0);
}
/**
 * @function isNumberIntegralNumericType
 * @description Whether the number is match the specified integral numeric type.
 * @param {IntegralNumericTypeEnumKeysType} typeName Name of the integral numeric type.
 * @param {number} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
function isNumberIntegralNumericType(typeName: IntegralNumericTypeEnumKeysType, item: number): boolean {
	let [minimum, maximum] = integralNumericTypeRange(typeName);
	return (Number.isInteger(item) && Number(minimum) <= item && item <= Number(maximum));
}
/**
 * @function isNumberNegative
 * @description Whether the number is negative.
 * @param {number} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
function isNumberNegative(item: number): boolean {
	return (item < 0);
}
/**
 * @function isNumberOdd
 * @description Whether the number is odd.
 * @param {number} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
function isNumberOdd(item: number): boolean {
	return (Number.isInteger(item) && item % 2 !== 0);
}
/**
 * @function isNumberPositive
 * @description Whether the number is positive.
 * @param {number} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
function isNumberPositive(item: number): boolean {
	return (item >= 0);
}
/**
 * @function isNumberPrime
 * @description Whether the number is prime.
 * @param {number} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
function isNumberPrime(item: number): boolean {
	return (Number.isInteger(item) && isPrimeNumeric(item));
}
/**
 * @function isNumberSafe
 * @description Whether the number is safe with IEEE-754.
 * @param {number} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
function isNumberSafe(item: number): boolean {
	return (Number.MIN_SAFE_INTEGER <= item && item <= Number.MAX_SAFE_INTEGER);
}
export {
	isNumberEven,
	isNumberFloat,
	isNumberIntegralNumericType,
	isNumberNegative,
	isNumberOdd,
	isNumberPositive,
	isNumberPrime,
	isNumberSafe
};
