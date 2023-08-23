import { isArrayStrict, isArrayUnique } from "../array.ts";
export interface ArrayFilterStatus {
	/**
	 * Maximum length of the array.
	 * @default Infinity
	 */
	lengthMaximum: number;
	/**
	 * Minimum length of the array.
	 * @default 1
	 */
	lengthMinimum: number;
	/**
	 * Whether to determine no custom defined properties in the array.
	 * @default false
	 */
	strict: boolean;
	/**
	 * Whether to determine all of the elements in the array are unique.
	 * @default false
	 */
	unique: boolean;
}
export interface ArrayFilterOptions extends Partial<ArrayFilterStatus> {
	/**
	 * Whether to allow an empty array.
	 * @default false
	 */
	allowEmpty?: boolean;
	/**
	 * Length of the array.
	 * @default undefined
	 */
	length?: number;
	/** @alias length */elements?: this["length"];
	/** @alias lengthMaximum */elementsMax?: this["lengthMaximum"];
	/** @alias lengthMaximum */elementsMaximum?: this["lengthMaximum"];
	/** @alias lengthMaximum */lengthMax?: this["lengthMaximum"];
	/** @alias lengthMaximum */maxElements?: this["lengthMaximum"];
	/** @alias lengthMaximum */maximumElements?: this["lengthMaximum"];
	/** @alias lengthMaximum */maximumLength?: this["lengthMaximum"];
	/** @alias lengthMaximum */maxLength?: this["lengthMaximum"];
	/** @alias lengthMinimum */elementsMin?: this["lengthMinimum"];
	/** @alias lengthMinimum */elementsMinimum?: this["lengthMinimum"];
	/** @alias lengthMinimum */lengthMin?: this["lengthMinimum"];
	/** @alias lengthMinimum */minElements?: this["lengthMinimum"];
	/** @alias lengthMinimum */minimumElements?: this["lengthMinimum"];
	/** @alias lengthMinimum */minimumLength?: this["lengthMinimum"];
	/** @alias lengthMinimum */minLength?: this["lengthMinimum"];
}
/**
 * Filter for array.
 */
export class ArrayFilter {
	#status: ArrayFilterStatus = {
		lengthMaximum: Infinity,
		lengthMinimum: 1,
		strict: false,
		unique: false
	};
	/**
	 * Initialize the array filter.
	 * @param {ArrayFilter | ArrayFilterOptions} [options] Options.
	 */
	constructor(options?: ArrayFilter | ArrayFilterOptions) {
		if (options instanceof ArrayFilter) {
			this.#status = { ...options.#status };
		} else if (typeof options !== "undefined") {
			options.length ??= options.elements;
			options.lengthMaximum ??= options.lengthMax ?? options.elementsMaximum ?? options.elementsMax ?? options.maximumLength ?? options.maxLength ?? options.maximumElements ?? options.maxElements;
			options.lengthMinimum ??= options.lengthMin ?? options.elementsMinimum ?? options.elementsMin ?? options.minimumLength ?? options.minLength ?? options.minimumElements ?? options.minElements;
			for (const option of ["lengthMaximum", "lengthMinimum", "strict", "unique", "allowEmpty", "length"]) {
				//@ts-ignore Handle by it's method.
				if (typeof options[option] !== "undefined") {
					//@ts-ignore Handle by it's method.
					this[option](options[option]);
				}
			}
		}
	}
	/**
	 * Clone this array filter for reuse.
	 * @returns {ArrayFilter} Another instance of this array filter.
	 */
	get clone(): ArrayFilter {
		return new ArrayFilter(this);
	}
	/**
	 * Get the status of this array filter.
	 * @returns {ArrayFilterStatus} Status of this array filter.
	 */
	get status(): ArrayFilterStatus {
		return { ...this.#status };
	}
	/**
	 * Whether to allow an empty array.
	 * @param {boolean} [value=true]
	 * @returns {this}
	 */
	allowEmpty(value = true): this {
		if (typeof value !== "boolean") {
			throw new TypeError(`Filter status \`allowEmpty\` must be type of boolean!`);
		}
		this.#status.lengthMinimum = value ? 0 : 1;
		return this;
	}
	/**
	 * Length of the array.
	 * @param {number} value
	 * @returns {this}
	 */
	length(value: number): this {
		if (!(typeof value === "number" && !Number.isNaN(value))) {
			throw new TypeError(`Filter status \`length\` must be type of number!`);
		}
		if (!(Number.isSafeInteger(value) && value >= 0)) {
			throw new RangeError(`Filter status \`length\` must be a number which is integer, positive, and safe!`);
		}
		this.#status.lengthMaximum = value;
		this.#status.lengthMinimum = value;
		return this;
	}
	/**
	 * Maximum length of the array.
	 * @param {number} value
	 * @returns {this}
	 */
	lengthMaximum(value: number): this {
		if (!(typeof value === "number" && !Number.isNaN(value))) {
			throw new TypeError(`Filter status \`lengthMaximum\` must be type of number!`);
		}
		if (value !== Infinity && !(Number.isSafeInteger(value) && value >= 0 && value >= this.#status.lengthMinimum)) {
			throw new RangeError(`Filter status \`lengthMaximum\` must be \`Infinity\`, or a number which is integer, positive, safe, and >= ${this.#status.lengthMinimum}!`);
		}
		this.#status.lengthMaximum = value;
		return this;
	}
	/**
	 * Minimum length of the array.
	 * @param {number} value
	 * @returns {this}
	 */
	lengthMinimum(value: number): this {
		if (!(typeof value === "number" && !Number.isNaN(value))) {
			throw new TypeError(`Filter status \`lengthMinimum\` must be type of number!`);
		}
		if (!(Number.isSafeInteger(value) && value >= 0 && value <= this.#status.lengthMaximum)) {
			throw new RangeError(`Filter status \`lengthMinimum\` must be a number which is integer, positive, safe, and <= ${this.#status.lengthMaximum}!`);
		}
		this.#status.lengthMinimum = value;
		return this;
	}
	/**
	 * Whether to determine no custom defined properties in the array.
	 * @param {boolean} [value=true]
	 * @returns {this}
	 */
	strict(value = true): this {
		if (typeof value !== "boolean") {
			throw new TypeError(`Filter status \`strict\` must be type of boolean!`);
		}
		this.#status.strict = value;
		return this;
	}
	/**
	 * Whether to determine all of the elements in the array are unique.
	 * @param {boolean} [value=true]
	 * @returns {this}
	 */
	unique(value = true): this {
		if (typeof value !== "boolean") {
			throw new TypeError(`Filter status \`unique\` must be type of boolean!`);
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
	 * Determine item with the configured array filter.
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
	 * Determine item with the array filter.
	 * @param {unknown} item Item that need to determine.
	 * @param {ArrayFilterOptions} [options={}] Options.
	 * @returns {boolean} Determine result.
	 */
	static test(item: unknown, options: ArrayFilterOptions = {}): boolean {
		return new this(options).test(item);
	}
}
/**
 * Determine item with the array filter.
 * @param {unknown} item Item that need to determine.
 * @param {ArrayFilterOptions} [options={}] Options.
 * @returns {boolean} Determine result.
 */
export function filterArray(item: unknown, options: ArrayFilterOptions = {}): boolean {
	return new ArrayFilter(options).test(item);
}
