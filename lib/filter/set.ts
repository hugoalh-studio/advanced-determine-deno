interface SetFilterStatus {
	/**
	 * @property sizeMaximum
	 * @description Maximum size of the `Set`.
	 * @default Infinity
	 */
	sizeMaximum: number;
	/**
	 * @property sizeMinimum
	 * @description Minimum size of the `Set`.
	 * @default 1
	 */
	sizeMinimum: number;
}
interface SetFilterOptions extends Partial<SetFilterStatus> {
	/**
	 * @property allowEmpty
	 * @description Whether to allow an empty `Set`.
	 * @default false
	 */
	allowEmpty?: boolean;
	/**
	 * @property size
	 * @description Size of the `Set`.
	 * @default undefined
	 */
	size?: number;
	/** @alias sizeMaximum */sizeMax?: number;
	/** @alias sizeMaximum */maximumSize?: number;
	/** @alias sizeMaximum */maxSize?: number;
	/** @alias sizeMinimum */sizeMin?: number;
	/** @alias sizeMinimum */minimumSize?: number;
	/** @alias sizeMinimum */minSize?: number;
}
/**
 * @class SetFilter
 * @description Filter for `Set`.
 */
class SetFilter {
	#sizeMaximum = Infinity;
	#sizeMinimum = 1;
	/**
	 * @constructor
	 * @description Initialize the `Set` filter.
	 * @param {SetFilter | SetFilterOptions} [options] Options.
	 */
	constructor(options?: SetFilter | SetFilterOptions) {
		if (options instanceof SetFilter) {
			this.#sizeMaximum = options.#sizeMaximum;
			this.#sizeMinimum = options.#sizeMinimum;
		} else if (typeof options !== "undefined") {
			options.sizeMaximum ??= options.sizeMax ?? options.maximumSize ?? options.maxSize;
			options.sizeMinimum ??= options.sizeMin ?? options.minimumSize ?? options.minSize;
			for (let option of ["sizeMaximum", "sizeMinimum", "allowEmpty", "size"]) {
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
	 * @description Clone this `Set` filter for reuse.
	 * @returns {SetFilter} Another instance of this `Set` filter.
	 */
	get clone(): SetFilter {
		return new SetFilter(this);
	}
	/**
	 * @method status
	 * @description Get the status of this `Set` filter.
	 * @returns {SetFilterStatus} Status of this `Set` filter.
	 */
	get status(): SetFilterStatus {
		return {
			sizeMaximum: this.#sizeMaximum,
			sizeMinimum: this.#sizeMinimum
		};
	}
	/**
	 * @method allowEmpty
	 * @description Whether to allow an empty `Set`.
	 * @param {boolean} [value=true]
	 * @returns {this}
	 */
	allowEmpty(value = true): this {
		if (typeof value !== "boolean") {
			throw new TypeError(`Filter argument \`allowEmpty\` must be type of boolean!`);
		}
		this.#sizeMinimum = value ? 0 : 1;
		return this;
	}
	/**
	 * @method size
	 * @description Size of the `Set`.
	 * @param {number} value
	 * @returns {this}
	 */
	size(value: number): this {
		if (!(typeof value === "number" && !Number.isNaN(value))) {
			throw new TypeError(`Filter argument \`size\` must be type of number!`);
		}
		if (!(Number.isSafeInteger(value) && value >= 0)) {
			throw new RangeError(`Filter argument \`size\` must be a number which is integer, positive, and safe!`);
		}
		this.#sizeMaximum = value;
		this.#sizeMinimum = value;
		return this;
	}
	/**
	 * @method sizeMaximum
	 * @description Maximum size of the `Set`.
	 * @param {number} value
	 * @returns {this}
	 */
	sizeMaximum(value: number): this {
		if (!(typeof value === "number" && !Number.isNaN(value))) {
			throw new TypeError(`Filter argument \`sizeMaximum\` must be type of number!`);
		}
		if (value !== Infinity && !(Number.isSafeInteger(value) && value >= 0 && value >= this.#sizeMinimum)) {
			throw new RangeError(`Filter argument \`sizeMaximum\` must be \`Infinity\`, or a number which is integer, positive, safe, and >= ${this.#sizeMinimum}!`);
		}
		this.#sizeMaximum = value;
		return this;
	}
	/**
	 * @method sizeMinimum
	 * @description Minimum size of the `Set`.
	 * @param {number} value
	 * @returns {this}
	 */
	sizeMinimum(value: number): this {
		if (!(typeof value === "number" && !Number.isNaN(value))) {
			throw new TypeError(`Filter argument \`sizeMinimum\` must be type of number!`);
		}
		if (!(Number.isSafeInteger(value) && value >= 0 && value <= this.#sizeMaximum)) {
			throw new RangeError(`Filter argument \`sizeMinimum\` must be a number which is integer, positive, safe, and <= ${this.#sizeMaximum}!`);
		}
		this.#sizeMinimum = value;
		return this;
	}
	/** @alias sizeMaximum */sizeMax = this.sizeMaximum;
	/** @alias sizeMaximum */maximumSize = this.sizeMaximum;
	/** @alias sizeMaximum */maxSize = this.sizeMaximum;
	/** @alias sizeMinimum */sizeMin = this.sizeMinimum;
	/** @alias sizeMinimum */minimumSize = this.sizeMinimum;
	/** @alias sizeMinimum */minSize = this.sizeMinimum;
	/**
	 * @method test
	 * @description Determine item with the configured `Set` filter.
	 * @param {unknown} item Item that need to determine.
	 * @returns {boolean} Determine result.
	 */
	test(item: unknown): boolean {
		if (
			!(item instanceof Set) ||
			this.#sizeMaximum < item.size ||
			item.size < this.#sizeMinimum
		) {
			return false;
		}
		return true;
	}
	/**
	 * @static test
	 * @description Determine item with the `Set` filter.
	 * @param {unknown} item Item that need to determine.
	 * @param {SetFilterOptions} [options={}] Options.
	 * @returns {boolean} Determine result.
	 */
	static test(item: unknown, options: SetFilterOptions = {}): boolean {
		return new this(options).test(item);
	}
}
/**
 * @function filterSet
 * @description Determine item with the `Set` filter.
 * @param {unknown} item Item that need to determine.
 * @param {SetFilterOptions} [options={}] Options.
 * @returns {boolean} Determine result.
 */
function filterSet(item: unknown, options: SetFilterOptions = {}): boolean {
	return new SetFilter(options).test(item);
}
export {
	filterSet,
	SetFilter,
	type SetFilterOptions,
	type SetFilterStatus
};
