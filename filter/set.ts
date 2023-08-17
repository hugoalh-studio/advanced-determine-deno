export interface SetFilterStatus {
	/**
	 * Maximum size of the `Set`.
	 * @default Infinity
	 */
	sizeMaximum: number;
	/**
	 * Minimum size of the `Set`.
	 * @default 1
	 */
	sizeMinimum: number;
}
export interface SetFilterOptions extends Partial<SetFilterStatus> {
	/**
	 * Whether to allow an empty `Set`.
	 * @default false
	 */
	allowEmpty?: boolean;
	/**
	 * Size of the `Set`.
	 * @default undefined
	 */
	size?: number;
	/** @alias sizeMaximum */sizeMax?: this["sizeMaximum"];
	/** @alias sizeMaximum */maximumSize?: this["sizeMaximum"];
	/** @alias sizeMaximum */maxSize?: this["sizeMaximum"];
	/** @alias sizeMinimum */sizeMin?: this["sizeMinimum"];
	/** @alias sizeMinimum */minimumSize?: this["sizeMinimum"];
	/** @alias sizeMinimum */minSize?: this["sizeMinimum"];
}
/**
 * Filter for `Set`.
 */
export class SetFilter {
	#status: SetFilterStatus = {
		sizeMaximum: Infinity,
		sizeMinimum: 1
	};
	/**
	 * Initialize the `Set` filter.
	 * @param {SetFilter | SetFilterOptions} [options] Options.
	 */
	constructor(options?: SetFilter | SetFilterOptions) {
		if (options instanceof SetFilter) {
			this.#status = { ...options.#status };
		} else if (typeof options !== "undefined") {
			options.sizeMaximum ??= options.sizeMax ?? options.maximumSize ?? options.maxSize;
			options.sizeMinimum ??= options.sizeMin ?? options.minimumSize ?? options.minSize;
			for (let option of ["sizeMaximum", "sizeMinimum", "allowEmpty", "size"]) {
				//@ts-ignore Handle by it's method.
				if (typeof options[option] !== "undefined") {
					//@ts-ignore Handle by it's method.
					this[option](options[option]);
				}
			}
		}
	}
	/**
	 * Clone this `Set` filter for reuse.
	 * @returns {SetFilter} Another instance of this `Set` filter.
	 */
	get clone(): SetFilter {
		return new SetFilter(this);
	}
	/**
	 * Get the status of this `Set` filter.
	 * @returns {SetFilterStatus} Status of this `Set` filter.
	 */
	get status(): SetFilterStatus {
		return { ...this.#status };
	}
	/**
	 * Whether to allow an empty `Set`.
	 * @param {boolean} [value=true]
	 * @returns {this}
	 */
	allowEmpty(value = true): this {
		if (typeof value !== "boolean") {
			throw new TypeError(`Filter status \`allowEmpty\` must be type of boolean!`);
		}
		this.#status.sizeMinimum = value ? 0 : 1;
		return this;
	}
	/**
	 * Size of the `Set`.
	 * @param {number} value
	 * @returns {this}
	 */
	size(value: number): this {
		if (!(typeof value === "number" && !Number.isNaN(value))) {
			throw new TypeError(`Filter status \`size\` must be type of number!`);
		}
		if (!(Number.isSafeInteger(value) && value >= 0)) {
			throw new RangeError(`Filter status \`size\` must be a number which is integer, positive, and safe!`);
		}
		this.#status.sizeMaximum = value;
		this.#status.sizeMinimum = value;
		return this;
	}
	/**
	 * Maximum size of the `Set`.
	 * @param {number} value
	 * @returns {this}
	 */
	sizeMaximum(value: number): this {
		if (!(typeof value === "number" && !Number.isNaN(value))) {
			throw new TypeError(`Filter status \`sizeMaximum\` must be type of number!`);
		}
		if (value !== Infinity && !(Number.isSafeInteger(value) && value >= 0 && value >= this.#status.sizeMinimum)) {
			throw new RangeError(`Filter status \`sizeMaximum\` must be \`Infinity\`, or a number which is integer, positive, safe, and >= ${this.#status.sizeMinimum}!`);
		}
		this.#status.sizeMaximum = value;
		return this;
	}
	/**
	 * Minimum size of the `Set`.
	 * @param {number} value
	 * @returns {this}
	 */
	sizeMinimum(value: number): this {
		if (!(typeof value === "number" && !Number.isNaN(value))) {
			throw new TypeError(`Filter status \`sizeMinimum\` must be type of number!`);
		}
		if (!(Number.isSafeInteger(value) && value >= 0 && value <= this.#status.sizeMaximum)) {
			throw new RangeError(`Filter status \`sizeMinimum\` must be a number which is integer, positive, safe, and <= ${this.#status.sizeMaximum}!`);
		}
		this.#status.sizeMinimum = value;
		return this;
	}
	/** @alias sizeMaximum */sizeMax = this.sizeMaximum;
	/** @alias sizeMaximum */maximumSize = this.sizeMaximum;
	/** @alias sizeMaximum */maxSize = this.sizeMaximum;
	/** @alias sizeMinimum */sizeMin = this.sizeMinimum;
	/** @alias sizeMinimum */minimumSize = this.sizeMinimum;
	/** @alias sizeMinimum */minSize = this.sizeMinimum;
	/**
	 * Determine item with the configured `Set` filter.
	 * @param {unknown} item Item that need to determine.
	 * @returns {boolean} Determine result.
	 */
	test(item: unknown): boolean {
		if (
			!(item instanceof Set) ||
			this.#status.sizeMaximum < item.size ||
			item.size < this.#status.sizeMinimum
		) {
			return false;
		}
		return true;
	}
	/**
	 * Determine item with the `Set` filter.
	 * @param {unknown} item Item that need to determine.
	 * @param {SetFilterOptions} [options={}] Options.
	 * @returns {boolean} Determine result.
	 */
	static test(item: unknown, options: SetFilterOptions = {}): boolean {
		return new this(options).test(item);
	}
}
/**
 * Determine item with the `Set` filter.
 * @param {unknown} item Item that need to determine.
 * @param {SetFilterOptions} [options={}] Options.
 * @returns {boolean} Determine result.
 */
export function filterSet(item: unknown, options: SetFilterOptions = {}): boolean {
	return new SetFilter(options).test(item);
}
