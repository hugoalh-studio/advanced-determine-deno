import { enumResolver, StringCaseEnum, StringLineEnum, ThreePhaseConditionEnum, type StringCaseEnumKeysType, type StringCaseEnumValuesType, type StringLineEnumKeysType, type StringLineEnumValuesType, type ThreePhaseConditionEnumKeysType, type ThreePhaseConditionEnumValuesType } from "../internal/enum.ts";
import { isStringASCII, isStringLowerCase, isStringMultipleLine, isStringSingleLine, isStringUpperCase } from "../string.ts";
interface StringFilterStatus {
	/**
	 * @property ascii
	 * @description Whether an ASCII string.
	 * @default "neutral"
	 */
	ascii: ThreePhaseConditionEnumValuesType;
	/**
	 * @property case
	 * @description Case of the string.
	 * @default "any"
	 */
	case: StringCaseEnumValuesType;
	/**
	 * @property lengthMaximum
	 * @description Maximum length of the string.
	 * @default Infinity
	 */
	lengthMaximum: number;
	/**
	 * @property lengthMinimum
	 * @description Minimum length of the string.
	 * @default 1
	 */
	lengthMinimum: number;
	/**
	 * @property line
	 * @description Line of the string.
	 * @default "any"
	 */
	line: StringLineEnumValuesType;
	/**
	 * @property pattern
	 * @description Whether a pattern matchable string.
	 * @default undefined
	 */
	pattern?: RegExp;
	/**
	 * @property preTrim
	 * @description Whether to trim the string internally before determine.
	 * @default false
	 */
	preTrim?: boolean;
}
interface StringFilterOptions extends Partial<Omit<StringFilterStatus, "ascii" | "case" | "line">> {
	/**
	 * @property allowEmpty
	 * @description Whether to allow an empty string.
	 * @default false
	 */
	allowEmpty?: boolean;
	/**
	 * @property ascii
	 * @description Whether an ASCII string.
	 * @default "neutral"
	 */
	ascii?: ThreePhaseConditionEnumKeysType;
	/**
	 * @property case
	 * @description Case of the string.
	 * @default "any"
	 */
	case?: StringCaseEnumKeysType;
	/**
	 * @property length
	 * @description Length of the string.
	 * @default undefined
	 */
	length?: number;
	/**
	 * @property line
	 * @description Line of the string.
	 * @default "any"
	 */
	line?: StringLineEnumKeysType;
	/** @alias length */characters?: number;
	/** @alias lengthMaximum */charactersMax?: number;
	/** @alias lengthMaximum */charactersMaximum?: number;
	/** @alias lengthMaximum */lengthMax?: number;
	/** @alias lengthMaximum */maxCharacters?: number;
	/** @alias lengthMaximum */maximumCharacters?: number;
	/** @alias lengthMaximum */maximumLength?: number;
	/** @alias lengthMaximum */maxLength?: number;
	/** @alias lengthMinimum */charactersMin?: number;
	/** @alias lengthMinimum */charactersMinimum?: number;
	/** @alias lengthMinimum */lengthMin?: number;
	/** @alias lengthMinimum */minCharacters?: number;
	/** @alias lengthMinimum */minimumCharacters?: number;
	/** @alias lengthMinimum */minimumLength?: number;
	/** @alias lengthMinimum */minLength?: number;
}
/**
 * @class StringFilter
 * @description Filter for string.
 */
