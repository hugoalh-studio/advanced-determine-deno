import { uniqueArray } from "https://deno.land/x/unique_array@v1.0.14/mod.ts";
import { isNumberPositive } from "../number/is_positive.ts";
const regexpPatternHexString = /^[\dA-F]{2}(?: [\dA-F]{2})*$/v;
type BytesMatcherPatternLiteral = string | Uint8Array | (string | Uint8Array)[] | Set<string | Uint8Array>;
export enum BytesMatcherPatternPosition {
	end = "end",
	End = "end",
	start = "start",
	Start = "start"
}
export type BytesMatcherPatternPositionStringify = keyof typeof BytesMatcherPatternPosition;
export interface BytesMatcherPattern {
	/**
	 * @default 0
	 */
	offset?: number | number[] | Set<number>;
	pattern: BytesMatcherPatternLiteral;
	/**
	 * @default "start"
	 */
	position?: BytesMatcherPatternPosition | BytesMatcherPatternPositionStringify;
}
interface BytesMatcherPatternInternal {
	length: number;
	offsets: number[];
	patterns: Uint8Array[];
}
function resolveOffsets(offsets: number | number[] | Set<number>): number[] {
	let offsetsFmt: number[];
	if (offsets instanceof Set) {
		offsetsFmt = uniqueArray(Array.from(offsets.values()));
	} else if (Array.isArray(offsets)) {
		offsetsFmt = uniqueArray(offsets);
	} else {
		offsetsFmt = [offsets];
	}
	if (!offsetsFmt.every((offset: number): boolean => {
		return (Number.isSafeInteger(offset) && isNumberPositive(offset));
	})) {
		throw new SyntaxError(`{${offsetsFmt.join(" || ")}} is not a valid offsets group!`);
	}
	return offsetsFmt;
}
function resolvePatterns(patterns: BytesMatcherPatternLiteral): Omit<BytesMatcherPatternInternal, "offsets"> {
	let patternsFmt: (string | Uint8Array)[];
	if (patterns instanceof Set) {
		patternsFmt = uniqueArray(Array.from(patterns.values()));
	} else if (Array.isArray(patterns)) {
		patternsFmt = uniqueArray(patterns);
	} else {
		patternsFmt = [patterns];
	}
	const patternsResolve: Uint8Array[] = patternsFmt.map((pattern: string | Uint8Array): Uint8Array => {
		if (pattern instanceof Uint8Array) {
			return pattern;
		}
		if (!regexpPatternHexString.test(pattern)) {
			throw new SyntaxError(`\`${pattern}\` is not a valid hex!`);
		}
		return Uint8Array.of(...pattern.split(" ").map((byte: string): number => {
			return Number.parseInt(byte, 16);
		}));
	});
	const lengths: number[] = patternsResolve.map((pattern: Uint8Array): number => {
		return pattern.length;
	});
	if (
		lengths.includes(0) ||
		uniqueArray(lengths).length !== 1
	) {
		throw new SyntaxError(`{${patternsResolve.map((pattern: Uint8Array): string => {
			return Array.from(pattern, (byte: number): string => {
				return byte.toString(16).toUpperCase();
			}).join(" ");
		}).join(" || ")}} is not a valid patterns group!`);
	}
	return {
		length: lengths[0],
		patterns: patternsResolve
	};
}
export class BytesMatcher {
	#groupsPositionEnd: Set<BytesMatcherPatternInternal> = new Set<BytesMatcherPatternInternal>();
	#groupsPositionStart: Set<BytesMatcherPatternInternal> = new Set<BytesMatcherPatternInternal>();
	constructor(...groups: (BytesMatcherPattern | BytesMatcherPatternLiteral)[]) {
		if (groups.length === 0) {
			throw new TypeError(`Argument \`groups\` is not defined!`);
		}
		for (const group of groups) {
			if (
				typeof group === "string" ||
				Array.isArray(group) ||
				group instanceof Set ||
				group instanceof Uint8Array
			) {
				this.#groupsPositionStart.add({
					...resolvePatterns(group),
					offsets: [0]
				});
				continue;
			}
			const { length, patterns } = resolvePatterns(group.pattern);
			const offsets: number[] = (typeof group.offset === "undefined") ? [0] : resolveOffsets(group.offset);
			switch (BytesMatcherPatternPosition[group.position ?? "start"]) {
				case "end":
					this.#groupsPositionEnd.add({ length, offsets, patterns });
					break;
				case "start":
					this.#groupsPositionStart.add({ length, offsets, patterns });
					break;
				default:
					throw new RangeError(`\`${name}\` is not a valid bytes matcher pattern position! Only accept these values: ${Array.from(new Set(Object.keys(BytesMatcherPatternPosition).sort()).values()).join(", ")}`);
			}
		}
	}
	test(source: Uint8Array): boolean {
		for (const { length, offsets, patterns } of this.#groupsPositionEnd.values()) {
			if (!offsets.some((offset: number): boolean => {
				const sourceSection: Uint8Array = source.slice(source.length - offset, source.length - offset + length);
				if (sourceSection.length !== length) {
					return false;
				}
				return patterns.some((pattern: Uint8Array): boolean => {
					return pattern.every((byte: number, index: number): boolean => {
						return (sourceSection[index] === byte);
					});
				});
			})) {
				return false;
			}
		}
		for (const { length, offsets, patterns } of this.#groupsPositionStart.values()) {
			if (!offsets.some((offset: number): boolean => {
				const sourceSection: Uint8Array = source.slice(offset, offset + length);
				if (sourceSection.length !== length) {
					return false;
				}
				return patterns.some((pattern: Uint8Array): boolean => {
					return pattern.every((byte: number, index: number): boolean => {
						return (sourceSection[index] === byte);
					});
				});
			})) {
				return false;
			}
		}
		return true;
	}
}
