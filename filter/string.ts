import { enumResolver, StringCaseEnum, StringLineEnum, ThreePhaseConditionEnum, type StringCaseEnumStringify, type StringLineEnumStringify, type ThreePhaseConditionEnumStringify } from "../internal/enum.ts";
import { isStringASCII, isStringLowerCase, isStringMultipleLine, isStringSingleLine, isStringUpperCase } from "../string.ts";
export interface StringFilterStatus {
	/**
	 * Whether an ASCII string.
	 * @default "neutral"
	 */
	ascii: ThreePhaseConditionEnum;
	/**
	 * Case of the string.
	 * @default "any"
	 */
	case: StringCaseEnum;
	/**
	 * Maximum length of the string.
	 * @default Infinity
	 */
	lengthMaximum: number;
	/**
	 * Minimum length of the string.
	 * @default 1
	 */
	lengthMinimum: number;
	/**
	 * Line of the string.
	 * @default "any"
	 */
	line: StringLineEnum;
	/**
	 * Whether a pattern matchable string.
	 * @default undefined
	 */
	pattern?: RegExp;
	/**
	 * Whether to trim the string internally before determine.
	 * @default false
	 */
	preTrim?: boolean;
}
export interface StringFilterOptions extends Partial<Omit<StringFilterStatus, "ascii" | "case" | "line">> {
	/**
	 * Whether to allow an empty string.
	 * @default false
	 */
	allowEmpty?: boolean;
	/**
	 * Whether an ASCII string.
	 * @default "neutral"
	 */
	ascii?: ThreePhaseConditionEnumStringify;
	/**
	 * Case of the string.
	 * @default "any"
	 */
	case?: StringCaseEnumStringify;
	/**
	 * Length of the string.
	 * @default undefined
	 */
	length?: number;
	/**
	 * Line of the string.
	 * @default "any"
	 */
	line?: StringLineEnumStringify;
	/** @alias length */characters?: this["length"];
	/** @alias lengthMaximum */charactersMax?: this["lengthMaximum"];
	/** @alias lengthMaximum */charactersMaximum?: this["lengthMaximum"];
	/** @alias lengthMaximum */lengthMax?: this["lengthMaximum"];
	/** @alias lengthMaximum */maxCharacters?: this["lengthMaximum"];
	/** @alias lengthMaximum */maximumCharacters?: this["lengthMaximum"];
	/** @alias lengthMaximum */maximumLength?: this["lengthMaximum"];
	/** @alias lengthMaximum */maxLength?: this["lengthMaximum"];
	/** @alias lengthMinimum */charactersMin?: this["lengthMinimum"];
	/** @alias lengthMinimum */charactersMinimum?: this["lengthMinimum"];
	/** @alias lengthMinimum */lengthMin?: this["lengthMinimum"];
	/** @alias lengthMinimum */minCharacters?: this["lengthMinimum"];
	/** @alias lengthMinimum */minimumCharacters?: this["lengthMinimum"];
	/** @alias lengthMinimum */minimumLength?: this["lengthMinimum"];
	/** @alias lengthMinimum */minLength?: this["lengthMinimum"];
}
/**
 * Filter for string.
 */
