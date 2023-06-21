import { enumResolver, ThreePhaseConditionEnum, type ThreePhaseConditionEnumKeysType, type ThreePhaseConditionEnumValuesType } from "../internal/enum.ts";
import { ObjectMeta } from "../internal/object-meta.ts";
interface ObjectFilterStatus {
	/**
	 * @property allowArray
	 * @description Whether to allow `Array` object.
	 * @default false
	 */
	allowArray: boolean;
	/**
	 * @property allowNull
	 * @description Whether to allow `null` object.
	 * @default false
	 */
	allowNull: boolean;
	/**
	 * @property allowRegExp
	 * @description Whether to allow `RegExp` object.
	 * @default false
	 */
	allowRegExp: boolean;
	/**
	 * @property entriesConfigurable
	 * @description Whether contain configurable entries in the object.
	 * @default "neutral"
	 */
	entriesConfigurable: ThreePhaseConditionEnumValuesType;
	/**
	 * @property entriesCountMaximum
	 * @description Maximum entries count of the object.
	 * @default Infinity
	 */
	entriesCountMaximum: number;
	/**
	 * @property entriesMinimum
	 * @description Minimum entries count of the object.
	 * @default 1
	 */
	entriesCountMinimum: number;
	/**
	 * @property entriesEnumerable
	 * @description Whether contain enumerable entries in the object.
	 * @default "neutral"
	 */
	entriesEnumerable: ThreePhaseConditionEnumValuesType;
	/**
	 * @property entriesGetter
	 * @description Whether contain getter entries in the object.
	 * @default "neutral"
	 */
	entriesGetter: ThreePhaseConditionEnumValuesType;
	/**
	 * @property entriesSetter
	 * @description Whether contain setter entries in the object.
	 * @default "neutral"
	 */
	entriesSetter: ThreePhaseConditionEnumValuesType;
	/**
	 * @property entriesWritable
	 * @description Whether contain writable entries in the object.
	 * @default "neutral"
	 */
	entriesWritable: ThreePhaseConditionEnumValuesType;
	/**
	 * @property keysSymbol
	 * @description Whether contain symbols in the object keys.
	 * @default "neutral"
	 */
	keysSymbol: ThreePhaseConditionEnumValuesType;
}
interface ObjectFilterOptions extends Partial<Omit<ObjectFilterStatus, "entriesConfigurable" | "entriesEnumerable" | "entriesGetter" | "entriesSetter" | "entriesWritable" | "keysSymbol">> {
	/**
	 * @property allowEmpty
	 * @description Whether to allow an empty object.
	 * @default false
	 */
	allowEmpty?: boolean;
	/**
	 * @property entriesConfigurable
	 * @description Whether contain configurable entries in the object.
	 * @default "neutral"
	 */
	entriesConfigurable?: ThreePhaseConditionEnumKeysType;
	/**
	 * @property entriesCount
	 * @description Entries count of the object.
	 * @default undefined
	 */
	entriesCount?: number;
	/**
	 * @property entriesEnumerable
	 * @description Whether contain enumerable entries in the object.
	 * @default "neutral"
	 */
	entriesEnumerable?: ThreePhaseConditionEnumKeysType;
	/**
	 * @property entriesGetter
	 * @description Whether contain getter entries in the object.
	 * @default "neutral"
	 */
	entriesGetter?: ThreePhaseConditionEnumKeysType;
	/**
	 * @property entriesSetter
	 * @description Whether contain setter entries in the object.
	 * @default "neutral"
	 */
	entriesSetter?: ThreePhaseConditionEnumKeysType;
	/**
	 * @property entriesWritable
	 * @description Whether contain writable entries in the object.
	 * @default "neutral"
	 */
	entriesWritable?: ThreePhaseConditionEnumKeysType;
	/**
	 * @property keysSymbol
	 * @description Whether contain symbols in the object keys.
	 * @default "neutral"
	 */
	keysSymbol?: ThreePhaseConditionEnumKeysType;
	/**
	 * @property plain
	 * @description Whether to not allow getters, setters, non-configurable, non-enumerable, and non-writable in the object, and not allow symbols in the object keys.
	 * @default false
	 */
	plain?: boolean;
	/** @alias allowRegExp */allowRegularExpression?: boolean;
	/** @alias entriesConfigurable */configurableEntries?: ThreePhaseConditionEnumKeysType;
	/** @alias entriesCountMaximum */entriesCountMax?: number;
	/** @alias entriesCountMaximum */maximumEntries?: number;
	/** @alias entriesCountMaximum */maxEntries?: number;
	/** @alias entriesCountMinimum */entriesCountMin?: number;
	/** @alias entriesCountMinimum */minimumEntries?: number;
	/** @alias entriesCountMinimum */minEntries?: number;
	/** @alias entriesEnumerable */enumerableEntries?: ThreePhaseConditionEnumKeysType;
	/** @alias entriesGetter */getterEntries?: ThreePhaseConditionEnumKeysType;
	/** @alias entriesSetter */setterEntries?: ThreePhaseConditionEnumKeysType;
	/** @alias entriesWritable */writableEntries?: ThreePhaseConditionEnumKeysType;
	/** @alias keysSymbol */symbolKeys?: ThreePhaseConditionEnumKeysType;
}
/**
 * @class ObjectFilter
 * @description Filter for object.
 */
