import { ArrayFilter } from "./array.ts";
import { ObjectFilter } from "./object.ts";
import { enumResolver, JSONRootTypeEnum, type JSONRootTypeEnumKeysType, type JSONRootTypeEnumValuesType } from "../internal/enum.ts";
const jsonArrayFilter: ArrayFilter = new ArrayFilter().allowEmpty().strict();
const jsonObjectFilter: ObjectFilter = new ObjectFilter().allowEmpty().plain();
const jsonLegalKeysPatternRegExp = /^[$_A-Za-z][$\d_A-Za-z]*$/u;
export interface JSONFilterStatus {
	/**
	 * Maximum entries count of the JSON.
	 * @default Infinity
	 */
	entriesCountMaximum: number;
	/**
	 * Minimum entries count of the JSON.
	 * @default 1
	 */
	entriesCountMinimum: number;
	/**
	 * Whether a pattern matchable JSON keys.
	 * @default undefined
	 */
	keysPattern?: RegExp;
	/**
	 * Root type of the JSON.
	 * @default "any"
	 */
	rootType: JSONRootTypeEnumValuesType;
}
export interface JSONFilterOptions extends Partial<Omit<JSONFilterStatus, "rootType">> {
	/**
	 * Whether to allow an empty JSON.
	 * @default false
	 */
	allowEmpty?: boolean;
	/**
	 * Entries count of the JSON.
	 * @default undefined
	 */
	entriesCount?: number;
	/**
	 * Root type of the JSON.
	 * @default "any"
	 */
	rootType?: JSONRootTypeEnumKeysType;
	/**
	 * Whether to determine type of array not as the root of the JSON, and no illegal namespace characters in the JSON keys.
	 * @default false
	 */
	strict?: boolean;
	/**
	 * Whether to determine no illegal namespace characters in the JSON keys.
	 * @default false
	 */
	strictKeys?: boolean;
	/** @alias entriesCountMaximum */entriesCountMax?: number;
	/** @alias entriesCountMaximum */maxEntries?: number;
	/** @alias entriesCountMaximum */maximumEntries?: number;
	/** @alias entriesCountMinimum */entriesCountMin?: number;
	/** @alias entriesCountMinimum */minEntries?: number;
	/** @alias entriesCountMinimum */minimumEntries?: number;
	/** @alias strictKeys */keysStrict?: boolean;
}
/**
 * @access private
 * @param {unknown} item Item that need to determine.
 * @param {RegExp} [keysPattern] Whether a pattern matchable JSON keys.
 * @returns {boolean}
 */
function isJSONValue(item: unknown, keysPattern?: RegExp): boolean {
	return (
		typeof item === "boolean" ||
		isJSONInternal(item, keysPattern) ||
		item === null ||
		(typeof item === "number" && !Number.isNaN(item)) ||
		typeof item === "string"
	);
}
/**
 * @access private
 * @param {unknown} item Item that need to determine.
 * @param {RegExp} [keysPattern] Whether a pattern matchable JSON keys.
 * @returns {boolean}
 */
function isJSONInternal(item: unknown, keysPattern?: RegExp): boolean {
	if (jsonArrayFilter.test(item)) {
		for (let itemElement of (item as unknown[])) {
			if (!isJSONValue(itemElement, keysPattern)) {
				return false;
			}
		}
		return true;
	}
	if (jsonObjectFilter.test(item)) {
		try {
			JSON.stringify(item);
		} catch {
			return false;
		}
		//@ts-ignore False positive.
		for (let itemKey of Object.keys(item)) {
			if (
				(keysPattern instanceof RegExp && !keysPattern.test(itemKey)) ||
				//@ts-ignore False positive.
				!isJSONValue(item[itemKey], keysPattern)
			) {
				return false;
			}
		}
		return true;
	}
	return false;
}
/**
 * Filter for JSON.
 */
