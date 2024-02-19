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
interface MagicBytesEntry extends MagicBytesMeta {
	pattern: BytesMatcherPattern<string>[];
}
export interface MagicBytesMetaWithWeight extends MagicBytesMeta {
	/**
	 * Weight of the magic bytes.
	 */
	weight: number;
}
interface MagicBytesListEntry {
	matcher: BytesMatcher;
	meta: MagicBytesMetaWithWeight;
}
/**
 * Magic bytes matcher to determine whether the bytes is match the specify magic bytes.
 */
export class MagicBytesMatcher {
	#bytesMinimum = 0;
	#list: MagicBytesListEntry[] = [];
	/**
	 * Initialize magic bytes matcher.
	 * @param {(meta: MagicBytesMeta) => boolean} [filter] Filter.
	 */
	constructor(filter?: (meta: MagicBytesMeta) => boolean) {
		for (const { pattern, ...meta } of (MagicBytesList as unknown as MagicBytesEntry[])) {
			if (filter?.(meta) ?? true) {
				const matcher: BytesMatcher = new BytesMatcher(pattern);
				this.#list.push({
					matcher,
					meta: {
						...meta,
						weight: matcher.weight
					}
				});
				this.#bytesMinimum = Math.max(this.#bytesMinimum, matcher.bytesMinimum);
			}
		}
		if (Object.entries(this.#list).length === 0) {
			throw new Error(`Matcher is empty!`);
		}
		this.#list.sort((a: MagicBytesListEntry, b: MagicBytesListEntry): number => {
			return b.meta.weight - a.meta.weight;
		});
	}
	/**
	 * List all of the magic bytes meta which the bytes is match.
	 * @param {string | Uint8Array} item Item that need to determine.
	 * @returns {Generator<MagicBytesMetaWithWeight>} Magic bytes meta list.
	 */
	*matchAllIterate(item: string | Uint8Array): Generator<MagicBytesMetaWithWeight> {
		for (const { matcher, meta } of this.#list.values()) {
			if (matcher.test(item)) {
				yield meta;
			}
		}
	}
	/**
	 * List all of the magic bytes meta which the bytes is match.
	 * @param {string | Uint8Array} item Item that need to determine.
	 * @returns {MagicBytesMetaWithWeight[]} Magic bytes meta list.
	 */
	matchAll(item: string | Uint8Array): MagicBytesMetaWithWeight[] {
		return Array.from(this.matchAllIterate(item));
	}
	/**
	 * Return the magic bytes meta which the bytes is match the closest.
	 * @param {string | Uint8Array} item Item that need to determine.
	 * @returns {MagicBytesMetaWithWeight | null} Magic bytes meta.
	 */
	match(item: string | Uint8Array): MagicBytesMetaWithWeight | null {
		for (const _ of this.matchAllIterate(item)) {
			return _;
		}
		return null;
	}
	/**
	 * Determine whether the bytes is match any of specify magic bytes.
	 * @param {string | Uint8Array} item Item that need to determine.
	 * @returns {boolean} Determine result.
	 */
	test(item: string | Uint8Array): boolean {
		return (this.match(item) !== null);
	}
}
export default MagicBytesMatcher;
