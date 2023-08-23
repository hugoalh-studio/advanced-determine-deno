import { enumResolver, ThreePhaseConditionEnum, type ThreePhaseConditionEnumKeysType, type ThreePhaseConditionEnumValuesType } from "../internal/enum.ts";
import { ObjectMeta } from "../internal/object-meta.ts";
export interface ObjectFilterStatus {
	/**
	 * Whether to allow `Array` object.
	 * @default false
	 */
	allowArray: boolean;
	/**
	 * Whether to allow `null` object.
	 * @default false
	 */
	allowNull: boolean;
	/**
	 * Whether to allow `RegExp` object.
	 * @default false
	 */
	allowRegExp: boolean;
	/**
	 * Whether contain configurable entries in the object.
	 * @default "neutral"
	 */
	entriesConfigurable: ThreePhaseConditionEnumValuesType;
	/**
	 * Maximum entries count of the object.
	 * @default Infinity
	 */
	entriesCountMaximum: number;
	/**
	 * Minimum entries count of the object.
	 * @default 1
	 */
	entriesCountMinimum: number;
	/**
	 * Whether contain enumerable entries in the object.
	 * @default "neutral"
	 */
	entriesEnumerable: ThreePhaseConditionEnumValuesType;
	/**
	 * Whether contain getter entries in the object.
	 * @default "neutral"
	 */
	entriesGetter: ThreePhaseConditionEnumValuesType;
	/**
	 * Whether contain setter entries in the object.
	 * @default "neutral"
	 */
	entriesSetter: ThreePhaseConditionEnumValuesType;
	/**
	 * Whether contain writable entries in the object.
	 * @default "neutral"
	 */
	entriesWritable: ThreePhaseConditionEnumValuesType;
	/**
	 * Whether contain symbols in the object keys.
	 * @default "neutral"
	 */
	keysSymbol: ThreePhaseConditionEnumValuesType;
}
export interface ObjectFilterOptions extends Partial<Omit<ObjectFilterStatus, "entriesConfigurable" | "entriesEnumerable" | "entriesGetter" | "entriesSetter" | "entriesWritable" | "keysSymbol">> {
	/**
	 * Whether to allow an empty object.
	 * @default false
	 */
	allowEmpty?: boolean;
	/**
	 * Whether contain configurable entries in the object.
	 * @default "neutral"
	 */
	entriesConfigurable?: ThreePhaseConditionEnumKeysType;
	/**
	 * Entries count of the object.
	 * @default undefined
	 */
	entriesCount?: number;
	/**
	 * Whether contain enumerable entries in the object.
	 * @default "neutral"
	 */
	entriesEnumerable?: ThreePhaseConditionEnumKeysType;
	/**
	 * Whether contain getter entries in the object.
	 * @default "neutral"
	 */
	entriesGetter?: ThreePhaseConditionEnumKeysType;
	/**
	 * Whether contain setter entries in the object.
	 * @default "neutral"
	 */
	entriesSetter?: ThreePhaseConditionEnumKeysType;
	/**
	 * Whether contain writable entries in the object.
	 * @default "neutral"
	 */
	entriesWritable?: ThreePhaseConditionEnumKeysType;
	/**
	 * Whether contain symbols in the object keys.
	 * @default "neutral"
	 */
	keysSymbol?: ThreePhaseConditionEnumKeysType;
	/**
	 * Whether to not allow getters, setters, non-configurable, non-enumerable, and non-writable in the object, and not allow symbols in the object keys.
	 * @default false
	 */
	plain?: boolean;
	/** @alias allowRegExp */allowRegularExpression?: this["allowRegExp"];
	/** @alias entriesConfigurable */configurableEntries?: this["entriesConfigurable"];
	/** @alias entriesCountMaximum */entriesCountMax?: this["entriesCountMaximum"];
	/** @alias entriesCountMaximum */maximumEntries?: this["entriesCountMaximum"];
	/** @alias entriesCountMaximum */maxEntries?: this["entriesCountMaximum"];
	/** @alias entriesCountMinimum */entriesCountMin?: this["entriesCountMinimum"];
	/** @alias entriesCountMinimum */minimumEntries?: this["entriesCountMinimum"];
	/** @alias entriesCountMinimum */minEntries?: this["entriesCountMinimum"];
	/** @alias entriesEnumerable */enumerableEntries?: this["entriesEnumerable"];
	/** @alias entriesGetter */getterEntries?: this["entriesGetter"];
	/** @alias entriesSetter */setterEntries?: this["entriesSetter"];
	/** @alias entriesWritable */writableEntries?: this["entriesWritable"];
	/** @alias keysSymbol */symbolKeys?: this["keysSymbol"];
}
/**
 * Filter for object.
 */
