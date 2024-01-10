import MagicBytesListRaw from "./magic_bytes_list.json" with { type: "json" };
import { BytesMatcher, type BytesMatcherPattern } from "./matcher.ts";
export interface MagicBytesMeta {
	/**
	 * Extensions of the magic bytes.
	 * @default []
	 */
	extensions: `.${string}`[];
	/**
	 * MIMEs of the magic bytes.
	 * @default []
	 */
	mimes: string[];
	/**
	 * Name of the magic bytes.
	 */
	name: string;
	/**
	 * Pattern variant of the magic bytes.
	 * @default undefined
	 */
	patternVariant?: string;
}
interface MagicBytesEntry<T extends string | Uint8Array> extends MagicBytesMeta {
	pattern: BytesMatcherPattern<T>[];
}
const MagicBytesList: MagicBytesEntry<string>[] = MagicBytesListRaw as unknown as MagicBytesEntry<string>[];
/**
 * Magic bytes matcher to determine whether the bytes is match the specify magic bytes.
 */
export class MagicBytesMatcher {
	#list: Map<MagicBytesMeta, BytesMatcher> = new Map<MagicBytesMeta, BytesMatcher>();
	/**
	 * Initialize magic bytes matcher.
	 * @param {(meta: MagicBytesMeta) => boolean} [filter] Filter
	 */
	constructor(filter?: (meta: MagicBytesMeta) => boolean) {
		for (const { pattern, ...meta } of MagicBytesList) {
			if (filter?.(meta) ?? true) {
				this.#list.set(meta, new BytesMatcher(pattern));
			}
		}
		if (this.#list.size === 0) {
			throw new Error(`Matcher is empty!`);
		}
	}
	/**
	 * List meta of the magic bytes which the bytes is match.
	 * @param item Item that need to determine.
	 * @returns {Generator<MagicBytesMeta>} Magic bytes meta list.
	 */
	*matchIterate(item: Uint8Array): Generator<MagicBytesMeta> {
		for (const [meta, pattern] of this.#list.entries()) {
			if (pattern.test(item)) {
				yield meta;
			}
		}
	}
	/**
	 * List meta of the magic bytes which the bytes is match.
	 * @param item Item that need to determine.
	 * @returns {MagicBytesMeta[]} Magic bytes meta list.
	 */
	match(item: Uint8Array): MagicBytesMeta[] {
		return Array.from(this.matchIterate(item));
	}
	/**
	 * Determine whether the bytes is match any of specify magic bytes.
	 * @param {Uint8Array} item Item that need to determine.
	 * @returns {boolean} Determine result.
	 */
	test(item: Uint8Array): boolean {
		return (this.match(item).length > 0);
	}
}
export default MagicBytesMatcher;
