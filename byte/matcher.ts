import { includesNeedle as bytesIncludesNeedle } from "https://deno.land/std@0.213.0/bytes/includes_needle.ts";
const regexpPatternHex = /^[\dA-F]{2}(?: [\dA-F]{2})*$/v;
export interface BytesMatcherPattern<T extends string | Uint8Array> {
	fromIndex: "*" | number;
	hex: T;
}
/**
 * Bytes matcher to determine whether the bytes is match the specify pattern.
 */
export class BytesMatcher {
	#pattern: BytesMatcherPattern<Uint8Array>[];
	/**
	 * Initialize bytes matcher.
	 * @param {BytesMatcherPattern<string | Uint8Array>[]} pattern Pattern.
	 */
	constructor(pattern: BytesMatcherPattern<string | Uint8Array>[]) {
		if (pattern.length === 0) {
			throw new TypeError(`Argument \`pattern\` is not defined!`);
		}
		this.#pattern = pattern.map(({ fromIndex, hex }: BytesMatcherPattern<string | Uint8Array>): BytesMatcherPattern<Uint8Array> => {
			if (fromIndex !== "*" && !Number.isSafeInteger(fromIndex)) {
				throw new SyntaxError(`\`${fromIndex}\` is not a valid index!`);
			}
			if (hex instanceof Uint8Array) {
				return {
					fromIndex,
					hex: Uint8Array.of(...hex)
				};
			}
			if (!regexpPatternHex.test(hex)) {
				throw new SyntaxError(`\`${hex}\` is not a valid hex!`);
			}
			return {
				fromIndex,
				hex: Uint8Array.of(...hex.split(" ").map((byte: string): number => {
					return Number.parseInt(byte, 16);
				}))
			};
		});
	}
	/**
	 * Determine whether the bytes is match the specify pattern.
	 * @param {Uint8Array} item Item that need to determine.
	 * @returns {boolean} Determine result.
	 */
	test(item: Uint8Array): boolean {
		return this.#pattern.every(({ fromIndex, hex }: BytesMatcherPattern<Uint8Array>): boolean => {
			if (fromIndex === "*") {
				return bytesIncludesNeedle(item, hex);
			}
			const sourceSection: Uint8Array = (fromIndex >= 0) ? item.slice(fromIndex, fromIndex + hex.length) : item.slice(item.length + fromIndex, item.length + fromIndex + hex.length);
			if (sourceSection.length !== hex.length) {
				return false;
			}
			return hex.every((byte: number, index: number): boolean => {
				return (sourceSection[index] === byte);
			});
		});
	}
}
export default BytesMatcher;
