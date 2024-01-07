import { includesNeedle as bytesIncludesNeedle } from "https://deno.land/std@0.211.0/bytes/includes_needle.ts";
import MagicBytesListRaw from "./_magic_bytes_list.ts";
const regexpPatternHex = /^[\dA-F]{2}(?: [\dA-F]{2})*$/v;
interface MagicBytesPattern<T extends string | Uint8Array> {
	fromIndex: "*" | number;
	hex: T;
}
export interface MagicBytesMeta {
	extensions: `.${string}`[];
	mimes: string[];
	name: string;
	patternVariant?: string;
}
interface MagicBytesEntry<T extends string | Uint8Array> extends MagicBytesMeta {
	pattern: MagicBytesPattern<T>[];
}
const MagicBytesList: MagicBytesEntry<string>[] = MagicBytesListRaw as unknown as MagicBytesEntry<string>[];
class BytesMatcher {
	#pattern: MagicBytesPattern<Uint8Array>[];
	constructor(pattern: MagicBytesPattern<string>[]) {
		if (pattern.length === 0) {
			throw new TypeError(`Argument \`pattern\` is not defined!`);
		}
		this.#pattern = pattern.map(({ fromIndex, hex }: MagicBytesPattern<string>): MagicBytesPattern<Uint8Array> => {
			if (!Number.isSafeInteger(fromIndex)) {
				throw new SyntaxError(`\`${fromIndex}\` is not a valid index!`);
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
	test(source: Uint8Array): boolean {
		return this.#pattern.every(({ fromIndex, hex }: MagicBytesPattern<Uint8Array>): boolean => {
			if (fromIndex === "*") {
				return bytesIncludesNeedle(source, hex);
			}
			const sourceSection: Uint8Array = (fromIndex >= 0) ? source.slice(fromIndex, fromIndex + hex.length) : source.slice(source.length + fromIndex, source.length + fromIndex + hex.length);
			if (sourceSection.length !== hex.length) {
				return false;
			}
			return hex.every((byte: number, index: number): boolean => {
				return (sourceSection[index] === byte);
			});
		});
	}
}
export class MagicBytesMatcher {
	#list: Map<MagicBytesMeta, BytesMatcher> = new Map<MagicBytesMeta, BytesMatcher>();
	constructor(filter?: (meta: MagicBytesMeta) => boolean) {
		for (const { pattern, ...meta } of MagicBytesList) {
			if (filter?.(meta) ?? true) {
				this.#list.set(meta, new BytesMatcher(pattern));
			}
		}
	}
	*matchIterate(source: Uint8Array): Generator<MagicBytesMeta> {
		for (const [meta, pattern] of this.#list.entries()) {
			if (pattern.test(source)) {
				yield meta;
			}
		}
	}
	match(source: Uint8Array): MagicBytesMeta[] {
		return Array.from(this.matchIterate(source));
	}
}
export default MagicBytesMatcher;
