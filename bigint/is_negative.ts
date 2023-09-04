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
export default isBigIntNegative;