class ObjectFilter {
	#allowArray = false;
	#allowNull = false;
	#allowRegExp = false;
	#entriesConfigurable: ThreePhaseConditionEnumValuesType = "neutral";
	#entriesCountMaximum = Infinity;
	#entriesCountMinimum = 1;
	#entriesEnumerable: ThreePhaseConditionEnumValuesType = "neutral";
	#entriesGetter: ThreePhaseConditionEnumValuesType = "neutral";
	#entriesSetter: ThreePhaseConditionEnumValuesType = "neutral";
	#entriesWritable: ThreePhaseConditionEnumValuesType = "neutral";
	#keysSymbol: ThreePhaseConditionEnumValuesType = "neutral";
	/**
	 * @constructor
	 * @description Initialize the object filter.
	 * @param {ObjectFilter | ObjectFilterOptions} [options] Options.
	 */
	constructor(options?: ObjectFilter | ObjectFilterOptions) {
		if (options instanceof ObjectFilter) {
			this.#allowArray = options.#allowArray;
			this.#allowNull = options.#allowNull;
			this.#allowRegExp = options.#allowRegExp;
			this.#entriesConfigurable = options.#entriesConfigurable;
			this.#entriesCountMaximum = options.#entriesCountMaximum;
			this.#entriesCountMinimum = options.#entriesCountMinimum;
			this.#entriesEnumerable = options.#entriesEnumerable;
			this.#entriesGetter = options.#entriesGetter;
			this.#entriesSetter = options.#entriesSetter;
			this.#entriesWritable = options.#entriesWritable;
			this.#keysSymbol = options.#keysSymbol;
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
			for (let option of ["allowArray", "allowNull", "allowRegExp", "entriesConfigurable", "entriesCountMaximum", "entriesCountMinimum", "entriesEnumerable", "entriesGetter", "entriesSetter", "entriesWritable", "keysSymbol", "allowEmpty", "entriesCount", "plain"]) {
				//@ts-ignore False positive.
				if (typeof options[option] !== "undefined") {
					//@ts-ignore False positive.
					this[option](options[option]);
				}
			}
		}
	}
	/**
	 * @method clone
	 * @description Clone this object filter for reuse.
	 * @returns {ObjectFilter} Another instance of this object filter.
	 */
	get clone(): ObjectFilter {
		return new ObjectFilter(this);
	}
	/**
	 * @method status
	 * @description Get the status of this object filter.
	 * @returns {ObjectFilterStatus} Status of this object filter.
	 */
	get status(): ObjectFilterStatus {
		return {
			allowArray: this.#allowArray,
			allowNull: this.#allowNull,
			allowRegExp: this.#allowRegExp,
			entriesConfigurable: this.#entriesConfigurable,
			entriesCountMaximum: this.#entriesCountMaximum,
			entriesCountMinimum: this.#entriesCountMinimum,
			entriesEnumerable: this.#entriesEnumerable,
			entriesGetter: this.#entriesGetter,
			entriesSetter: this.#entriesSetter,
			entriesWritable: this.#entriesWritable,
			keysSymbol: this.#keysSymbol
		};
	}
	/**
	 * @method allowArray
	 * @description Whether to allow `Array` object.
	 * @param {boolean} [value=true]
	 * @returns {this}
	 */
	allowArray(value = true): this {
		if (typeof value !== "boolean") {
			throw new TypeError(`Filter argument \`allowArray\` must be type of boolean!`);
		}
		this.#allowArray = value;
		return this;
	}
	/**
	 * @method allowEmpty
	 * @description Whether to allow an empty object.
	 * @param {boolean} [value=true]
	 * @returns {this}
	 */
	allowEmpty(value = true): this {
		if (typeof value !== "boolean") {
			throw new TypeError(`Filter argument \`allowEmpty\` must be type of boolean!`);
		}
		this.#entriesCountMinimum = value ? 0 : 1;
		return this;
	}
	/**
	 * @method allowNull
	 * @description Whether to allow `null` object.
	 * @param {boolean} [value=true]
	 * @returns {this}
	 */
	allowNull(value = true): this {
		if (typeof value !== "boolean") {
			throw new TypeError(`Filter argument \`allowNull\` must be type of boolean!`);
		}
		this.#allowNull = value;
		return this;
	}
	/**
	 * @method allowRegExp
	 * @description Whether to allow `RegExp` object.
	 * @param {boolean} [value=true]
	 * @returns {this}
	 */
	allowRegExp(value = true): this {
		if (typeof value !== "boolean") {
			throw new TypeError(`Filter argument \`allowRegExp\` must be type of boolean!`);
		}
		this.#allowRegExp = value;
		return this;
	}
	/**
	 * @method entriesConfigurable
	 * @description Whether contain configurable entries in the object.
	 * @param {ThreePhaseConditionEnumKeysType} value
	 * @returns {this}
	 */
	entriesConfigurable(value: ThreePhaseConditionEnumKeysType): this {
		if (typeof value !== "string") {
			throw new TypeError(`Filter argument \`entriesConfigurable\` must be type of string!`);
		}
		let valueResolve: ThreePhaseConditionEnumValuesType | undefined = enumResolver<ThreePhaseConditionEnumKeysType, ThreePhaseConditionEnumValuesType>(ThreePhaseConditionEnum, value);
		if (typeof valueResolve !== "string") {
			throw new RangeError(`Filter argument \`entriesConfigurable\` must be either of these values: "${Object.keys(ThreePhaseConditionEnum).sort().join("\", \"")}"`);
		}
		this.#entriesConfigurable = valueResolve;
		return this;
	}
	/**
	 * @method entriesCount
	 * @description Entries count of the object.
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
		this.#entriesCountMaximum = value;
		this.#entriesCountMinimum = value;
		return this;
	}
	/**
	 * @method entriesCountMaximum
	 * @description Maximum entries count of the object.
	 * @param {number} value
	 * @returns {this}
	 */
	entriesCountMaximum(value: number): this {
		if (!(typeof value === "number" && !Number.isNaN(value))) {
			throw new TypeError(`Filter argument \`entriesCountMaximum\` must be type of number!`);
		}
		if (value !== Infinity && !(Number.isSafeInteger(value) && value >= 0 && value >= this.#entriesCountMinimum)) {
			throw new RangeError(`Filter argument \`entriesCountMaximum\` must be \`Infinity\`, or a number which is integer, positive, safe, and >= ${this.#entriesCountMinimum}!`);
		}
		this.#entriesCountMaximum = value;
		return this;
	}
	/**
	 * @method entriesCountMinimum
	 * @description Minimum entries count of the object.
	 * @param {number} value
	 * @returns {this}
	 */
	entriesCountMinimum(value: number): this {
		if (!(typeof value === "number" && !Number.isNaN(value))) {
			throw new TypeError(`Filter argument \`entriesCountMinimum\` must be type of number!`);
		}
		if (!(Number.isSafeInteger(value) && value >= 0 && value <= this.#entriesCountMaximum)) {
			throw new RangeError(`Filter argument \`entriesCountMinimum\` must be a number which is integer, positive, safe, and <= ${this.#entriesCountMaximum}!`);
		}
		this.#entriesCountMinimum = value;
		return this;
	}
	/**
	 * @method entriesEnumerable
	 * @description Whether contain enumerable entries in the object.
	 * @param {ThreePhaseConditionEnumKeysType} value
	 * @returns {this}
	 */
	entriesEnumerable(value: ThreePhaseConditionEnumKeysType): this {
		if (typeof value !== "string") {
			throw new TypeError(`Filter argument \`entriesEnumerable\` must be type of string!`);
		}
		let valueResolve: ThreePhaseConditionEnumValuesType | undefined = enumResolver<ThreePhaseConditionEnumKeysType, ThreePhaseConditionEnumValuesType>(ThreePhaseConditionEnum, value);
		if (typeof valueResolve !== "string") {
			throw new RangeError(`Filter argument \`entriesEnumerable\` must be either of these values: "${Object.keys(ThreePhaseConditionEnum).sort().join("\", \"")}"`);
		}
		this.#entriesEnumerable = valueResolve;
		return this;
	}
	/**
	 * @method entriesGetter
	 * @description Whether contain getter entries in the object.
	 * @param {ThreePhaseConditionEnumKeysType} value
	 * @returns {this}
	 */
	entriesGetter(value: ThreePhaseConditionEnumKeysType): this {
		if (typeof value !== "string") {
			throw new TypeError(`Filter argument \`entriesGetter\` must be type of string!`);
		}
		let valueResolve: ThreePhaseConditionEnumValuesType | undefined = enumResolver<ThreePhaseConditionEnumKeysType, ThreePhaseConditionEnumValuesType>(ThreePhaseConditionEnum, value);
		if (typeof valueResolve !== "string") {
			throw new RangeError(`Filter argument \`entriesGetter\` must be either of these values: "${Object.keys(ThreePhaseConditionEnum).sort().join("\", \"")}"`);
		}
		this.#entriesGetter = valueResolve;
		return this;
	}
	/**
	 * @method entriesSetter
	 * @description Whether contain setter entries in the object.
	 * @param {ThreePhaseConditionEnumKeysType} value
	 * @returns {this}
	 */
	entriesSetter(value: ThreePhaseConditionEnumKeysType): this {
		if (typeof value !== "string") {
			throw new TypeError(`Filter argument \`entriesSetter\` must be type of string!`);
		}
		let valueResolve: ThreePhaseConditionEnumValuesType | undefined = enumResolver<ThreePhaseConditionEnumKeysType, ThreePhaseConditionEnumValuesType>(ThreePhaseConditionEnum, value);
		if (typeof valueResolve !== "string") {
			throw new RangeError(`Filter argument \`entriesSetter\` must be either of these values: "${Object.keys(ThreePhaseConditionEnum).sort().join("\", \"")}"`);
		}
		this.#entriesSetter = valueResolve;
		return this;
	}
	/**
	 * @method entriesWritable
	 * @description Whether contain writable entries in the object.
	 * @param {ThreePhaseConditionEnumKeysType} value
	 * @returns {this}
	 */
	entriesWritable(value: ThreePhaseConditionEnumKeysType): this {
		if (typeof value !== "string") {
			throw new TypeError(`Filter argument \`entriesWritable\` must be type of string!`);
		}
		let valueResolve: ThreePhaseConditionEnumValuesType | undefined = enumResolver<ThreePhaseConditionEnumKeysType, ThreePhaseConditionEnumValuesType>(ThreePhaseConditionEnum, value);
		if (typeof valueResolve !== "string") {
			throw new RangeError(`Filter argument \`entriesWritable\` must be either of these values: "${Object.keys(ThreePhaseConditionEnum).sort().join("\", \"")}"`);
		}
		this.#entriesWritable = valueResolve;
		return this;
	}
	/**
	 * @method keysSymbol
	 * @description Whether contain symbols in the object keys.
	 * @param {ThreePhaseConditionEnumKeysType} value
	 * @returns {this}
	 */
	keysSymbol(value: ThreePhaseConditionEnumKeysType): this {
		if (typeof value !== "string") {
			throw new TypeError(`Filter argument \`keysSymbol\` must be type of string!`);
		}
		let valueResolve: ThreePhaseConditionEnumValuesType | undefined = enumResolver<ThreePhaseConditionEnumKeysType, ThreePhaseConditionEnumValuesType>(ThreePhaseConditionEnum, value);
		if (typeof valueResolve !== "string") {
			throw new RangeError(`Filter argument \`keysSymbol\` must be either of these values: "${Object.keys(ThreePhaseConditionEnum).sort().join("\", \"")}"`);
		}
		this.#keysSymbol = valueResolve;
		return this;
	}
	/**
	 * @method plain
	 * @description Whether to not allow getters, setters, non-configurable, non-enumerable, and non-writable in the object, and not allow symbols in the object keys.
	 * @param {boolean} [value=true]
	 * @returns {this}
	 */
	plain(value = true): this {
		if (typeof value !== "boolean") {
			throw new TypeError(`Filter argument \`plain\` must be type of boolean!`);
		}
		if (value) {
			this.#entriesConfigurable = "true";
			this.#entriesEnumerable = "true";
			this.#entriesGetter = "false";
			this.#entriesSetter = "false";
			this.#entriesWritable = "true";
			this.#keysSymbol = "false";
		} else {
			this.#entriesConfigurable = "neutral";
			this.#entriesEnumerable = "neutral";
			this.#entriesGetter = "neutral";
			this.#entriesSetter = "neutral";
			this.#entriesWritable = "neutral";
			this.#keysSymbol = "neutral";
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
	 * @method test
	 * @description Determine item with the configured object filter.
	 * @param {unknown} item Item that need to determine.
	 * @returns {boolean} Determine result.
	 */
	test(item: unknown): boolean {
		if (
			typeof item !== "object" ||
			(!this.#allowArray && Array.isArray(item)) ||
			(!this.#allowNull && item === null) ||
			(!this.#allowRegExp && item instanceof RegExp)
		) {
			return false;
		}
		//@ts-ignore False positive.
		let itemObjectMeta: ObjectMeta = new ObjectMeta(item);
		if (
			//@ts-ignore False positive.
			Object.entries(item).length !== itemObjectMeta.entriesEnumerable.length ||
			(this.#keysSymbol === "false" && itemObjectMeta.keysSymbol.length > 0) ||
			(this.#keysSymbol === "true" && itemObjectMeta.keysSymbol.length === 0) ||
			this.#entriesCountMaximum < itemObjectMeta.entriesGetter.length + itemObjectMeta.entriesNonAccessor.length + itemObjectMeta.entriesSetter.length + itemObjectMeta.keysSymbol.length ||
			itemObjectMeta.entriesGetter.length + itemObjectMeta.entriesNonAccessor.length + itemObjectMeta.entriesSetter.length + itemObjectMeta.keysSymbol.length < this.#entriesCountMinimum ||
			(this.#entriesConfigurable === "false" && itemObjectMeta.entriesConfigurable.length > 0) ||
			(this.#entriesConfigurable === "true" && itemObjectMeta.entriesNonConfigurable.length > 0) ||
			(this.#entriesEnumerable === "false" && itemObjectMeta.entriesEnumerable.length > 0) ||
			(this.#entriesEnumerable === "true" && itemObjectMeta.entriesNonEnumerable.length > 0) ||
			(this.#entriesGetter === "false" && itemObjectMeta.entriesGetter.length > 0) ||
			(this.#entriesSetter === "false" && itemObjectMeta.entriesSetter.length > 0) ||
			((
				this.#entriesGetter === "true" ||
				this.#entriesSetter === "true"
			) && itemObjectMeta.entriesNonAccessor.length > 0) ||
			(this.#entriesWritable === "false" && itemObjectMeta.entriesWritable.length > 0) ||
			(this.#entriesWritable === "true" && itemObjectMeta.entriesNonWritable.length > 0)
		) {
			return false;
		}
		return true;
	}
	/**
	 * @static test
	 * @description Determine item with the object filter.
	 * @param {unknown} item Item that need to determine.
	 * @param {ObjectFilterOptions} [options={}] Options.
	 * @returns {boolean} Determine result.
	 */
	static test(item: unknown, options: ObjectFilterOptions = {}): boolean {
		return new this(options).test(item);
	}
}
/**
 * @function filterObject
 * @description Determine item with the object filter.
 * @param {unknown} item Item that need to determine.
 * @param {ObjectFilterOptions} [options={}] Options.
 * @returns {boolean} Determine result.
 */
function filterObject(item: unknown, options: ObjectFilterOptions = {}): boolean {
	return new ObjectFilter(options).test(item);
}
export {
	filterObject,
	ObjectFilter,
	type ObjectFilterOptions,
	type ObjectFilterStatus
};
