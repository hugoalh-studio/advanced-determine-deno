import { isBigIntEven, isBigIntNegative, isBigIntOdd, isBigIntPositive, isBigIntPrime, isBigIntSafe } from "../bigint.ts";
import { enumResolver, IEEE754Enum, MathematicsParityEnum, MathematicsPrimalityEnum, MathematicsSignEnum, type IEEE754EnumKeysType, type IEEE754EnumValuesType, type IntegralNumericTypeEnumKeysType, type MathematicsParityEnumKeysType, type MathematicsParityEnumValuesType, type MathematicsPrimalityEnumKeysType, type MathematicsPrimalityEnumValuesType, type MathematicsSignEnumKeysType, type MathematicsSignEnumValuesType } from "../internal/enum.ts";
import { integralNumericTypeRange } from "../internal/numeric.ts";
export interface BigIntFilterStatus {
	/**
	 * IEEE-754 safe mode of the big integer.
	 * @default "any"
	 */
	ieee754: IEEE754EnumValuesType;
	/**
	 * Maximum of the big integer.
	 * @default undefined
	 */
	maximum?: bigint;
	/**
	 * Whether to exclusive maximum of the big integer.
	 * @default false
	 */
	maximumExclusive: boolean;
	/**
	 * Minimum of the big integer.
	 * @default undefined
	 */
	minimum?: bigint;
	/**
	 * Whether to exclusive minimum of the big integer.
	 * @default false
	 */
	minimumExclusive: boolean;
	/**
	 * Parity of the big integer.
	 * @default "any"
	 */
	parity: MathematicsParityEnumValuesType;
	/**
	 * Primality of the big integer.
	 * @default "any"
	 */
	primality: MathematicsPrimalityEnumValuesType;
	/**
	 * Sign of the big integer.
	 * @default "any"
	 */
	sign: MathematicsSignEnumValuesType;
}
export {
	type BigIntFilterStatus as BigIntegerFilterStatus
};
export interface BigIntFilterOptions extends Partial<Omit<BigIntFilterStatus, "ieee754" | "parity" | "primality" | "sign">> {
	/**
	 * IEEE-754 mode of the big integer.
	 * @default "any"
	 */
	ieee754?: IEEE754EnumKeysType;
	/**
	 * Integral numeric type of the big integer.
	 * @default undefined
	 */
	integralNumericType?: IntegralNumericTypeEnumKeysType;
	/**
	 * Parity of the big integer.
	 * @default "any"
	 */
	parity?: MathematicsParityEnumKeysType;
	/**
	 * Primality of the big integer.
	 * @default "any"
	 */
	primality?: MathematicsPrimalityEnumKeysType;
	/**
	 * Sign of the big integer.
	 * @default "any"
	 */
	sign?: MathematicsSignEnumKeysType;
	/** @alias maximum */max?: this["maximum"];
	/** @alias maximumExclusive */exclusiveMax?: this["maximumExclusive"];
	/** @alias maximumExclusive */exclusiveMaximum?: this["maximumExclusive"];
	/** @alias maximumExclusive */maxExclusive?: this["maximumExclusive"];
	/** @alias minimum */min?: this["minimum"];
	/** @alias minimumExclusive */exclusiveMin?: this["minimumExclusive"];
	/** @alias minimumExclusive */exclusiveMinimum?: this["minimumExclusive"];
	/** @alias minimumExclusive */minExclusive?: this["minimumExclusive"];
}
export {
	type BigIntFilterOptions as BigIntegerFilterOptions
};
/**
 * Filter for big integer.
 */
