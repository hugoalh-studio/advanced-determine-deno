import MagicBytesList from "./magic_bytes_list.json" with { type: "json" };
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
export interface MagicBytesMetaWithWeight extends MagicBytesMeta {
	/**
	 * Weight of the magic bytes.
	 */
	weight: bigint;
}
interface MagicBytesListEntry {
	matcher: BytesMatcher;
	meta: MagicBytesMeta;
	weight: bigint;
}
/**
 * Magic bytes matcher to determine whether the bytes is match the specify magic bytes.
 */
export class MagicBytesMatcher {
	#list: Set<MagicBytesListEntry> = new Set<MagicBytesListEntry>();
	/**
	 * Initialize magic bytes matcher.
	 * @param {(meta: MagicBytesMeta) => boolean} [filter] Filter.
	 */
	constructor(filter?: (meta: MagicBytesMeta) => boolean) {
		for (const { pattern, ...meta } of (MagicBytesList as unknown as MagicBytesEntry<string>[])) {
			if (filter?.(meta) ?? true) {
				const matcher: BytesMatcher = new BytesMatcher(pattern);
				this.#list.add({
					matcher,
					meta,
					weight: matcher.weight
				});
			}
		}
		if (this.#list.size === 0) {
			throw new Error(`Matcher is empty!`);
		}
	}
	/**
	 * List all of the magic bytes meta which the bytes is match.
	 * @param item Item that need to determine.
	 * @returns {Generator<MagicBytesMetaWithWeight>} Magic bytes meta list.
	 */
	*matchAllIterate(item: Uint8Array): Generator<MagicBytesMetaWithWeight> {
		for (const { matcher, meta, weight } of this.#list.values()) {
			if (matcher.test(item)) {
				yield { ...meta, weight };
			}
		}
	}
	/**
	 * List all of the magic bytes meta which the bytes is match.
	 * @param item Item that need to determine.
	 * @returns {MagicBytesMetaWithWeight[]} Magic bytes meta list.
	 */
	matchAll(item: Uint8Array): MagicBytesMetaWithWeight[] {
		return Array.from(this.matchAllIterate(item));
	}
	/**
	 * Return the magic bytes meta which the bytes is match the closest.
	 * @param item Item that need to determine.
	 * @returns {MagicBytesMetaWithWeight | null} Magic bytes meta.
	 */
	match(item: Uint8Array): MagicBytesMetaWithWeight | null {
		return this.matchAll(item).sort((a: MagicBytesMetaWithWeight, b: MagicBytesMetaWithWeight): number => {
			if (a.weight > b.weight) {
				return 1;
			}
			if (a.weight < b.weight) {
				return -1;
			}
			return 0;
		})[0] ?? null;
	}
	/**
	 * Determine whether the bytes is match any of specify magic bytes.
	 * @param {Uint8Array} item Item that need to determine.
	 * @returns {boolean} Determine result.
	 */
	test(item: Uint8Array): boolean {
		for (const _ of this.matchAllIterate(item)) {
			return true;
		}
		return false;
	}
}
export default MagicBytesMatcher;
