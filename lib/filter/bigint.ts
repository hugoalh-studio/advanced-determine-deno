import { isBigIntEven, isBigIntNegative, isBigIntOdd, isBigIntPositive, isBigIntPrime, isBigIntSafe } from "../bigint.ts";
import { enumResolver, IEEE754Enum, MathematicsParityEnum, MathematicsPrimalityEnum, MathematicsSignEnum, type IEEE754EnumKeysType, type IEEE754EnumValuesType, type IntegralNumericTypeEnumKeysType, type MathematicsParityEnumKeysType, type MathematicsParityEnumValuesType, type MathematicsPrimalityEnumKeysType, type MathematicsPrimalityEnumValuesType, type MathematicsSignEnumKeysType, type MathematicsSignEnumValuesType } from "../internal/enum.ts";
import { integralNumericTypeRange } from "../internal/numeric.ts";
interface BigIntFilterStatus {
	/**
	 * @property ieee754
	 * @description IEEE-754 safe mode of the big integer.
	 * @default "any"
	 */
	ieee754: IEEE754EnumValuesType;
	/**
	 * @property maximum
	 * @description Maximum of the big integer.
	 * @default undefined
	 */
	maximum?: bigint;
	/**
	 * @property maximumExclusive
	 * @description Whether to exclusive maximum of the big integer.
	 * @default false
	 */
	maximumExclusive: boolean;
	/**
	 * @property minimum
	 * @description Minimum of the big integer.
	 * @default undefined
	 */
	minimum?: bigint;
	/**
	 * @property minimumExclusive
	 * @description Whether to exclusive minimum of the big integer.
	 * @default false
	 */
	minimumExclusive: boolean;
	/**
	 * @property parity
	 * @description Parity of the big integer.
	 * @default "any"
	 */
	parity: MathematicsParityEnumValuesType;
	/**
	 * @property primality
	 * @description Primality of the big integer.
	 * @default "any"
	 */
	primality: MathematicsPrimalityEnumValuesType;
	/**
	 * @property sign
	 * @description Sign of the big integer.
	 * @default "any"
	 */
	sign: MathematicsSignEnumValuesType;
}
interface BigIntFilterOptions extends Partial<Omit<BigIntFilterStatus, "ieee754" | "parity" | "primality" | "sign">> {
	/**
	 * @property ieee754
	 * @description IEEE-754 mode of the big integer.
	 * @default "any"
	 */
	ieee754?: IEEE754EnumKeysType;
	/**
	 * @property integralNumericType
	 * @description Integral numeric type of the big integer.
	 * @default undefined
	 */
	integralNumericType?: IntegralNumericTypeEnumKeysType;
	/**
	 * @property parity
	 * @description Parity of the big integer.
	 * @default "any"
	 */
	parity?: MathematicsParityEnumKeysType;
	/**
	 * @property primality
	 * @description Primality of the big integer.
	 * @default "any"
	 */
	primality?: MathematicsPrimalityEnumKeysType;
	/**
	 * @property sign
	 * @description Sign of the big integer.
	 * @default "any"
	 */
	sign?: MathematicsSignEnumKeysType;
	/** @alias maximum */max?: bigint;
	/** @alias maximumExclusive */exclusiveMax?: boolean;
	/** @alias maximumExclusive */exclusiveMaximum?: boolean;
	/** @alias maximumExclusive */maxExclusive?: boolean;
	/** @alias minimum */min?: bigint;
	/** @alias minimumExclusive */exclusiveMin?: boolean;
	/** @alias minimumExclusive */exclusiveMinimum?: boolean;
	/** @alias minimumExclusive */minExclusive?: boolean;
}
/**
 * @class BigIntFilter
 * @description Filter for big integer.
 */
