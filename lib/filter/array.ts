import { isArrayStrict, isArrayUnique } from "../array.ts";
interface ArrayFilterStatus {
	/**
	 * @property lengthMaximum
	 * @description Maximum length of the array.
	 * @default Infinity
	 */
	lengthMaximum: number;
	/**
	 * @property lengthMinimum
	 * @description Minimum length of the array.
	 * @default 1
	 */
	lengthMinimum: number;
	/**
	 * @property strict
	 * @description Whether to determine no custom defined properties in the array.
	 * @default false
	 */
	strict: boolean;
	/**
	 * @property unique
	 * @description Whether to determine all of the elements in the array are unique.
	 * @default false
	 */
	unique: boolean;
}
interface ArrayFilterOptions extends Partial<ArrayFilterStatus> {
	/**
	 * @property allowEmpty
	 * @description Whether to allow an empty array.
	 * @default false
	 */
	allowEmpty?: boolean;
	/**
	 * @property length
	 * @description Length of the array.
	 * @default undefined
	 */
	length?: number;
	/** @alias length */elements?: number;
	/** @alias lengthMaximum */elementsMax?: number;
	/** @alias lengthMaximum */elementsMaximum?: number;
	/** @alias lengthMaximum */lengthMax?: number;
	/** @alias lengthMaximum */maxElements?: number;
	/** @alias lengthMaximum */maximumElements?: number;
	/** @alias lengthMaximum */maximumLength?: number;
	/** @alias lengthMaximum */maxLength?: number;
	/** @alias lengthMinimum */elementsMin?: number;
	/** @alias lengthMinimum */elementsMinimum?: number;
	/** @alias lengthMinimum */lengthMin?: number;
	/** @alias lengthMinimum */minElements?: number;
	/** @alias lengthMinimum */minimumElements?: number;
	/** @alias lengthMinimum */minimumLength?: number;
	/** @alias lengthMinimum */minLength?: number;
}
/**
 * @class ArrayFilter
 * @description Filter for array.
 */
