export interface MapFilterStatus {
	/**
	 * Maximum size of the `Map`.
	 * @default Infinity
	 */
	sizeMaximum: number;
	/**
	 * Minimum size of the `Map`.
	 * @default 1
	 */
	sizeMinimum: number;
}
export interface MapFilterOptions extends Partial<MapFilterStatus> {
	/**
	 * Whether to allow an empty `Map`.
	 * @default false
	 */
	allowEmpty?: boolean;
	/**
	 * Size of the `Map`.
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
 * Filter for `Map`.
 */
export class MapFilter {
	#status: MapFilterStatus = {
		sizeMaximum: Infinity,
		sizeMinimum: 1
	};
	/**
	 * Initialize the `Map` filter.
	 * @param {MapFilter | MapFilterOptions} [options] Options.
	 */
	constructor(options?: MapFilter | MapFilterOptions) {
		if (options instanceof MapFilter) {
			this.#status = { ...options.#status };
		} else if (typeof options !== "undefined") {
			options.sizeMaximum ??= options.sizeMax ?? options.maximumSize ?? options.maxSize;
			options.sizeMinimum ??= options.sizeMin ?? options.minimumSize ?? options.minSize;
			for (const option of ["sizeMaximum", "sizeMinimum", "allowEmpty", "size"]) {
				//@ts-ignore Handle by it's method.
				if (typeof options[option] !== "undefined") {
					//@ts-ignore Handle by it's method.
					this[option](options[option]);
				}
			}
		}
	}
	/**
	 * Clone this `Map` filter for reuse.
	 * @returns {MapFilter} Another instance of this `Map` filter.
	 */
	get clone(): MapFilter {
		return new MapFilter(this);
	}
	/**
	 * Get the status of this `Map` filter.
	 * @returns {MapFilterStatus} Status of this `Map` filter.
	 */
	get status(): MapFilterStatus {
		return { ...this.#status };
	}
	/**
	 * Whether to allow an empty `Map`.
	 * @param {boolean} [value=true]
	 * @returns {this}
	 */
	allowEmpty(value = true): this {
		if (typeof value !== "boolean") {
			throw new TypeError(`Filter status \`allowEmpty\` is not a boolean!`);
		}
		this.#status.sizeMinimum = value ? 0 : 1;
		return this;
	}
	/**
	 * Size of the `Map`.
	 * @param {number} value
	 * @returns {this}
	 */
	size(value: number): this {
		if (!(typeof value === "number" && !Number.isNaN(value))) {
			throw new TypeError(`Filter status \`size\` is not a number!`);
		}
		if (!(Number.isSafeInteger(value) && value >= 0)) {
			throw new RangeError(`Filter status \`size\` is not a number which is integer, positive, and safe!`);
		}
		this.#status.sizeMaximum = value;
		this.#status.sizeMinimum = value;
		return this;
	}
	/**
	 * Maximum size of the `Map`.
	 * @param {number} value
	 * @returns {this}
	 */
	sizeMaximum(value: number): this {
		if (!(typeof value === "number" && !Number.isNaN(value))) {
			throw new TypeError(`Filter status \`sizeMaximum\` is not a number!`);
		}
		if (value !== Infinity && !(Number.isSafeInteger(value) && value >= 0 && value >= this.#status.sizeMinimum)) {
			throw new RangeError(`Filter status \`sizeMaximum\` is not \`Infinity\`, or a number which is integer, positive, safe, and >= ${this.#status.sizeMinimum}!`);
		}
		this.#status.sizeMaximum = value;
		return this;
	}
	/**
	 * Minimum size of the `Map`.
	 * @param {number} value
	 * @returns {this}
	 */
	sizeMinimum(value: number): this {
		if (!(typeof value === "number" && !Number.isNaN(value))) {
			throw new TypeError(`Filter status \`sizeMinimum\` is not a number!`);
		}
		if (!(Number.isSafeInteger(value) && value >= 0 && value <= this.#status.sizeMaximum)) {
			throw new RangeError(`Filter status \`sizeMinimum\` is not a number which is integer, positive, safe, and <= ${this.#status.sizeMaximum}!`);
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
	 * Determine item with the configured `Map` filter.
	 * @param {unknown} item Item that need to determine.
	 * @returns {boolean} Determine result.
	 */
	test(item: unknown): boolean {
		if (
			!(item instanceof Map) ||
			this.#status.sizeMaximum < item.size ||
			item.size < this.#status.sizeMinimum
		) {
			return false;
		}
		return true;
	}
	/**
	 * Determine item with the `Map` filter.
	 * @param {unknown} item Item that need to determine.
	 * @param {MapFilterOptions} [options={}] Options.
	 * @returns {boolean} Determine result.
	 */
	static test(item: unknown, options: MapFilterOptions = {}): boolean {
		return new this(options).test(item);
	}
}
/**
 * Determine item with the `Map` filter.
 * @param {unknown} item Item that need to determine.
 * @param {MapFilterOptions} [options={}] Options.
 * @returns {boolean} Determine result.
 */
export function filterMap(item: unknown, options: MapFilterOptions = {}): boolean {
	return new MapFilter(options).test(item);
}