class BigIntFilter {
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
	 * @constructor
	 * @description Initialize the big integer filter.
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
			for (let option of ["ieee754", "maximum", "maximumExclusive", "minimum", "minimumExclusive", "parity", "primality", "sign", "integralNumericType"]) {
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
	 * @description Clone this big integer filter for reuse.
	 * @returns {BigIntFilter} Another instance of this big integer filter.
	 */
	get clone(): BigIntFilter {
		return new BigIntFilter(this);
	}
	/**
	 * @method status
	 * @description Get the status of this big integer filter.
	 * @returns {BigIntFilterStatus} Status of this big integer filter.
	 */
	get status(): BigIntFilterStatus {
		return { ...this.#status };
	}
	/**
	 * @method ieee754
	 * @description IEEE-754 safe mode of the big integer.
	 * @param {IEEE754EnumKeysType} value
	 * @returns {this}
	 */
	ieee754(value: IEEE754EnumKeysType): this {
		this.#status.ieee754 = enumResolver<IEEE754EnumKeysType, IEEE754EnumValuesType>(IEEE754Enum, value, "ieee754");
		return this;
	}
	/**
	 * @method integralNumericType
	 * @description Integral numeric type of the big integer.
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
	 * @method maximum
	 * @description Maximum of the big integer.
	 * @param {bigint | undefined} [value]
	 * @returns {this}
	 */
	maximum(value?: bigint | undefined): this {
		if (typeof value === "bigint") {
			if (typeof this.#status.minimum === "bigint" && !(this.#status.minimum <= value)) {
				throw new RangeError(`Filter argument \`maximum\` must be a big integer which is >= ${this.#status.minimum}!`);
			}
		} else if (typeof value !== "undefined") {
			throw new TypeError(`Filter argument \`maximum\` must be type of big integer or undefined!`);
		}
		this.#status.maximum = value;
		return this;
	}
	/**
	 * @method maximumExclusive
	 * @description Whether to exclusive maximum of the big integer.
	 * @param {boolean} [value=true]
	 * @returns {this}
	 */
	maximumExclusive(value = true): this {
		if (typeof value !== "boolean") {
			throw new TypeError(`Filter argument \`maximumExclusive\` must be type of boolean!`);
		}
		this.#status.maximumExclusive = value;
		return this;
	}
	/**
	 * @method minimum
	 * @description Minimum of the big integer.
	 * @param {bigint | undefined} [value]
	 * @returns {this}
	 */
	minimum(value?: bigint | undefined): this {
		if (typeof value === "bigint") {
			if (typeof this.#status.maximum === "bigint" && !(value <= this.#status.maximum)) {
				throw new RangeError(`Filter argument \`minimum\` must be a big integer which is <= ${this.#status.maximum}!`);
			}
		} else if (typeof value !== "undefined") {
			throw new TypeError(`Filter argument \`minimum\` must be type of big integer or undefined!`);
		}
		this.#status.minimum = value;
		return this;
	}
	/**
	 * @method minimumExclusive
	 * @description Whether to exclusive minimum of the big integer.
	 * @param {boolean} [value=true]
	 * @returns {this}
	 */
	minimumExclusive(value = true): this {
		if (typeof value !== "boolean") {
			throw new TypeError(`Filter argument \`minimumExclusive\` must be type of boolean!`);
		}
		this.#status.minimumExclusive = value;
		return this;
	}
	/**
	 * @method parity
	 * @description Parity of the big integer.
	 * @param {MathematicsParityEnumKeysType} value
	 * @returns {this}
	 */
	parity(value: MathematicsParityEnumKeysType): this {
		this.#status.parity = enumResolver<MathematicsParityEnumKeysType, MathematicsParityEnumValuesType>(MathematicsParityEnum, value, "parity");
		return this;
	}
	/**
	 * @method primality
	 * @description Primality of the big integer.
	 * @param {MathematicsPrimalityEnumKeysType} value
	 * @returns {this}
	 */
	primality(value: MathematicsPrimalityEnumKeysType): this {
		this.#status.primality = enumResolver<MathematicsPrimalityEnumKeysType, MathematicsPrimalityEnumValuesType>(MathematicsPrimalityEnum, value, "primality");
		return this;
	}
	/**
	 * @method sign
	 * @description Sign of the big integer.
	 * @param {MathematicsSignEnumKeysType} value
	 * @returns {this}
	 */
	sign(value: MathematicsSignEnumKeysType): this {
		this.#status.sign = enumResolver<MathematicsSignEnumKeysType, MathematicsSignEnumValuesType>(MathematicsSignEnum, value, "sign");
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
	 * @method composite
	 * @description Set to allow a composite big integer.
	 * @returns {this}
	 */
	composite() {
		return this.primality("composite");
	}
	/**
	 * @method even
	 * @description Set to allow an even big integer.
	 * @returns {this}
	 */
	even() {
		return this.parity("even");
	}
	/**
	 * @method negative
	 * @description Set to allow a negative big integer.
	 * @returns {this}
	 */
	negative() {
		return this.sign("negative");
	}
	/**
	 * @method odd
	 * @description Set to allow an odd big integer.
	 * @returns {this}
	 */
	odd() {
		return this.parity("odd");
	}
	/**
	 * @method positive
	 * @description Set to allow a positive big integer.
	 * @returns {this}
	 */
	positive() {
		return this.sign("positive");
	}
	/**
	 * @method prime
	 * @description Set to allow a prime big integer.
	 * @returns {this}
	 */
	prime() {
		return this.primality("prime");
	}
	/**
	 * @method safe
	 * @description Set to allow an IEEE-754 safe big integer.
	 * @returns {this}
	 */
	safe() {
		return this.ieee754("safe");
	}
	/**
	 * @method unsafe
	 * @description Set to allow an IEEE-754 unsafe big integer.
	 * @returns {this}
	 */
	unsafe() {
		return this.ieee754("unsafe");
	}
	/**
	 * @method test
	 * @description Determine item with the configured big integer filter.
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
	 * @static test
	 * @description Determine item with the big integer filter.
	 * @param {unknown} item Item that need to determine.
	 * @param {BigIntFilterOptions} [options={}] Options.
	 * @returns {boolean} Determine result.
	 */
	static test(item: unknown, options: BigIntFilterOptions = {}): boolean {
		return new this(options).test(item);
	}
}
/**
 * @function filterBigInt
 * @description Determine item with the big integer filter.
 * @param {unknown} item Item that need to determine.
 * @param {BigIntFilterOptions} [options={}] Options.
 * @returns {boolean} Determine result.
 */
function filterBigInt(item: unknown, options: BigIntFilterOptions = {}): boolean {
	return new BigIntFilter(options).test(item);
}
export {
	BigIntFilter,
	BigIntFilter as BigIntegerFilter,
	filterBigInt,
	filterBigInt as filterBigInteger,
	type BigIntFilterOptions,
	type BigIntFilterOptions as BigIntegerFilterOptions,
	type BigIntFilterStatus,
	type BigIntFilterStatus as BigIntegerFilterStatus
};