export class StringFilter {
	#status: StringFilterStatus = {
		ascii: ThreePhaseConditionEnum.Neutral,
		case: StringCaseEnum.Any,
		lengthMaximum: Infinity,
		lengthMinimum: 1,
		line: StringLineEnum.Any,
		pattern: undefined,
		preTrim: false
	};
	/**
	 * Initialize the string filter.
	 * @param {StringFilter | StringFilterOptions} [options] Options.
	 */
	constructor(options?: StringFilter | StringFilterOptions) {
		if (options instanceof StringFilter) {
			this.#status = { ...options.#status };
		} else if (typeof options !== "undefined") {
			options.length ??= options.characters;
			options.lengthMaximum ??= options.lengthMax ?? options.charactersMaximum ?? options.charactersMax ?? options.maximumLength ?? options.maxLength ?? options.maximumCharacters ?? options.maxCharacters;
			options.lengthMinimum ??= options.lengthMin ?? options.charactersMinimum ?? options.charactersMin ?? options.minimumLength ?? options.minLength ?? options.minimumCharacters ?? options.minCharacters;
			for (const option of ["ascii", "case", "lengthMaximum", "lengthMinimum", "line", "pattern", "preTrim", "allowEmpty", "length"]) {
				//@ts-ignore Handle by it's method.
				if (typeof options[option] !== "undefined") {
					//@ts-ignore Handle by it's method.
					this[option](options[option]);
				}
			}
		}
	}
	/**
	 * Clone this string filter for reuse.
	 * @returns {StringFilter} Another instance of this string filter.
	 */
	get clone(): StringFilter {
		return new StringFilter(this);
	}
	/**
	 * Get the status of this string filter.
	 * @returns {StringFilterStatus} Status of this string filter.
	 */
	get status(): StringFilterStatus {
		return { ...this.#status };
	}
	/**
	 * Whether to allow an empty string.
	 * @param {boolean} [value=true]
	 * @returns {this}
	 */
	allowEmpty(value = true): this {
		if (typeof value !== "boolean") {
			throw new TypeError(`Filter status \`allowEmpty\` is not a boolean!`);
		}
		this.#status.lengthMinimum = value ? 0 : 1;
		return this;
	}
	/**
	 * Whether an ASCII string.
	 * @param {ThreePhaseConditionEnum | ThreePhaseConditionEnumStringify} value
	 * @returns {this}
	 */
	ascii(value: ThreePhaseConditionEnum | ThreePhaseConditionEnumStringify): this {
		this.#status.ascii = enumResolver<ThreePhaseConditionEnum, ThreePhaseConditionEnumStringify>(ThreePhaseConditionEnum, value, "Filter status `ascii`");
		return this;
	}
	/**
	 * Case of the string.
	 * @param {StringCaseEnum | StringCaseEnumStringify} value
	 * @returns {this}
	 */
	case(value: StringCaseEnum | StringCaseEnumStringify): this {
		this.#status.case = enumResolver<StringCaseEnum, StringCaseEnumStringify>(StringCaseEnum, value, "Filter status `case`");
		return this;
	}
	/**
	 * Length of the string.
	 * @param {number} value
	 * @returns {this}
	 */
	length(value: number): this {
		if (!(typeof value === "number" && !Number.isNaN(value))) {
			throw new TypeError(`Filter status \`length\` is not a number!`);
		}
		if (!(Number.isSafeInteger(value) && value >= 0)) {
			throw new RangeError(`Filter status \`length\` is not a number which is integer, positive, and safe!`);
		}
		this.#status.lengthMaximum = value;
		this.#status.lengthMinimum = value;
		return this;
	}
	/**
	 * Maximum length of the string.
	 * @param {number} value
	 * @returns {this}
	 */
	lengthMaximum(value: number): this {
		if (!(typeof value === "number" && !Number.isNaN(value))) {
			throw new TypeError(`Filter status \`lengthMaximum\` is not a number!`);
		}
		if (value !== Infinity && !(Number.isSafeInteger(value) && value >= 0 && value >= this.#status.lengthMinimum)) {
			throw new RangeError(`Filter status \`lengthMaximum\` is not \`Infinity\`, or a number which is integer, positive, safe, and >= ${this.#status.lengthMinimum}!`);
		}
		this.#status.lengthMaximum = value;
		return this;
	}
	/**
	 * Minimum length of the string.
	 * @param {number} value
	 * @returns {this}
	 */
	lengthMinimum(value: number): this {
		if (!(typeof value === "number" && !Number.isNaN(value))) {
			throw new TypeError(`Filter status \`lengthMinimum\` is not a number!`);
		}
		if (!(Number.isSafeInteger(value) && value >= 0 && value <= this.#status.lengthMaximum)) {
			throw new RangeError(`Filter status \`lengthMinimum\` is not a number which is integer, positive, safe, and <= ${this.#status.lengthMaximum}!`);
		}
		this.#status.lengthMinimum = value;
		return this;
	}
	/**
	 * Line of the string.
	 * @param {StringLineEnum | StringLineEnumStringify} value
	 * @returns {this}
	 */
	line(value: StringLineEnum | StringLineEnumStringify): this {
		this.#status.line = enumResolver<StringLineEnum, StringLineEnumStringify>(StringLineEnum, value, "Filter status `line`");
		return this;
	}
	/**
	 * Whether a pattern matchable string.
	 * @param {RegExp | undefined} [value]
	 * @returns {this}
	 */
	pattern(value?: RegExp | undefined): this {
		if (!(value instanceof RegExp) && typeof value !== "undefined") {
			throw new TypeError(`Filter status \`pattern\` is not a RegExp or undefined!`);
		}
		this.#status.pattern = value;
		return this;
	}
	/**
	 * Whether to trim the string internally before determine.
	 * @param {boolean} [value=true]
	 * @returns {this}
	 */
	preTrim(value = true): this {
		if (typeof value !== "boolean") {
			throw new TypeError(`Filter status \`preTrim\` is not a boolean!`);
		}
		this.#status.preTrim = value;
		return this;
	}
	/** @alias length */characters = this.length;
	/** @alias lengthMaximum */charactersMax = this.lengthMaximum;
	/** @alias lengthMaximum */charactersMaximum = this.lengthMaximum;
	/** @alias lengthMaximum */lengthMax = this.lengthMaximum;
	/** @alias lengthMaximum */maxCharacters = this.lengthMaximum;
	/** @alias lengthMaximum */maximumCharacters = this.lengthMaximum;
	/** @alias lengthMaximum */maximumLength = this.lengthMaximum;
	/** @alias lengthMaximum */maxLength = this.lengthMaximum;
	/** @alias lengthMinimum */charactersMin = this.lengthMinimum;
	/** @alias lengthMinimum */charactersMinimum = this.lengthMinimum;
	/** @alias lengthMinimum */lengthMin = this.lengthMinimum;
	/** @alias lengthMinimum */minCharacters = this.lengthMinimum;
	/** @alias lengthMinimum */minimumCharacters = this.lengthMinimum;
	/** @alias lengthMinimum */minimumLength = this.lengthMinimum;
	/** @alias lengthMinimum */minLength = this.lengthMinimum;
	/**
	 * Set to allow a lower case string.
	 * @returns {this}
	 */
	lowerCase() {
		return this.case("lower");
	}
	/**
	 * Set to allow a multiple line string.
	 * @returns {this}
	 */
	multipleLine() {
		return this.line("multiple");
	}
	/**
	 * Set to allow a single line string.
	 * @returns {this}
	 */
	singleLine() {
		return this.line("single");
	}
	/**
	 * Set to allow an upper case string.
	 * @returns {this}
	 */
	upperCase() {
		return this.case("upper");
	}
	/** @alias multipleLine */multiline = this.multipleLine;
	/** @alias multipleLine */multiLine = this.multipleLine;
	/**
	 * Determine item with the configured string filter.
	 * @param {unknown} item Item that need to determine.
	 * @returns {boolean} Determine result.
	 */
	test(item: unknown): boolean {
		if (typeof item !== "string") {
			return false;
		}
		const itemRaw: string = this.#status.preTrim ? item.trim() : item;
		if (
			(this.#status.ascii === ThreePhaseConditionEnum.False && isStringASCII(itemRaw)) ||
			(this.#status.ascii === ThreePhaseConditionEnum.True && !isStringASCII(itemRaw)) ||
			(this.#status.case === StringCaseEnum.Lower && !isStringLowerCase(itemRaw)) ||
			(this.#status.case === StringCaseEnum.Upper && !isStringUpperCase(itemRaw)) ||
			this.#status.lengthMaximum < itemRaw.length ||
			itemRaw.length < this.#status.lengthMinimum ||
			(this.#status.pattern instanceof RegExp && !this.#status.pattern.test(itemRaw)) ||
			(this.#status.line === StringLineEnum.MultipleLine && !isStringMultipleLine(itemRaw)) ||
			(this.#status.line === StringLineEnum.SingleLine && !isStringSingleLine(itemRaw))
		) {
			return false;
		}
		return true;
	}
	/**
	 * Determine item with the string filter.
	 * @param {unknown} item Item that need to determine.
	 * @param {StringFilterOptions} [options={}] Options.
	 * @returns {boolean} Determine result.
	 */
	static test(item: unknown, options: StringFilterOptions = {}): boolean {
		return new this(options).test(item);
	}
}
/**
 * Determine item with the string filter.
 * @param {unknown} item Item that need to determine.
 * @param {StringFilterOptions} [options={}] Options.
 * @returns {boolean} Determine result.
 */
export function filterString(item: unknown, options: StringFilterOptions = {}): boolean {
	return new StringFilter(options).test(item);
}
