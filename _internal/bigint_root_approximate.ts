/**
 * @access private
 */
interface BigIntRootApproximateResult {
	ceil: bigint;
	floor: bigint;
}
/**
 * Return the root of the big integer, approximate. From https://stackoverflow.com/a/64190462.
 * @param {bigint} radicand Radicand.
 * @param {bigint} index Index.
 * @returns {BigIntRootApproximateResult} Root, approximate.
 */
export function bigintRootApproximate(radicand: bigint, index = 2n): BigIntRootApproximateResult {
	if (!(radicand >= 0n)) {
		throw new RangeError(`Radicand is not a bigint which is positive!`);
	}
	if (!(index > 0n)) {
		throw new RangeError(`Index is not a bigint which is > 0!`);
	}
	if (
		radicand === 0n ||
		index === 1n
	) {
		return {
			ceil: radicand,
			floor: radicand
		};
	}
	let s: bigint = radicand + 1n;
	let u: bigint = radicand;
	while (u < s) {
		s = u;
		u = ((u * (index - 1n)) + radicand / (u ** (index - 1n))) / index;
	}
	return {
		ceil: (s ** index === radicand) ? s : s + 1n,
		floor: s
	};
}
