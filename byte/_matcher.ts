/**
 * Determine whether the byte is match any of specify signatures.
 * @param {Uint8Array} source
 * @param {string[]} signatures
 * @param {number} [from=0]
 * @returns {boolean} Determine result.
 */
export function isByteMatch(source: Uint8Array, signatures: string[], from = 0): boolean {
	if (!(Number.isSafeInteger(from) && from >= 0)) {
		throw new RangeError(`Argument \`from\` is not a number which is integer, positive, and safe!`);
	}
	return signatures.some((signature: string): boolean => {
		return signature.split(" ").every((byte: string, index: number): boolean => {
			return (source.at(from + index) === Number.parseInt(byte, 16));
		});
	});
}
