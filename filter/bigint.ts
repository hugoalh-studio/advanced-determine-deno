import { isBigIntEven, isBigIntNegative, isBigIntOdd, isBigIntPositive, isBigIntPrime, isBigIntSafe } from "../bigint.ts";
import { enumResolver, IEEE754Enum, IntegralNumericTypeEnum, MathematicsParityEnum, MathematicsPrimalityEnum, MathematicsSignEnum, type IEEE754EnumStringify, type IntegralNumericTypeEnumStringify, type MathematicsParityEnumStringify, type MathematicsPrimalityEnumStringify, type MathematicsSignEnumStringify } from "../internal/enum.ts";
import { integralNumericTypeRange } from "../internal/numeric.ts";
export interface BigIntFilterStatus {
	/**
	 * IEEE-754 safe mode of the big integer.
	 * @default "any"
	 */
	ieee754: IEEE754Enum;
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
	parity: MathematicsParityEnum;
	/**
	 * Primality of the big integer.
	 * @default "any"
	 */
	primality: MathematicsPrimalityEnum;
	/**
	 * Sign of the big integer.
	 * @default "any"
	 */
	sign: MathematicsSignEnum;
}
export {
	type BigIntFilterStatus as BigIntegerFilterStatus
};
export interface BigIntFilterOptions extends Partial<Omit<BigIntFilterStatus, "ieee754" | "parity" | "primality" | "sign">> {
	/**
	 * IEEE-754 mode of the big integer.
	 * @default "any"
	 */
	ieee754?: IEEE754Enum | IEEE754EnumStringify;
	/**
	 * Integral numeric type of the big integer.
	 * @default undefined
	 */
	integralNumericType?: IntegralNumericTypeEnum | IntegralNumericTypeEnumStringify;
	/**
	 * Parity of the big integer.
	 * @default "any"
	 */
	parity?: MathematicsParityEnum | MathematicsParityEnumStringify;
	/**
	 * Primality of the big integer.
	 * @default "any"
	 */
	primality?: MathematicsPrimalityEnum | MathematicsPrimalityEnumStringify;
	/**
	 * Sign of the big integer.
	 * @default "any"
	 */
	sign?: MathematicsSignEnum | MathematicsSignEnumStringify;
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
		ieee754: IEEE754Enum.Any,
		maximum: undefined,
		maximumExclusive: false,
		minimum: undefined,
		minimumExclusive: false,
		parity: MathematicsParityEnum.Any,
		primality: MathematicsPrimalityEnum.Any,
		sign: MathematicsSignEnum.Any
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
	 * @param {IEEE754Enum | IEEE754EnumStringify} value
	 * @returns {this}
	 */
	ieee754(value: IEEE754Enum | IEEE754EnumStringify): this {
		this.#status.ieee754 = enumResolver<IEEE754Enum, IEEE754EnumStringify>(IEEE754Enum, value, "Filter status `ieee754`");
		return this;
	}
	/**
	 * Integral numeric type of the big integer.
	 * @param {IntegralNumericTypeEnum | IntegralNumericTypeEnumStringify} value
	 * @returns {this}
	 */
	integralNumericType(value: IntegralNumericTypeEnum | IntegralNumericTypeEnumStringify): this {
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
				throw new RangeError(`Filter status \`maximum\` is not a bigint which is >= ${this.#status.minimum}!`);
			}
		} else if (typeof value !== "undefined") {
			throw new TypeError(`Filter status \`maximum\` is not a bigint or undefined!`);
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
			throw new TypeError(`Filter status \`maximumExclusive\` is not a boolean!`);
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
				throw new RangeError(`Filter status \`minimum\` is not a bigint which is <= ${this.#status.maximum}!`);
			}
		} else if (typeof value !== "undefined") {
			throw new TypeError(`Filter status \`minimum\` is not a bigint or undefined!`);
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
			throw new TypeError(`Filter status \`minimumExclusive\` is not a boolean!`);
		}
		this.#status.minimumExclusive = value;
		return this;
	}
	/**
	 * Parity of the big integer.
	 * @param {MathematicsParityEnum | MathematicsParityEnumStringify} value
	 * @returns {this}
	 */
	parity(value: MathematicsParityEnum | MathematicsParityEnumStringify): this {
		this.#status.parity = enumResolver<MathematicsParityEnum, MathematicsParityEnumStringify>(MathematicsParityEnum, value, "Filter status `parity`");
		return this;
	}
	/**
	 * Primality of the big integer.
	 * @param {MathematicsPrimalityEnum | MathematicsPrimalityEnumStringify} value
	 * @returns {this}
	 */
	primality(value: MathematicsPrimalityEnum | MathematicsPrimalityEnumStringify): this {
		this.#status.primality = enumResolver<MathematicsPrimalityEnum, MathematicsPrimalityEnumStringify>(MathematicsPrimalityEnum, value, "Filter status `primality`");
		return this;
	}
	/**
	 * Sign of the big integer.
	 * @param {MathematicsSignEnum | MathematicsSignEnumStringify} value
	 * @returns {this}
	 */
	sign(value: MathematicsSignEnum | MathematicsSignEnumStringify): this {
		this.#status.sign = enumResolver<MathematicsSignEnum, MathematicsSignEnumStringify>(MathematicsSignEnum, value, "Filter status `sign`");
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
			(this.#status.ieee754 === IEEE754Enum.Safe && !isBigIntSafe(item)) ||
			(this.#status.ieee754 === IEEE754Enum.Unsafe && isBigIntSafe(item)) ||
			(typeof this.#status.maximum === "bigint" && this.#status.maximumExclusive && !(item < this.#status.maximum)) ||
			(typeof this.#status.maximum === "bigint" && !this.#status.maximumExclusive && !(item <= this.#status.maximum)) ||
			(typeof this.#status.minimum === "bigint" && this.#status.minimumExclusive && !(this.#status.minimum < item)) ||
			(typeof this.#status.minimum === "bigint" && !this.#status.minimumExclusive && !(this.#status.minimum <= item)) ||
			(this.#status.parity === MathematicsParityEnum.Even && !isBigIntEven(item)) ||
			(this.#status.parity === MathematicsParityEnum.Odd && !isBigIntOdd(item)) ||
			(this.#status.primality === MathematicsPrimalityEnum.Composite && isBigIntPrime(item)) ||
			(this.#status.primality === MathematicsPrimalityEnum.Prime && !isBigIntPrime(item)) ||
			(this.#status.sign === MathematicsSignEnum.Negative && !isBigIntNegative(item)) ||
			(this.#status.sign === MathematicsSignEnum.Positive && !isBigIntPositive(item))
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