export class JSONFilter {
	#status: JSONFilterStatus = {
		entriesCountMaximum: Infinity,
		entriesCountMinimum: 1,
		keysPattern: undefined,
		rootType: "any"
	};
	/**
	 * Initialize the JSON filter.
	 * @param {JSONFilter | JSONFilterOptions} [options] Options.
	 */
	constructor(options?: JSONFilter | JSONFilterOptions) {
		if (options instanceof JSONFilter) {
			this.#status = { ...options.#status };
		} else if (typeof options !== "undefined") {
			options.entriesCountMaximum ??= options.entriesCountMax ?? options.maximumEntries ?? options.maxEntries;
			options.entriesCountMinimum ??= options.entriesCountMin ?? options.minimumEntries ?? options.minEntries;
			options.strictKeys ??= options.keysStrict ?? false;
			for (let option of ["entriesCountMaximum", "entriesCountMinimum", "keysPattern", "rootType", "strictKeys", "allowEmpty", "entriesCount", "strict"]) {
				//@ts-ignore False positive.
				if (typeof options[option] !== "undefined") {
					//@ts-ignore False positive.
					this[option](options[option]);
				}
			}
		}
	}
	/**
	 * Clone this JSON filter for reuse.
	 * @returns {JSONFilter} Another instance of this JSON filter.
	 */
	get clone(): JSONFilter {
		return new JSONFilter(this);
	}
	/**
	 * Get the status of this JSON filter.
	 * @returns {JSONFilterStatus} Status of this JSON filter.
	 */
	get status(): JSONFilterStatus {
		return { ...this.#status };
	}
	/**
	 * Whether to allow an empty JSON.
	 * @param {boolean} [value=true]
	 * @returns {this}
	 */
	allowEmpty(value = true): this {
		if (typeof value !== "boolean") {
			throw new TypeError(`Filter argument \`allowEmpty\` must be type of boolean!`);
		}
		this.#status.entriesCountMinimum = value ? 0 : 1;
		return this;
	}
	/**
	 * Entries count of the JSON.
	 * @param {number} value
	 * @returns {this}
	 */
	entriesCount(value: number): this {
		if (!(typeof value === "number" && !Number.isNaN(value))) {
			throw new TypeError(`Filter argument \`entriesCount\` must be type of number!`);
		}
		if (!(Number.isSafeInteger(value) && value >= 0)) {
			throw new RangeError(`Filter argument \`entriesCount\` must be a number which is integer, positive, and safe!`);
		}
		this.#status.entriesCountMaximum = value;
		this.#status.entriesCountMinimum = value;
		return this;
	}
	/**
	 * Maximum entries count of the JSON.
	 * @param {number} value
	 * @returns {this}
	 */
	entriesCountMaximum(value: number): this {
		if (!(typeof value === "number" && !Number.isNaN(value))) {
			throw new TypeError(`Filter argument \`entriesCountMaximum\` must be type of number!`);
		}
		if (value !== Infinity && !(Number.isSafeInteger(value) && value >= 0 && value >= this.#status.entriesCountMinimum)) {
			throw new RangeError(`Filter argument \`entriesCountMaximum\` must be \`Infinity\`, or a number which is integer, positive, safe, and >= ${this.#status.entriesCountMinimum}!`);
		}
		this.#status.entriesCountMaximum = value;
		return this;
	}
	/**
	 * Minimum entries count of the JSON.
	 * @param {number} value
	 * @returns {this}
	 */
	entriesCountMinimum(value: number): this {
		if (!(typeof value === "number" && !Number.isNaN(value))) {
			throw new TypeError(`Filter argument \`entriesCountMinimum\` must be type of number!`);
		}
		if (!(Number.isSafeInteger(value) && value >= 0 && value <= this.#status.entriesCountMaximum)) {
			throw new RangeError(`Filter argument \`entriesCountMinimum\` must be a number which is integer, positive, safe, and <= ${this.#status.entriesCountMaximum}!`);
		}
		this.#status.entriesCountMinimum = value;
		return this;
	}
	/**
	 * Whether a pattern matchable JSON keys.
	 * @param {RegExp | undefined} [value]
	 * @returns {this}
	 */
	keysPattern(value?: RegExp | undefined): this {
		if (!(value instanceof RegExp) && typeof value !== "undefined") {
			throw new TypeError(`Filter argument \`keysPattern\` must be instance of regular expression, or type of undefined!`);
		}
		this.#status.keysPattern = value;
		return this;
	}
	/**
	 * Root type of the JSON.
	 * @param {JSONRootTypeEnumKeysType} value
	 * @returns {this}
	 */
	rootType(value: JSONRootTypeEnumKeysType): this {
		this.#status.rootType = enumResolver<JSONRootTypeEnumKeysType, JSONRootTypeEnumValuesType>(JSONRootTypeEnum, value, "rootType");
		return this;
	}
	/**
	 * Whether to determine type of array not as the root of the JSON, and no illegal namespace characters in the JSON keys.
	 * @param {boolean} [value=true]
	 * @returns {this}
	 */
	strict(value = true): this {
		if (typeof value !== "boolean") {
			throw new TypeError(`Filter argument \`strict\` must be type of boolean!`);
		}
		if (value) {
			this.#status.keysPattern = jsonLegalKeysPatternRegExp;
			this.#status.rootType = "object";
		} else {
			this.#status.keysPattern = undefined;
			this.#status.rootType = "any";
		}
		return this;
	}
	/**
	 * Whether to determine no illegal namespace characters in the JSON keys.
	 * @param {boolean} [value=true]
	 * @returns {this}
	 */
	strictKeys(value = true): this {
		if (typeof value !== "boolean") {
			throw new TypeError(`Filter argument \`strictKeys\` must be type of boolean!`);
		}
		this.#status.keysPattern = value ? jsonLegalKeysPatternRegExp : undefined;
		return this;
	}
	/** @alias entriesCountMaximum */entriesCountMax = this.entriesCountMaximum;
	/** @alias entriesCountMaximum */maxEntries = this.entriesCountMaximum;
	/** @alias entriesCountMaximum */maximumEntries = this.entriesCountMaximum;
	/** @alias entriesCountMinimum */entriesCountMin = this.entriesCountMinimum;
	/** @alias entriesCountMinimum */minEntries = this.entriesCountMinimum;
	/** @alias entriesCountMinimum */minimumEntries = this.entriesCountMinimum;
	/** @alias strictKeys */keysStrict = this.strictKeys;
	/**
	 * Determine item with the configured JSON filter.
	 * @param {unknown} item Item that need to determine.
	 * @returns {boolean} Determine result.
	 */
	test(item: unknown): boolean {
		//@ts-ignore False positive.
		let itemEntriesCount: number = Object.entries(item).length;
		if (
			!isJSONInternal(item, this.#status.keysPattern) ||
			(this.#status.rootType === "array" && !Array.isArray(item)) ||
			(this.#status.rootType === "object" && Array.isArray(item)) ||
			this.#status.entriesCountMaximum < itemEntriesCount ||
			itemEntriesCount < this.#status.entriesCountMinimum
		) {
			return false;
		}
		return true;
	}
	/**
	 * Determine stringify item with the configured JSON filter.
	 * @param {unknown} item Item that need to determine.
	 * @returns {boolean} Determine result.
	 */
	testStringify(item: unknown): boolean {
		if (typeof item !== "string") {
			return false;
		}
		let itemParse: object;
		try {
			itemParse = JSON.parse(item);
		} catch {
			return false;
		}
		return this.test(itemParse);
	}
	/** @alias testStringify */stringifiedTest = this.testStringify;
	/** @alias testStringify */stringifyTest = this.testStringify;
	/** @alias testStringify */testStringified = this.testStringify;
	/**
	 * Determine item with the JSON filter.
	 * @param {unknown} item Item that need to determine.
	 * @param {JSONFilterOptions} [options={}] Options.
	 * @returns {boolean} Determine result.
	 */
	static test(item: unknown, options: JSONFilterOptions = {}): boolean {
		return new this(options).test(item);
	}
	/**
	 * Determine stringify item with the JSON filter.
	 * @param {unknown} item Item that need to determine.
	 * @param {JSONFilterOptions} [options={}] Options.
	 * @returns {boolean} Determine result.
	 */
	static testStringify(item: unknown, options: JSONFilterOptions = {}): boolean {
		return new this(options).testStringify(item);
	}
	/** @alias testStringify */static stringifiedTest = this.testStringify;
	/** @alias testStringify */static stringifyTest = this.testStringify;
	/** @alias testStringify */static testStringified = this.testStringify;
}
/**
 * Determine item with the JSON filter.
 * @param {unknown} item Item that need to determine.
 * @param {JSONFilterOptions} [options={}] Options.
 * @returns {boolean} Determine result.
 */
export function filterJSON(item: unknown, options: JSONFilterOptions = {}): boolean {
	return new JSONFilter(options).test(item);
}
/**
 * Determine stringify item with the JSON filter.
 * @param {unknown} item Item that need to determine.
 * @param {JSONFilterOptions} [options={}] Options.
 * @returns {boolean} Determine result.
 */
export function filterStringifyJSON(item: unknown, options: JSONFilterOptions = {}): boolean {
	return new JSONFilter(options).testStringify(item);
}
export {
	filterStringifyJSON as filterJSONStringified,
	filterStringifyJSON as filterJSONStringify,
	filterStringifyJSON as filterStringifiedJSON
};