class StringFilter {
	#status: StringFilterStatus = {
		ascii: "neutral",
		case: "any",
		lengthMaximum: Infinity,
		lengthMinimum: 1,
		line: "any",
		pattern: undefined,
		preTrim: false
	};
	/**
	 * @constructor
	 * @description Initialize the string filter.
	 * @param {StringFilter | StringFilterOptions} [options] Options.
	 */
	constructor(options?: StringFilter | StringFilterOptions) {
		if (options instanceof StringFilter) {
			this.#status = { ...options.#status };
		} else if (typeof options !== "undefined") {
			options.length ??= options.characters;
			options.lengthMaximum ??= options.lengthMax ?? options.charactersMaximum ?? options.charactersMax ?? options.maximumLength ?? options.maxLength ?? options.maximumCharacters ?? options.maxCharacters;
			options.lengthMinimum ??= options.lengthMin ?? options.charactersMinimum ?? options.charactersMin ?? options.minimumLength ?? options.minLength ?? options.minimumCharacters ?? options.minCharacters;
			for (let option of ["ascii", "case", "lengthMaximum", "lengthMinimum", "line", "pattern", "preTrim", "allowEmpty", "length"]) {
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
	 * @description Clone this string filter for reuse.
	 * @returns {StringFilter} Another instance of this string filter.
	 */
	get clone(): StringFilter {
		return new StringFilter(this);
	}
	/**
	 * @method status
	 * @description Get the status of this string filter.
	 * @returns {StringFilterStatus} Status of this string filter.
	 */
	get status(): StringFilterStatus {
		return { ...this.#status };
	}
	/**
	 * @method allowEmpty
	 * @description Whether to allow an empty string.
	 * @param {boolean} [value=true]
	 * @returns {this}
	 */
	allowEmpty(value = true): this {
		if (typeof value !== "boolean") {
			throw new TypeError(`Filter argument \`allowEmpty\` must be type of boolean!`);
		}
		this.#status.lengthMinimum = value ? 0 : 1;
		return this;
	}
	/**
	 * @method ascii
	 * @description Whether an ASCII string.
	 * @param {ThreePhaseConditionEnumKeysType} value
	 * @returns {this}
	 */
	ascii(value: ThreePhaseConditionEnumKeysType): this {
		this.#status.ascii = enumResolver<ThreePhaseConditionEnumKeysType, ThreePhaseConditionEnumValuesType>(ThreePhaseConditionEnum, value, "ascii");
		return this;
	}
	/**
	 * @method case
	 * @description Case of the string.
	 * @param {StringCaseEnumKeysType} value
	 * @returns {this}
	 */
	case(value: StringCaseEnumKeysType): this {
		this.#status.case = enumResolver<StringCaseEnumKeysType, StringCaseEnumValuesType>(StringCaseEnum, value, "case");
		return this;
	}
	/**
	 * @method length
	 * @description Length of the string.
	 * @param {number} value
	 * @returns {this}
	 */
	length(value: number): this {
		if (!(typeof value === "number" && !Number.isNaN(value))) {
			throw new TypeError(`Filter argument \`length\` must be type of number!`);
		}
		if (!(Number.isSafeInteger(value) && value >= 0)) {
			throw new RangeError(`Filter argument \`length\` must be a number which is integer, positive, and safe!`);
		}
		this.#status.lengthMaximum = value;
		this.#status.lengthMinimum = value;
		return this;
	}
	/**
	 * @method lengthMaximum
	 * @description Maximum length of the string.
	 * @param {number} value
	 * @returns {this}
	 */
	lengthMaximum(value: number): this {
		if (!(typeof value === "number" && !Number.isNaN(value))) {
			throw new TypeError(`Filter argument \`lengthMaximum\` must be type of number!`);
		}
		if (value !== Infinity && !(Number.isSafeInteger(value) && value >= 0 && value >= this.#status.lengthMinimum)) {
			throw new RangeError(`Filter argument \`lengthMaximum\` must be \`Infinity\`, or a number which is integer, positive, safe, and >= ${this.#status.lengthMinimum}!`);
		}
		this.#status.lengthMaximum = value;
		return this;
	}
	/**
	 * @method lengthMinimum
	 * @description Minimum length of the string.
	 * @param {number} value
	 * @returns {this}
	 */
	lengthMinimum(value: number): this {
		if (!(typeof value === "number" && !Number.isNaN(value))) {
			throw new TypeError(`Filter argument \`lengthMinimum\` must be type of number!`);
		}
		if (!(Number.isSafeInteger(value) && value >= 0 && value <= this.#status.lengthMaximum)) {
			throw new RangeError(`Filter argument \`lengthMinimum\` must be a number which is integer, positive, safe, and <= ${this.#status.lengthMaximum}!`);
		}
		this.#status.lengthMinimum = value;
		return this;
	}
	/**
	 * @method line
	 * @description Line of the string.
	 * @param {StringLineEnumKeysType} value
	 * @returns {this}
	 */
	line(value: StringLineEnumKeysType): this {
		this.#status.line = enumResolver<StringLineEnumKeysType, StringLineEnumValuesType>(StringLineEnum, value, "line");
		return this;
	}
	/**
	 * @method pattern
	 * @description Whether a pattern matchable string.
	 * @param {RegExp | undefined} [value]
	 * @returns {this}
	 */
	pattern(value?: RegExp | undefined): this {
		if (!(value instanceof RegExp) && typeof value !== "undefined") {
			throw new TypeError(`Filter argument \`pattern\` must be instance of regular expression, or type of undefined!`);
		}
		this.#status.pattern = value;
		return this;
	}
	/**
	 * @method preTrim
	 * @description Whether to trim the string internally before determine.
	 * @param {boolean} [value=true]
	 * @returns {this}
	 */
	preTrim(value = true): this {
		if (typeof value !== "boolean") {
			throw new TypeError(`Filter argument \`preTrim\` must be type of boolean!`);
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
	 * @method lowerCase
	 * @description Set to allow a lower case string.
	 * @returns {this}
	 */
	lowerCase() {
		return this.case("lower");
	}
	/**
	 * @method multipleLine
	 * @description Set to allow a multiple line string.
	 * @returns {this}
	 */
	multipleLine() {
		return this.line("multiple");
	}
	/**
	 * @method singleLine
	 * @description Set to allow a single line string.
	 * @returns {this}
	 */
	singleLine() {
		return this.line("single");
	}
	/**
	 * @method upperCase
	 * @description Set to allow an upper case string.
	 * @returns {this}
	 */
	upperCase() {
		return this.case("upper");
	}
	/** @alias multipleLine */multiline = this.multipleLine;
	/** @alias multipleLine */multiLine = this.multipleLine;
	/**
	 * @method test
	 * @description Determine item with the configured string filter.
	 * @param {unknown} item Item that need to determine.
	 * @returns {boolean} Determine result.
	 */
	test(item: unknown): boolean {
		if (typeof item !== "string") {
			return false;
		}
		let itemRaw: string = this.#status.preTrim ? item.trim() : item;
		if (
			(this.#status.ascii === "false" && isStringASCII(itemRaw)) ||
			(this.#status.ascii === "true" && !isStringASCII(itemRaw)) ||
			(this.#status.case === "lower" && !isStringLowerCase(itemRaw)) ||
			(this.#status.case === "upper" && !isStringUpperCase(itemRaw)) ||
			this.#status.lengthMaximum < itemRaw.length ||
			itemRaw.length < this.#status.lengthMinimum ||
			(this.#status.pattern instanceof RegExp && !this.#status.pattern.test(itemRaw)) ||
			(this.#status.line === "multiple" && !isStringMultipleLine(itemRaw)) ||
			(this.#status.line === "single" && !isStringSingleLine(itemRaw))
		) {
			return false;
		}
		return true;
	}
	/**
	 * @static test
	 * @description Determine item with the string filter.
	 * @param {unknown} item Item that need to determine.
	 * @param {StringFilterOptions} [options={}] Options.
	 * @returns {boolean} Determine result.
	 */
	static test(item: unknown, options: StringFilterOptions = {}): boolean {
		return new this(options).test(item);
	}
}
/**
 * @function filterString
 * @description Determine item with the string filter.
 * @param {unknown} item Item that need to determine.
 * @param {StringFilterOptions} [options={}] Options.
 * @returns {boolean} Determine result.
 */
function filterString(item: unknown, options: StringFilterOptions = {}): boolean {
	return new StringFilter(options).test(item);
}
export {
	filterString,
	StringFilter,
	type StringFilterOptions,
	type StringFilterStatus
};