export class ObjectFilter {
	#status: ObjectFilterStatus = {
		allowArray: false,
		allowNull: false,
		allowRegExp: false,
		entriesConfigurable: "neutral",
		entriesCountMaximum: Infinity,
		entriesCountMinimum: 1,
		entriesEnumerable: "neutral",
		entriesGetter: "neutral",
		entriesSetter: "neutral",
		entriesWritable: "neutral",
		keysSymbol: "neutral"
	};
	/**
	 * Initialize the object filter.
	 * @param {ObjectFilter | ObjectFilterOptions} [options] Options.
	 */
	constructor(options?: ObjectFilter | ObjectFilterOptions) {
		if (options instanceof ObjectFilter) {
			this.#status = { ...options.#status };
		} else if (typeof options !== "undefined") {
			options.allowRegExp ??= options.allowRegularExpression;
			options.entriesConfigurable ??= options.configurableEntries;
			options.entriesCountMaximum ??= options.entriesCountMax ?? options.maximumEntries ?? options.maxEntries;
			options.entriesCountMinimum ??= options.entriesCountMin ?? options.minimumEntries ?? options.minEntries;
			options.entriesEnumerable ??= options.enumerableEntries;
			options.entriesGetter ??= options.getterEntries;
			options.entriesSetter ??= options.setterEntries;
			options.entriesWritable ??= options.writableEntries;
			options.keysSymbol ??= options.symbolKeys;
			for (const option of ["allowArray", "allowNull", "allowRegExp", "entriesConfigurable", "entriesCountMaximum", "entriesCountMinimum", "entriesEnumerable", "entriesGetter", "entriesSetter", "entriesWritable", "keysSymbol", "allowEmpty", "entriesCount", "plain"]) {
				//@ts-ignore Handle by it's method.
				if (typeof options[option] !== "undefined") {
					//@ts-ignore Handle by it's method.
					this[option](options[option]);
				}
			}
		}
	}
	/**
	 * Clone this object filter for reuse.
	 * @returns {ObjectFilter} Another instance of this object filter.
	 */
	get clone(): ObjectFilter {
		return new ObjectFilter(this);
	}
	/**
	 * Get the status of this object filter.
	 * @returns {ObjectFilterStatus} Status of this object filter.
	 */
	get status(): ObjectFilterStatus {
		return { ...this.#status };
	}
	/**
	 * Whether to allow `Array` object.
	 * @param {boolean} [value=true]
	 * @returns {this}
	 */
	allowArray(value = true): this {
		if (typeof value !== "boolean") {
			throw new TypeError(`Filter status \`allowArray\` must be type of boolean!`);
		}
		this.#status.allowArray = value;
		return this;
	}
	/**
	 * Whether to allow an empty object.
	 * @param {boolean} [value=true]
	 * @returns {this}
	 */
	allowEmpty(value = true): this {
		if (typeof value !== "boolean") {
			throw new TypeError(`Filter status \`allowEmpty\` must be type of boolean!`);
		}
		this.#status.entriesCountMinimum = value ? 0 : 1;
		return this;
	}
	/**
	 * Whether to allow `null` object.
	 * @param {boolean} [value=true]
	 * @returns {this}
	 */
	allowNull(value = true): this {
		if (typeof value !== "boolean") {
			throw new TypeError(`Filter status \`allowNull\` must be type of boolean!`);
		}
		this.#status.allowNull = value;
		return this;
	}
	/**
	 * Whether to allow `RegExp` object.
	 * @param {boolean} [value=true]
	 * @returns {this}
	 */
	allowRegExp(value = true): this {
		if (typeof value !== "boolean") {
			throw new TypeError(`Filter status \`allowRegExp\` must be type of boolean!`);
		}
		this.#status.allowRegExp = value;
		return this;
	}
	/**
	 * Whether contain configurable entries in the object.
	 * @param {ThreePhaseConditionEnumKeysType} value
	 * @returns {this}
	 */
	entriesConfigurable(value: ThreePhaseConditionEnumKeysType): this {
		this.#status.entriesConfigurable = enumResolver<ThreePhaseConditionEnumKeysType, ThreePhaseConditionEnumValuesType>(ThreePhaseConditionEnum, value, "Filter status `entriesConfigurable`");
		return this;
	}
	/**
	 * Entries count of the object.
	 * @param {number} value
	 * @returns {this}
	 */
	entriesCount(value: number): this {
		if (!(typeof value === "number" && !Number.isNaN(value))) {
			throw new TypeError(`Filter status \`entriesCount\` must be type of number!`);
		}
		if (!(Number.isSafeInteger(value) && value >= 0)) {
			throw new RangeError(`Filter status \`entriesCount\` must be a number which is integer, positive, and safe!`);
		}
		this.#status.entriesCountMaximum = value;
		this.#status.entriesCountMinimum = value;
		return this;
	}
	/**
	 * Maximum entries count of the object.
	 * @param {number} value
	 * @returns {this}
	 */
	entriesCountMaximum(value: number): this {
		if (!(typeof value === "number" && !Number.isNaN(value))) {
			throw new TypeError(`Filter status \`entriesCountMaximum\` must be type of number!`);
		}
		if (value !== Infinity && !(Number.isSafeInteger(value) && value >= 0 && value >= this.#status.entriesCountMinimum)) {
			throw new RangeError(`Filter status \`entriesCountMaximum\` must be \`Infinity\`, or a number which is integer, positive, safe, and >= ${this.#status.entriesCountMinimum}!`);
		}
		this.#status.entriesCountMaximum = value;
		return this;
	}
	/**
	 * Minimum entries count of the object.
	 * @param {number} value
	 * @returns {this}
	 */
	entriesCountMinimum(value: number): this {
		if (!(typeof value === "number" && !Number.isNaN(value))) {
			throw new TypeError(`Filter status \`entriesCountMinimum\` must be type of number!`);
		}
		if (!(Number.isSafeInteger(value) && value >= 0 && value <= this.#status.entriesCountMaximum)) {
			throw new RangeError(`Filter status \`entriesCountMinimum\` must be a number which is integer, positive, safe, and <= ${this.#status.entriesCountMaximum}!`);
		}
		this.#status.entriesCountMinimum = value;
		return this;
	}
	/**
	 * Whether contain enumerable entries in the object.
	 * @param {ThreePhaseConditionEnumKeysType} value
	 * @returns {this}
	 */
	entriesEnumerable(value: ThreePhaseConditionEnumKeysType): this {
		this.#status.entriesEnumerable = enumResolver<ThreePhaseConditionEnumKeysType, ThreePhaseConditionEnumValuesType>(ThreePhaseConditionEnum, value, "Filter status `entriesEnumerable`");
		return this;
	}
	/**
	 * Whether contain getter entries in the object.
	 * @param {ThreePhaseConditionEnumKeysType} value
	 * @returns {this}
	 */
	entriesGetter(value: ThreePhaseConditionEnumKeysType): this {
		this.#status.entriesGetter = enumResolver<ThreePhaseConditionEnumKeysType, ThreePhaseConditionEnumValuesType>(ThreePhaseConditionEnum, value, "Filter status `entriesGetter`");
		return this;
	}
	/**
	 * Whether contain setter entries in the object.
	 * @param {ThreePhaseConditionEnumKeysType} value
	 * @returns {this}
	 */
	entriesSetter(value: ThreePhaseConditionEnumKeysType): this {
		this.#status.entriesSetter = enumResolver<ThreePhaseConditionEnumKeysType, ThreePhaseConditionEnumValuesType>(ThreePhaseConditionEnum, value, "Filter status `entriesSetter`");
		return this;
	}
	/**
	 * Whether contain writable entries in the object.
	 * @param {ThreePhaseConditionEnumKeysType} value
	 * @returns {this}
	 */
	entriesWritable(value: ThreePhaseConditionEnumKeysType): this {
		this.#status.entriesWritable = enumResolver<ThreePhaseConditionEnumKeysType, ThreePhaseConditionEnumValuesType>(ThreePhaseConditionEnum, value, "Filter status `entriesWritable`");
		return this;
	}
	/**
	 * Whether contain symbols in the object keys.
	 * @param {ThreePhaseConditionEnumKeysType} value
	 * @returns {this}
	 */
	keysSymbol(value: ThreePhaseConditionEnumKeysType): this {
		this.#status.keysSymbol = enumResolver<ThreePhaseConditionEnumKeysType, ThreePhaseConditionEnumValuesType>(ThreePhaseConditionEnum, value, "Filter status `keysSymbol`");
		return this;
	}
	/**
	 * Whether to not allow getters, setters, non-configurable, non-enumerable, and non-writable in the object, and not allow symbols in the object keys.
	 * @param {boolean} [value=true]
	 * @returns {this}
	 */
	plain(value = true): this {
		if (typeof value !== "boolean") {
			throw new TypeError(`Filter status \`plain\` must be type of boolean!`);
		}
		if (value) {
			this.#status.entriesConfigurable = "true";
			this.#status.entriesEnumerable = "true";
			this.#status.entriesGetter = "false";
			this.#status.entriesSetter = "false";
			this.#status.entriesWritable = "true";
			this.#status.keysSymbol = "false";
		} else {
			this.#status.entriesConfigurable = "neutral";
			this.#status.entriesEnumerable = "neutral";
			this.#status.entriesGetter = "neutral";
			this.#status.entriesSetter = "neutral";
			this.#status.entriesWritable = "neutral";
			this.#status.keysSymbol = "neutral";
		}
		return this;
	}
	/** @alias allowRegExp */allowRegularExpression = this.allowRegExp;
	/** @alias entriesConfigurable */configurableEntries = this.entriesConfigurable;
	/** @alias entriesCountMaximum */entriesCountMax = this.entriesCountMaximum;
	/** @alias entriesCountMaximum */maximumEntries = this.entriesCountMaximum;
	/** @alias entriesCountMaximum */maxEntries = this.entriesCountMaximum;
	/** @alias entriesCountMinimum */entriesCountMin = this.entriesCountMinimum;
	/** @alias entriesCountMinimum */minimumEntries = this.entriesCountMinimum;
	/** @alias entriesCountMinimum */minEntries = this.entriesCountMinimum;
	/** @alias entriesEnumerable */enumerableEntries = this.entriesEnumerable;
	/** @alias entriesGetter */getterEntries = this.entriesGetter;
	/** @alias entriesSetter */setterEntries = this.entriesSetter;
	/** @alias entriesWritable */writableEntries = this.entriesWritable;
	/** @alias keysSymbol */symbolKeys = this.keysSymbol;
	/**
	 * Determine item with the configured object filter.
	 * @param {unknown} item Item that need to determine.
	 * @returns {boolean} Determine result.
	 */
	test(item: unknown): boolean {
		if (
			typeof item !== "object" ||
			(!this.#status.allowArray && Array.isArray(item)) ||
			(!this.#status.allowNull && item === null) ||
			(!this.#status.allowRegExp && item instanceof RegExp)
		) {
			return false;
		}
		if (this.#status.allowNull && item === null) {
			return true;
		}
		const itemObjectMeta: ObjectMeta = new ObjectMeta(item as object);
		if (
			
			Object.entries(item as object).length !== itemObjectMeta.entriesEnumerable.length ||
			(this.#status.keysSymbol === "false" && itemObjectMeta.keysSymbol.length > 0) ||
			(this.#status.keysSymbol === "true" && itemObjectMeta.keysSymbol.length === 0) ||
			this.#status.entriesCountMaximum < itemObjectMeta.entriesGetter.length + itemObjectMeta.entriesNonAccessor.length + itemObjectMeta.entriesSetter.length + itemObjectMeta.keysSymbol.length ||
			itemObjectMeta.entriesGetter.length + itemObjectMeta.entriesNonAccessor.length + itemObjectMeta.entriesSetter.length + itemObjectMeta.keysSymbol.length < this.#status.entriesCountMinimum ||
			(this.#status.entriesConfigurable === "false" && itemObjectMeta.entriesConfigurable.length > 0) ||
			(this.#status.entriesConfigurable === "true" && itemObjectMeta.entriesNonConfigurable.length > 0) ||
			(this.#status.entriesEnumerable === "false" && itemObjectMeta.entriesEnumerable.length > 0) ||
			(this.#status.entriesEnumerable === "true" && itemObjectMeta.entriesNonEnumerable.length > 0) ||
			(this.#status.entriesGetter === "false" && itemObjectMeta.entriesGetter.length > 0) ||
			(this.#status.entriesSetter === "false" && itemObjectMeta.entriesSetter.length > 0) ||
			((
				this.#status.entriesGetter === "true" ||
				this.#status.entriesSetter === "true"
			) && itemObjectMeta.entriesNonAccessor.length > 0) ||
			(this.#status.entriesWritable === "false" && itemObjectMeta.entriesWritable.length > 0) ||
			(this.#status.entriesWritable === "true" && itemObjectMeta.entriesNonWritable.length > 0)
		) {
			return false;
		}
		return true;
	}
	/**
	 * Determine item with the object filter.
	 * @param {unknown} item Item that need to determine.
	 * @param {ObjectFilterOptions} [options={}] Options.
	 * @returns {boolean} Determine result.
	 */
	static test(item: unknown, options: ObjectFilterOptions = {}): boolean {
		return new this(options).test(item);
	}
}
/**
 * Determine item with the object filter.
 * @param {unknown} item Item that need to determine.
 * @param {ObjectFilterOptions} [options={}] Options.
 * @returns {boolean} Determine result.
 */
export function filterObject(item: unknown, options: ObjectFilterOptions = {}): boolean {
	return new ObjectFilter(options).test(item);
}
