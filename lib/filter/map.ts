interface MapFilterStatus {
	/**
	 * @property sizeMaximum
	 * @description Maximum size of the `Map`.
	 * @default Infinity
	 */
	sizeMaximum: number;
	/**
	 * @property sizeMinimum
	 * @description Minimum size of the `Map`.
	 * @default 1
	 */
	sizeMinimum: number;
}
interface MapFilterOptions extends Partial<MapFilterStatus> {
	/**
	 * @property allowEmpty
	 * @description Whether to allow an empty `Map`.
	 * @default false
	 */
	allowEmpty?: boolean;
	/**
	 * @property size
	 * @description Size of the `Map`.
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
 * @class MapFilter
 * @description Filter for `Map`.
 */
class MapFilter {
	#status: MapFilterStatus = {
		sizeMaximum: Infinity,
		sizeMinimum: 1
	};
	/**
	 * @constructor
	 * @description Initialize the `Map` filter.
	 * @param {MapFilter | MapFilterOptions} [options] Options.
	 */
	constructor(options?: MapFilter | MapFilterOptions) {
		if (options instanceof MapFilter) {
			this.#status = { ...options.#status };
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
	 * @description Clone this `Map` filter for reuse.
	 * @returns {MapFilter} Another instance of this `Map` filter.
	 */
	get clone(): MapFilter {
		return new MapFilter(this);
	}
	/**
	 * @method status
	 * @description Get the status of this `Map` filter.
	 * @returns {MapFilterStatus} Status of this `Map` filter.
	 */
	get status(): MapFilterStatus {
		return { ...this.#status };
	}
	/**
	 * @method allowEmpty
	 * @description Whether to allow an empty `Map`.
	 * @param {boolean} [value=true]
	 * @returns {this}
	 */
	allowEmpty(value = true): this {
		if (typeof value !== "boolean") {
			throw new TypeError(`Filter argument \`allowEmpty\` must be type of boolean!`);
		}
		this.#status.sizeMinimum = value ? 0 : 1;
		return this;
	}
	/**
	 * @method size
	 * @description Size of the `Map`.
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
		this.#status.sizeMaximum = value;
		this.#status.sizeMinimum = value;
		return this;
	}
	/**
	 * @method sizeMaximum
	 * @description Maximum size of the `Map`.
	 * @param {number} value
	 * @returns {this}
	 */
	sizeMaximum(value: number): this {
		if (!(typeof value === "number" && !Number.isNaN(value))) {
			throw new TypeError(`Filter argument \`sizeMaximum\` must be type of number!`);
		}
		if (value !== Infinity && !(Number.isSafeInteger(value) && value >= 0 && value >= this.#status.sizeMinimum)) {
			throw new RangeError(`Filter argument \`sizeMaximum\` must be \`Infinity\`, or a number which is integer, positive, safe, and >= ${this.#status.sizeMinimum}!`);
		}
		this.#status.sizeMaximum = value;
		return this;
	}
	/**
	 * @method sizeMinimum
	 * @description Minimum size of the `Map`.
	 * @param {number} value
	 * @returns {this}
	 */
	sizeMinimum(value: number): this {
		if (!(typeof value === "number" && !Number.isNaN(value))) {
			throw new TypeError(`Filter argument \`sizeMinimum\` must be type of number!`);
		}
		if (!(Number.isSafeInteger(value) && value >= 0 && value <= this.#status.sizeMaximum)) {
			throw new RangeError(`Filter argument \`sizeMinimum\` must be a number which is integer, positive, safe, and <= ${this.#status.sizeMaximum}!`);
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
	 * @method test
	 * @description Determine item with the configured `Map` filter.
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
	 * @static test
	 * @description Determine item with the `Map` filter.
	 * @param {unknown} item Item that need to determine.
	 * @param {MapFilterOptions} [options={}] Options.
	 * @returns {boolean} Determine result.
	 */
	static test(item: unknown, options: MapFilterOptions = {}): boolean {
		return new this(options).test(item);
	}
}
/**
 * @function filterMap
 * @description Determine item with the `Map` filter.
 * @param {unknown} item Item that need to determine.
 * @param {MapFilterOptions} [options={}] Options.
 * @returns {boolean} Determine result.
 */
function filterMap(item: unknown, options: MapFilterOptions = {}): boolean {
	return new MapFilter(options).test(item);
}
export {
	filterMap,
	MapFilter,
	type MapFilterOptions,
	type MapFilterStatus
};
