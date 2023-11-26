import { isNumericPrime } from "../numeric/is_prime.ts";
/**
 * Determine whether the big integer is prime.
 * @param {bigint} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isBigIntPrime(item: bigint): boolean {
	return isNumericPrime(item);
}
export {
	isBigIntPrime as isBigIntegerPrime
};
export default isBigIntPrime;