export class BigIntFilter {
	#status: BigIntFilterStatus = {
		ieee754: "any",
		maximum: undefined,
		maximumExclusive: false,
		minimum: undefined,
		minimumExclusive: false,
		parity: "any",
		primality: "any",
		sign: "any"
	};
	/**
	 * Initialize the big integer filter.
	 * @param {BigIntFilter | BigIntFilterOptions} [options] Options.
	 */
	constructor(options?: BigIntFilter | BigIntFilterOptions) {
		if (options instanceof BigIntFilter) {
			this.#status = { ...options.#status };
		} else if (typeof options !== "undefined") {
			options.maximum ??= options.max;
			options.maximumExclusive ??= options.maxExclusive ?? options.exclusiveMaximum ?? options.exclusiveMax;
			options.minimum ??= options.min;
			options.minimumExclusive ??= options.minExclusive ?? options.exclusiveMinimum ?? options.exclusiveMin;
			for (const option of ["ieee754", "maximum", "maximumExclusive", "minimum", "minimumExclusive", "parity", "primality", "sign", "integralNumericType"]) {
				//@ts-ignore Handle by it's method.
				if (typeof options[option] !== "undefined") {
					//@ts-ignore Handle by it's method.
					this[option](options[option]);
				}
			}
		}
	}
	/**
	 * Clone this big integer filter for reuse.
	 * @returns {BigIntFilter} Another instance of this big integer filter.
	 */
	get clone(): BigIntFilter {
		return new BigIntFilter(this);
	}
	/**
	 * Get the status of this big integer filter.
	 * @returns {BigIntFilterStatus} Status of this big integer filter.
	 */
	get status(): BigIntFilterStatus {
		return { ...this.#status };
	}
	/**
	 * IEEE-754 safe mode of the big integer.
	 * @param {IEEE754EnumKeysType} value
	 * @returns {this}
	 */
	ieee754(value: IEEE754EnumKeysType): this {
		this.#status.ieee754 = enumResolver<IEEE754EnumKeysType, IEEE754EnumValuesType>(IEEE754Enum, value, "Filter status `ieee754`");
		return this;
	}
	/**
	 * Integral numeric type of the big integer.
	 * @param {IntegralNumericTypeEnumKeysType} value
	 * @returns {this}
	 */
	integralNumericType(value: IntegralNumericTypeEnumKeysType): this {
		[this.#status.minimum, this.#status.maximum] = integralNumericTypeRange(value);
		this.#status.maximumExclusive = false;
		this.#status.minimumExclusive = false;
		return this;
	}
	/**
	 * Maximum of the big integer.
	 * @param {bigint | undefined} [value]
	 * @returns {this}
	 */
	maximum(value?: bigint | undefined): this {
		if (typeof value === "bigint") {
			if (typeof this.#status.minimum === "bigint" && !(this.#status.minimum <= value)) {
				throw new RangeError(`Filter status \`maximum\` must be a big integer which is >= ${this.#status.minimum}!`);
			}
		} else if (typeof value !== "undefined") {
			throw new TypeError(`Filter status \`maximum\` must be a big integer or undefined!`);
		}
		this.#status.maximum = value;
		return this;
	}
	/**
	 * Whether to exclusive maximum of the big integer.
	 * @param {boolean} [value=true]
	 * @returns {this}
	 */
	maximumExclusive(value = true): this {
		if (typeof value !== "boolean") {
			throw new TypeError(`Filter status \`maximumExclusive\` must be a boolean!`);
		}
		this.#status.maximumExclusive = value;
		return this;
	}
	/**
	 * Minimum of the big integer.
	 * @param {bigint | undefined} [value]
	 * @returns {this}
	 */
	minimum(value?: bigint | undefined): this {
		if (typeof value === "bigint") {
			if (typeof this.#status.maximum === "bigint" && !(value <= this.#status.maximum)) {
				throw new RangeError(`Filter status \`minimum\` must be a big integer which is <= ${this.#status.maximum}!`);
			}
		} else if (typeof value !== "undefined") {
			throw new TypeError(`Filter status \`minimum\` must be a big integer or undefined!`);
		}
		this.#status.minimum = value;
		return this;
	}
	/**
	 * Whether to exclusive minimum of the big integer.
	 * @param {boolean} [value=true]
	 * @returns {this}
	 */
	minimumExclusive(value = true): this {
		if (typeof value !== "boolean") {
			throw new TypeError(`Filter status \`minimumExclusive\` must be a boolean!`);
		}
		this.#status.minimumExclusive = value;
		return this;
	}
	/**
	 * Parity of the big integer.
	 * @param {MathematicsParityEnumKeysType} value
	 * @returns {this}
	 */
	parity(value: MathematicsParityEnumKeysType): this {
		this.#status.parity = enumResolver<MathematicsParityEnumKeysType, MathematicsParityEnumValuesType>(MathematicsParityEnum, value, "Filter status `parity`");
		return this;
	}
	/**
	 * Primality of the big integer.
	 * @param {MathematicsPrimalityEnumKeysType} value
	 * @returns {this}
	 */
	primality(value: MathematicsPrimalityEnumKeysType): this {
		this.#status.primality = enumResolver<MathematicsPrimalityEnumKeysType, MathematicsPrimalityEnumValuesType>(MathematicsPrimalityEnum, value, "Filter status `primality`");
		return this;
	}
	/**
	 * Sign of the big integer.
	 * @param {MathematicsSignEnumKeysType} value
	 * @returns {this}
	 */
	sign(value: MathematicsSignEnumKeysType): this {
		this.#status.sign = enumResolver<MathematicsSignEnumKeysType, MathematicsSignEnumValuesType>(MathematicsSignEnum, value, "Filter status `sign`");
		return this;
	}
	/** @alias maximum */max = this.maximum;
	/** @alias maximumExclusive */exclusiveMax = this.maximumExclusive;
	/** @alias maximumExclusive */exclusiveMaximum = this.maximumExclusive;
	/** @alias maximumExclusive */maxExclusive = this.maximumExclusive;
	/** @alias minimum */min = this.minimum;
	/** @alias minimumExclusive */exclusiveMin = this.minimumExclusive;
	/** @alias minimumExclusive */exclusiveMinimum = this.minimumExclusive;
	/** @alias minimumExclusive */minExclusive = this.minimumExclusive;
	/**
	 * Set to allow a composite big integer.
	 * @returns {this}
	 */
	composite() {
		return this.primality("composite");
	}
	/**
	 * Set to allow an even big integer.
	 * @returns {this}
	 */
	even() {
		return this.parity("even");
	}
	/**
	 * Set to allow a negative big integer.
	 * @returns {this}
	 */
	negative() {
		return this.sign("negative");
	}
	/**
	 * Set to allow an odd big integer.
	 * @returns {this}
	 */
	odd() {
		return this.parity("odd");
	}
	/**
	 * Set to allow a positive big integer.
	 * @returns {this}
	 */
	positive() {
		return this.sign("positive");
	}
	/**
	 * Set to allow a prime big integer.
	 * @returns {this}
	 */
	prime() {
		return this.primality("prime");
	}
	/**
	 * Set to allow an IEEE-754 safe big integer.
	 * @returns {this}
	 */
	safe() {
		return this.ieee754("safe");
	}
	/**
	 * Set to allow an IEEE-754 unsafe big integer.
	 * @returns {this}
	 */
	unsafe() {
		return this.ieee754("unsafe");
	}
	/**
	 * Determine item with the configured big integer filter.
	 * @param {unknown} item Item that need to determine.
	 * @returns {boolean} Determine result.
	 */
	test(item: unknown): boolean {
		if (
			typeof item !== "bigint" ||
			(this.#status.ieee754 === "safe" && !isBigIntSafe(item)) ||
			(this.#status.ieee754 === "unsafe" && isBigIntSafe(item)) ||
			(typeof this.#status.maximum === "bigint" && this.#status.maximumExclusive && !(item < this.#status.maximum)) ||
			(typeof this.#status.maximum === "bigint" && !this.#status.maximumExclusive && !(item <= this.#status.maximum)) ||
			(typeof this.#status.minimum === "bigint" && this.#status.minimumExclusive && !(this.#status.minimum < item)) ||
			(typeof this.#status.minimum === "bigint" && !this.#status.minimumExclusive && !(this.#status.minimum <= item)) ||
			(this.#status.parity === "even" && !isBigIntEven(item)) ||
			(this.#status.parity === "odd" && !isBigIntOdd(item)) ||
			(this.#status.primality === "composite" && isBigIntPrime(item)) ||
			(this.#status.primality === "prime" && !isBigIntPrime(item)) ||
			(this.#status.sign === "negative" && !isBigIntNegative(item)) ||
			(this.#status.sign === "positive" && !isBigIntPositive(item))
		) {
			return false;
		}
		return true;
	}
	/**
	 * Determine item with the big integer filter.
	 * @param {unknown} item Item that need to determine.
	 * @param {BigIntFilterOptions} [options={}] Options.
	 * @returns {boolean} Determine result.
	 */
	static test(item: unknown, options: BigIntFilterOptions = {}): boolean {
		return new this(options).test(item);
	}
}
export {
	BigIntFilter as BigIntegerFilter
};
/**
 * Determine item with the big integer filter.
 * @param {unknown} item Item that need to determine.
 * @param {BigIntFilterOptions} [options={}] Options.
 * @returns {boolean} Determine result.
 */
export function filterBigInt(item: unknown, options: BigIntFilterOptions = {}): boolean {
	return new BigIntFilter(options).test(item);
}
export {
	filterBigInt as filterBigInteger
};
