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
	#ieee754: IEEE754EnumValuesType = "any";
	#maximum?: bigint;
	#maximumExclusive = false;
	#minimum?: bigint;
	#minimumExclusive = false;
	#parity: MathematicsParityEnumValuesType = "any";
	#primality: MathematicsPrimalityEnumValuesType = "any";
	#sign: MathematicsSignEnumValuesType = "any";
	/**
	 * @constructor
	 * @description Initialize the big integer filter.
	 * @param {BigIntFilter | BigIntFilterOptions} [options] Options.
	 */
	constructor(options?: BigIntFilter | BigIntFilterOptions) {
		if (options instanceof BigIntFilter) {
			this.#ieee754 = options.#ieee754;
			this.#maximum = options.#maximum;
			this.#maximumExclusive = options.#maximumExclusive;
			this.#minimum = options.#minimum;
			this.#minimumExclusive = options.#minimumExclusive;
			this.#parity = options.#parity;
			this.#primality = options.#primality;
			this.#sign = options.#sign;
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
		return {
			ieee754: this.#ieee754,
			maximum: this.#maximum,
			maximumExclusive: this.#maximumExclusive,
			minimum: this.#minimum,
			minimumExclusive: this.#minimumExclusive,
			parity: this.#parity,
			primality: this.#primality,
			sign: this.#sign
		};
	}
	/**
	 * @method ieee754
	 * @description IEEE-754 safe mode of the big integer.
	 * @param {IEEE754EnumKeysType} value
	 * @returns {this}
	 */
	ieee754(value: IEEE754EnumKeysType): this {
		if (typeof value !== "string") {
			throw new TypeError(`Filter argument \`ieee754\` must be type of string!`);
		}
		let valueResolve: IEEE754EnumValuesType | undefined = enumResolver<IEEE754EnumKeysType, IEEE754EnumValuesType>(IEEE754Enum, value);
		if (typeof valueResolve !== "string") {
			throw new RangeError(`Filter argument \`ieee754\` must be either of these values: "${Object.keys(IEEE754Enum).sort().join("\", \"")}"`);
		}
		this.#ieee754 = valueResolve;
		return this;
	}
	/**
	 * @method integralNumericType
	 * @description Integral numeric type of the big integer.
	 * @param {IntegralNumericTypeEnumKeysType} value
	 * @returns {this}
	 */
	integralNumericType(value: IntegralNumericTypeEnumKeysType): this {
		[this.#minimum, this.#maximum] = integralNumericTypeRange(value);
		this.#maximumExclusive = false;
		this.#minimumExclusive = false;
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
			if (typeof this.#minimum === "bigint" && !(this.#minimum <= value)) {
				throw new RangeError(`Filter argument \`maximum\` must be a big integer which is >= ${this.#minimum}!`);
			}
		} else if (typeof value !== "undefined") {
			throw new TypeError(`Filter argument \`maximum\` must be type of big integer or undefined!`);
		}
		this.#maximum = value;
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
		this.#maximumExclusive = value;
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
			if (typeof this.#maximum === "bigint" && !(value <= this.#maximum)) {
				throw new RangeError(`Filter argument \`minimum\` must be a big integer which is <= ${this.#maximum}!`);
			}
		} else if (typeof value !== "undefined") {
			throw new TypeError(`Filter argument \`minimum\` must be type of big integer or undefined!`);
		}
		this.#minimum = value;
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
		this.#minimumExclusive = value;
		return this;
	}
	/**
	 * @method parity
	 * @description Parity of the big integer.
	 * @param {MathematicsParityEnumKeysType} value
	 * @returns {this}
	 */
	parity(value: MathematicsParityEnumKeysType): this {
		if (typeof value !== "string") {
			throw new TypeError(`Filter argument \`parity\` must be type of string!`);
		}
		let valueResolve: MathematicsParityEnumValuesType | undefined = enumResolver<MathematicsParityEnumKeysType, MathematicsParityEnumValuesType>(MathematicsParityEnum, value);
		if (typeof valueResolve !== "string") {
			throw new RangeError(`Filter argument \`parity\` must be either of these values: "${Object.keys(MathematicsParityEnum).sort().join("\", \"")}"`);
		}
		this.#parity = valueResolve;
		return this;
	}
	/**
	 * @method primality
	 * @description Primality of the big integer.
	 * @param {MathematicsPrimalityEnumKeysType} value
	 * @returns {this}
	 */
	primality(value: MathematicsPrimalityEnumKeysType): this {
		if (typeof value !== "string") {
			throw new TypeError(`Filter argument \`primality\` must be type of string!`);
		}
		let valueResolve: MathematicsPrimalityEnumValuesType | undefined = enumResolver<MathematicsPrimalityEnumKeysType, MathematicsPrimalityEnumValuesType>(MathematicsPrimalityEnum, value);
		if (typeof valueResolve !== "string") {
			throw new RangeError(`Filter argument \`primality\` must be either of these values: "${Object.keys(MathematicsPrimalityEnum).sort().join("\", \"")}"`);
		}
		this.#primality = valueResolve;
		return this;
	}
	/**
	 * @method sign
	 * @description Sign of the big integer.
	 * @param {MathematicsSignEnumKeysType} value
	 * @returns {this}
	 */
	sign(value: MathematicsSignEnumKeysType): this {
		if (typeof value !== "string") {
			throw new TypeError(`Filter argument \`sign\` must be type of string!`);
		}
		let valueResolve: MathematicsSignEnumValuesType | undefined = enumResolver<MathematicsSignEnumKeysType, MathematicsSignEnumValuesType>(MathematicsSignEnum, value);
		if (typeof valueResolve !== "string") {
			throw new RangeError(`Filter argument \`sign\` must be either of these values: "${Object.keys(MathematicsSignEnum).sort().join("\", \"")}"`);
		}
		this.#sign = valueResolve;
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
			(this.#ieee754 === "safe" && !isBigIntSafe(item)) ||
			(this.#ieee754 === "unsafe" && isBigIntSafe(item)) ||
			(typeof this.#maximum === "bigint" && this.#maximumExclusive && !(item < this.#maximum)) ||
			(typeof this.#maximum === "bigint" && !this.#maximumExclusive && !(item <= this.#maximum)) ||
			(typeof this.#minimum === "bigint" && this.#minimumExclusive && !(this.#minimum < item)) ||
			(typeof this.#minimum === "bigint" && !this.#minimumExclusive && !(this.#minimum <= item)) ||
			(this.#parity === "even" && !isBigIntEven(item)) ||
			(this.#parity === "odd" && !isBigIntOdd(item)) ||
			(this.#primality === "composite" && isBigIntPrime(item)) ||
			(this.#primality === "prime" && !isBigIntPrime(item)) ||
			(this.#sign === "negative" && !isBigIntNegative(item)) ||
			(this.#sign === "positive" && !isBigIntPositive(item))
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
