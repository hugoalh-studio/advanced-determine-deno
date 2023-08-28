import { enumResolver, IEEE754Enum, MathematicsFinitenessEnum, MathematicsParityEnum, MathematicsPrimalityEnum, MathematicsSignEnum, NumericTypeEnum, type IEEE754EnumKeysType, type IEEE754EnumValuesType, type IntegralNumericTypeEnumKeysType, type MathematicsFinitenessEnumKeysType, type MathematicsFinitenessEnumValuesType, type MathematicsParityEnumKeysType, type MathematicsParityEnumValuesType, type MathematicsPrimalityEnumKeysType, type MathematicsPrimalityEnumValuesType, type MathematicsSignEnumKeysType, type MathematicsSignEnumValuesType, type NumericTypeEnumKeysType, type NumericTypeEnumValuesType } from "../internal/enum.ts";
import { integralNumericTypeRange } from "../internal/numeric.ts";
import { isNumberEven, isNumberFloat, isNumberNegative, isNumberOdd, isNumberPositive, isNumberPrime, isNumberSafe } from "../number.ts";
export interface NumberFilterStatus {
	/**
	 * Finiteness of the number.
	 * @default "any"
	 */
	finiteness: MathematicsFinitenessEnumValuesType;
	/**
	 * IEEE-754 safe mode of the number.
	 * @default "any"
	 */
	ieee754: IEEE754EnumValuesType;
	/**
	 * Maximum of the number.
	 * @default undefined
	 */
	maximum?: number;
	/**
	 * Whether to exclusive maximum of the number.
	 * @default false
	 */
	maximumExclusive: boolean;
	/**
	 * Minimum of the number.
	 * @default undefined
	 */
	minimum?: number;
	/**
	 * Whether to exclusive minimum of the number.
	 * @default false
	 */
	minimumExclusive: boolean;
	/**
	 * Numeric type of the number.
	 * @default "any"
	 */
	numericType: NumericTypeEnumValuesType;
	/**
	 * Parity of the number.
	 * @default "any"
	 */
	parity: MathematicsParityEnumValuesType;
	/**
	 * Primality of the number.
	 * @default "any"
	 */
	primality: MathematicsPrimalityEnumValuesType;
	/**
	 * Sign of the number.
	 * @default "any"
	 */
	sign: MathematicsSignEnumValuesType;
}
export interface NumberFilterOptions extends Partial<Omit<NumberFilterStatus, "finiteness" | "ieee754" | "numericType" | "parity" | "primality" | "sign">> {
	/**
	 * Finiteness of the number.
	 * @default "any"
	 */
	finiteness?: MathematicsFinitenessEnumKeysType;
	/**
	 * IEEE-754 mode of the number.
	 * @default "any"
	 */
	ieee754?: IEEE754EnumKeysType;
	/**
	 * Integral numeric type of the number.
	 * @default undefined
	 */
	integralNumericType?: IntegralNumericTypeEnumKeysType;
	/**
	 * Numeric type of the number.
	 * @default "any"
	 */
	numericType?: NumericTypeEnumKeysType;
	/**
	 * Parity of the number.
	 * @default "any"
	 */
	parity?: MathematicsParityEnumKeysType;
	/**
	 * Primality of the number.
	 * @default "any"
	 */
	primality?: MathematicsPrimalityEnumKeysType;
	/**
	 * Sign of the number.
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
/**
 * Filter for number.
 */
export class NumberFilter {
	#status: NumberFilterStatus = {
		finiteness: "any",
		ieee754: "any",
		maximum: undefined,
		maximumExclusive: false,
		minimum: undefined,
		minimumExclusive: false,
		numericType: "any",
		parity: "any",
		primality: "any",
		sign: "any"
	};
	/**
	 * Initialize the number filter.
	 * @param {NumberFilter | NumberFilterOptions} [options] Options.
	 */
	constructor(options?: NumberFilter | NumberFilterOptions) {
		if (options instanceof NumberFilter) {
			this.#status = { ...options.#status };
		} else if (typeof options !== "undefined") {
			options.maximum ??= options.max;
			options.maximumExclusive ??= options.maxExclusive ?? options.exclusiveMaximum ?? options.exclusiveMax;
			options.minimum ??= options.min;
			options.minimumExclusive ??= options.minExclusive ?? options.exclusiveMinimum ?? options.exclusiveMin;
			for (const option of ["finiteness", "ieee754", "maximum", "maximumExclusive", "minimum", "minimumExclusive", "numericType", "parity", "primality", "sign", "integralNumericType"]) {
				//@ts-ignore Handle by it's method.
				if (typeof options[option] !== "undefined") {
					//@ts-ignore Handle by it's method.
					this[option](options[option]);
				}
			}
		}
	}
	/**
	 * Clone this number filter for reuse.
	 * @returns {NumberFilter} Another instance of this number filter.
	 */
	get clone(): NumberFilter {
		return new NumberFilter(this);
	}
	/**
	 * Get the status of this number filter.
	 * @returns {NumberFilterStatus} Status of this number filter.
	 */
	get status(): NumberFilterStatus {
		return { ...this.#status };
	}
	/**
	 * Finiteness of the number.
	 * @param {MathematicsFinitenessEnumKeysType} value
	 * @returns {this}
	 */
	finiteness(value: MathematicsFinitenessEnumKeysType): this {
		this.#status.finiteness = enumResolver<MathematicsFinitenessEnumKeysType, MathematicsFinitenessEnumValuesType>(MathematicsFinitenessEnum, value, "Filter status `finiteness`");
		return this;
	}
	/**
	 * IEEE-754 safe mode of the number.
	 * @param {IEEE754EnumKeysType} value
	 * @returns {this}
	 */
	ieee754(value: IEEE754EnumKeysType): this {
		this.#status.ieee754 = enumResolver<IEEE754EnumKeysType, IEEE754EnumValuesType>(IEEE754Enum, value, "Filter status `ieee754`");
		return this;
	}
	/**
	 * Integral numeric type of the number.
	 * @param {IntegralNumericTypeEnumKeysType} value
	 * @returns {this}
	 */
	integralNumericType(value: IntegralNumericTypeEnumKeysType): this {
		const [intrMinimum, intrMaximum] = integralNumericTypeRange(value);
		this.#status.maximum = Number(intrMaximum);
		this.#status.minimum = Number(intrMinimum);
		this.#status.maximumExclusive = false;
		this.#status.minimumExclusive = false;
		return this;
	}
	/**
	 * Maximum of the number.
	 * @param {number | undefined} [value]
	 * @returns {this}
	 */
	maximum(value?: number | undefined): this {
		if (typeof value === "number" && !Number.isNaN(value)) {
			if (typeof this.#status.minimum === "number" && !(this.#status.minimum <= value)) {
				throw new RangeError(`Filter status \`maximum\` is not a number which is >= ${this.#status.minimum}!`);
			}
		} else if (typeof value !== "undefined") {
			throw new TypeError(`Filter status \`maximum\` is not a number or undefined!`);
		}
		this.#status.maximum = value;
		return this;
	}
	/**
	 * Whether to exclusive maximum of the number.
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
	 * Minimum of the number.
	 * @param {number | undefined} [value]
	 * @returns {this}
	 */
	minimum(value?: number | undefined): this {
		if (typeof value === "number" && !Number.isNaN(value)) {
			if (typeof this.#status.maximum === "number" && !(value <= this.#status.maximum)) {
				throw new RangeError(`Filter status \`minimum\` is not a number which is <= ${this.#status.maximum}!`);
			}
		} else if (typeof value !== "undefined") {
			throw new TypeError(`Filter status \`minimum\` is not a number or undefined!`);
		}
		this.#status.minimum = value;
		return this;
	}
	/**
	 * Whether to exclusive minimum of the number.
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
	 * Numeric type of the number.
	 * @param {NumericTypeEnumKeysType} value
	 * @returns {this}
	 */
	numericType(value: NumericTypeEnumKeysType): this {
		this.#status.numericType = enumResolver<NumericTypeEnumKeysType, NumericTypeEnumValuesType>(NumericTypeEnum, value, "Filter status `numericType`");
		return this;
	}
	/**
	 * Parity of the number.
	 * @param {MathematicsParityEnumKeysType} value
	 * @returns {this}
	 */
	parity(value: MathematicsParityEnumKeysType): this {
		this.#status.parity = enumResolver<MathematicsParityEnumKeysType, MathematicsParityEnumValuesType>(MathematicsParityEnum, value, "Filter status `parity`");
		return this;
	}
	/**
	 * Primality of the number.
	 * @param {MathematicsPrimalityEnumKeysType} value
	 * @returns {this}
	 */
	primality(value: MathematicsPrimalityEnumKeysType): this {
		this.#status.primality = enumResolver<MathematicsPrimalityEnumKeysType, MathematicsPrimalityEnumValuesType>(MathematicsPrimalityEnum, value, "Filter status `primality`");
		return this;
	}
	/**
	 * Sign of the number.
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
	 * Set to allow a composite number.
	 * @returns {this}
	 */
	composite() {
		return this.primality("composite");
	}
	/**
	 * Set to allow an even number.
	 * @returns {this}
	 */
	even() {
		return this.parity("even");
	}
	/**
	 * Set to allow a finite number.
	 * @returns {this}
	 */
	finite() {
		return this.finiteness("finite");
	}
	/**
	 * Set to allow a float number.
	 * @returns {this}
	 */
	float() {
		return this.numericType("float");
	}
	/**
	 * Set to allow an infinite number.
	 * @returns {this}
	 */
	infinite() {
		return this.finiteness("infinite");
	}
	/**
	 * Set to allow an integer number.
	 * @returns {this}
	 */
	integer() {
		return this.numericType("float");
	}
	/**
	 * Set to allow a negative number.
	 * @returns {this}
	 */
	negative() {
		return this.sign("negative");
	}
	/**
	 * Set to allow an odd number.
	 * @returns {this}
	 */
	odd() {
		return this.parity("odd");
	}
	/**
	 * Set to allow a positive number.
	 * @returns {this}
	 */
	positive() {
		return this.sign("positive");
	}
	/**
	 * Set to allow a prime number.
	 * @returns {this}
	 */
	prime() {
		return this.primality("prime");
	}
	/**
	 * Set to allow an IEEE-754 safe number.
	 * @returns {this}
	 */
	safe() {
		return this.ieee754("safe");
	}
	/**
	 * Set to allow an IEEE-754 unsafe number.
	 * @returns {this}
	 */
	unsafe() {
		return this.ieee754("unsafe");
	}
	/**
	 * Determine item with the configured number filter.
	 * @param {unknown} item Item that need to determine.
	 * @returns {boolean} Determine result.
	 */
	test(item: unknown): boolean {
		if (
			typeof item !== "number" ||
			Number.isNaN(item) ||
			(this.#status.finiteness === "finite" && !Number.isFinite(item)) ||
			(this.#status.finiteness === "infinite" && Number.isFinite(item)) ||
			(this.#status.ieee754 === "safe" && !isNumberSafe(item)) ||
			(this.#status.ieee754 === "unsafe" && isNumberSafe(item)) ||
			(typeof this.#status.maximum === "number" && this.#status.maximumExclusive && !(item < this.#status.maximum)) ||
			(typeof this.#status.maximum === "number" && !this.#status.maximumExclusive && !(item <= this.#status.maximum)) ||
			(typeof this.#status.minimum === "number" && this.#status.minimumExclusive && !(this.#status.minimum < item)) ||
			(typeof this.#status.minimum === "number" && !this.#status.minimumExclusive && !(this.#status.minimum <= item)) ||
			(this.#status.numericType === "float" && !isNumberFloat(item)) ||
			(this.#status.numericType === "integer" && !Number.isInteger(item)) ||
			(this.#status.parity === "even" && !isNumberEven(item)) ||
			(this.#status.parity === "odd" && !isNumberOdd(item)) ||
			(this.#status.primality === "composite" && isNumberPrime(item)) ||
			(this.#status.primality === "prime" && !isNumberPrime(item)) ||
			(this.#status.sign === "negative" && !isNumberNegative(item)) ||
			(this.#status.sign === "positive" && !isNumberPositive(item))
		) {
			return false;
		}
		return true;
	}
	/**
	 * Determine item with the number filter.
	 * @param {unknown} item Item that need to determine.
	 * @param {NumberFilterOptions} [options={}] Options.
	 * @returns {boolean} Determine result.
	 */
	static test(item: unknown, options: NumberFilterOptions = {}): boolean {
		return new this(options).test(item);
	}
}
/**
 * Determine item with the number filter.
 * @param {unknown} item Item that need to determine.
 * @param {NumberFilterOptions} [options={}] Options
 * @returns {boolean} Determine result.
 */
export function filterNumber(item: unknown, options: NumberFilterOptions = {}): boolean {
	return new NumberFilter(options).test(item);
}
