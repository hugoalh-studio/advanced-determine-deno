import { isNumericPrime } from "../numeric/is_prime.ts";
/**
 * Determine whether the number is prime.
 * @param {number} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isNumberPrime(item: number): boolean {
	return isNumericPrime(item);
}
export default isNumberPrime;