class ArrayFilter {
	#status: ArrayFilterStatus = {
		lengthMaximum: Infinity,
		lengthMinimum: 1,
		strict: false,
		unique: false
	};
	/**
	 * @constructor
	 * @description Initialize the array filter.
	 * @param {ArrayFilter | ArrayFilterOptions} [options] Options.
	 */
	constructor(options?: ArrayFilter | ArrayFilterOptions) {
		if (options instanceof ArrayFilter) {
			this.#status = { ...options.#status };
		} else if (typeof options !== "undefined") {
			options.length ??= options.elements;
			options.lengthMaximum ??= options.lengthMax ?? options.elementsMaximum ?? options.elementsMax ?? options.maximumLength ?? options.maxLength ?? options.maximumElements ?? options.maxElements;
			options.lengthMinimum ??= options.lengthMin ?? options.elementsMinimum ?? options.elementsMin ?? options.minimumLength ?? options.minLength ?? options.minimumElements ?? options.minElements;
			for (let option of ["lengthMaximum", "lengthMinimum", "strict", "unique", "allowEmpty", "length"]) {
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
	 * @description Clone this array filter for reuse.
	 * @returns {ArrayFilter} Another instance of this array filter.
	 */
	get clone(): ArrayFilter {
		return new ArrayFilter(this);
	}
	/**
	 * @method status
	 * @description Get the status of this array filter.
	 * @returns {ArrayFilterStatus} Status of this array filter.
	 */
	get status(): ArrayFilterStatus {
		return { ...this.#status };
	}
	/**
	 * @method allowEmpty
	 * @description Whether to allow an empty array.
	 * @param {boolean} [value=true]
	 * @returns {this}
	 */
	allowEmpty(value = true): this {
		if (typeof value !== "boolean") {
			throw new TypeError(`Filter argument \`allowEmpty\` must be type of boolean!`);
		}
		this.#status.lengthMinimum = value ? 0 : 1;
		return this;
	}
	/**
	 * @method length
	 * @description Length of the array.
	 * @param {number} value
	 * @returns {this}
	 */
	length(value: number): this {
		if (!(typeof value === "number" && !Number.isNaN(value))) {
			throw new TypeError(`Filter argument \`length\` must be type of number!`);
		}
		if (!(Number.isSafeInteger(value) && value >= 0)) {
			throw new RangeError(`Filter argument \`length\` must be a number which is integer, positive, and safe!`);
		}
		this.#status.lengthMaximum = value;
		this.#status.lengthMinimum = value;
		return this;
	}
	/**
	 * @method lengthMaximum
	 * @description Maximum length of the array.
	 * @param {number} value
	 * @returns {this}
	 */
	lengthMaximum(value: number): this {
		if (!(typeof value === "number" && !Number.isNaN(value))) {
			throw new TypeError(`Filter argument \`lengthMaximum\` must be type of number!`);
		}
		if (value !== Infinity && !(Number.isSafeInteger(value) && value >= 0 && value >= this.#status.lengthMinimum)) {
			throw new RangeError(`Filter argument \`lengthMaximum\` must be \`Infinity\`, or a number which is integer, positive, safe, and >= ${this.#status.lengthMinimum}!`);
		}
		this.#status.lengthMaximum = value;
		return this;
	}
	/**
	 * @method lengthMinimum
	 * @description Minimum length of the array.
	 * @param {number} value
	 * @returns {this}
	 */
	lengthMinimum(value: number): this {
		if (!(typeof value === "number" && !Number.isNaN(value))) {
			throw new TypeError(`Filter argument \`lengthMinimum\` must be type of number!`);
		}
		if (!(Number.isSafeInteger(value) && value >= 0 && value <= this.#status.lengthMaximum)) {
			throw new RangeError(`Filter argument \`lengthMinimum\` must be a number which is integer, positive, safe, and <= ${this.#status.lengthMaximum}!`);
		}
		this.#status.lengthMinimum = value;
		return this;
	}
	/**
	 * @method strict
	 * @description Whether to determine no custom defined properties in the array.
	 * @param {boolean} [value=true]
	 * @returns {this}
	 */
	strict(value = true): this {
		if (typeof value !== "boolean") {
			throw new TypeError(`Filter argument \`strict\` must be type of boolean!`);
		}
		this.#status.strict = value;
		return this;
	}
	/**
	 * @method unique
	 * @description Whether to determine all of the elements in the array are unique.
	 * @param {boolean} [value=true]
	 * @returns {this}
	 */
	unique(value = true): this {
		if (typeof value !== "boolean") {
			throw new TypeError(`Filter argument \`unique\` must be type of boolean!`);
		}
		this.#status.unique = value;
		return this;
	}
	/** @alias length */elements = this.length;
	/** @alias lengthMaximum */elementsMax = this.lengthMaximum;
	/** @alias lengthMaximum */elementsMaximum = this.lengthMaximum;
	/** @alias lengthMaximum */lengthMax = this.lengthMaximum;
	/** @alias lengthMaximum */maxElements = this.lengthMaximum;
	/** @alias lengthMaximum */maximumElements = this.lengthMaximum;
	/** @alias lengthMaximum */maximumLength = this.lengthMaximum;
	/** @alias lengthMaximum */maxLength = this.lengthMaximum;
	/** @alias lengthMinimum */elementsMin = this.lengthMinimum;
	/** @alias lengthMinimum */elementsMinimum = this.lengthMinimum;
	/** @alias lengthMinimum */lengthMin = this.lengthMinimum;
	/** @alias lengthMinimum */minElements = this.lengthMinimum;
	/** @alias lengthMinimum */minimumElements = this.lengthMinimum;
	/** @alias lengthMinimum */minimumLength = this.lengthMinimum;
	/** @alias lengthMinimum */minLength = this.lengthMinimum;
	/**
	 * @method test
	 * @description Determine item with the configured array filter.
	 * @param {unknown} item Item that need to determine.
	 * @returns {boolean} Determine result.
	 */
	test(item: unknown): boolean {
		if (
			!Array.isArray(item) ||
			!(item instanceof Array) ||
			item.constructor.name !== "Array" ||
			Object.prototype.toString.call(item) !== "[object Array]" ||
			Object.entries(item).length !== item.length ||
			this.#status.lengthMaximum < item.length ||
			item.length < this.#status.lengthMinimum ||
			(this.#status.strict && !isArrayStrict(item)) ||
			(this.#status.unique && !isArrayUnique(item))
		) {
			return false;
		}
		return true;
	}
	/**
	 * @static test
	 * @description Determine item with the array filter.
	 * @param {unknown} item Item that need to determine.
	 * @param {ArrayFilterOptions} [options={}] Options.
	 * @returns {boolean} Determine result.
	 */
	static test(item: unknown, options: ArrayFilterOptions = {}): boolean {
		return new this(options).test(item);
	}
}
/**
 * @function filterArray
 * @description Determine item with the array filter.
 * @param {unknown} item Item that need to determine.
 * @param {ArrayFilterOptions} [options={}] Options.
 * @returns {boolean} Determine result.
 */
function filterArray(item: unknown, options: ArrayFilterOptions = {}): boolean {
	return new ArrayFilter(options).test(item);
}
export {
	ArrayFilter,
	filterArray,
	type ArrayFilterOptions,
	type ArrayFilterStatus
};
