/**
 * Square root for the big integer. From https://stackoverflow.com/a/53684036.
 * @access private
 * @param {bigint} n Big integer.
 * @param {bigint} [x0=1n]
 * @returns {bigint}
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
 * Determine whether the numeric is prime.
 * @param {bigint | number} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isNumericPrime(item: bigint | number): boolean {
	let itemBigInteger: bigint;
	if (typeof item === "bigint") {
		itemBigInteger = item;
	} else {
		if (!Number.isInteger(item)) {
			return false;
		}
		itemBigInteger = BigInt(item);
	}
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
export default isNumericPrime;
