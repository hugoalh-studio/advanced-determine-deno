import { enumResolver, ThreePhaseConditionEnum, type ThreePhaseConditionEnumKeysType, type ThreePhaseConditionEnumValuesType } from "../internal/enum.ts";
interface RegExpFilterStatus {
	/**
	 * @property dotAll
	 * @description Whether a dot-all `RegExp`.
	 * @default "neutral"
	 */
	dotAll: ThreePhaseConditionEnumValuesType;
	/**
	 * @property exactly
	 * @description Whether an exactly `RegExp`.
	 * @default "neutral"
	 */
	exactly: ThreePhaseConditionEnumValuesType;
	/**
	 * @property global
	 * @description Whether a global `RegExp`.
	 * @default "neutral"
	 */
	global: ThreePhaseConditionEnumValuesType;
	/**
	 * @property ignoreCase
	 * @description Whether a case insensitive `RegExp`.
	 * @default "neutral"
	 */
	ignoreCase: ThreePhaseConditionEnumValuesType;
	/**
	 * @property multipleLine
	 * @description Whether a multiple line `RegExp`.
	 * @default "neutral"
	 */
	multipleLine: ThreePhaseConditionEnumValuesType;
	/**
	 * @property sticky
	 * @description Whether a sticky `RegExp`.
	 * @default "neutral"
	 */
	sticky: ThreePhaseConditionEnumValuesType;
	/**
	 * @property unicode
	 * @description Whether an unicode `RegExp`.
	 * @default "neutral"
	 */
	unicode: ThreePhaseConditionEnumValuesType;
}
interface RegExpFilterOptions extends Partial<Omit<RegExpFilterStatus, "dotAll" | "exactly" | "global" | "ignoreCase" | "multipleLine" | "sticky" | "unicode">> {
	/**
	 * @property dotAll
	 * @description Whether a dot-all `RegExp`.
	 * @default "neutral"
	 */
	dotAll?: ThreePhaseConditionEnumKeysType;
	/**
	 * @property exactly
	 * @description Whether an exactly `RegExp`.
	 * @default "neutral"
	 */
	exactly?: ThreePhaseConditionEnumKeysType;
	/**
	 * @property global
	 * @description Whether a global `RegExp`.
	 * @default "neutral"
	 */
	global?: ThreePhaseConditionEnumKeysType;
	/**
	 * @property ignoreCase
	 * @description Whether a case insensitive `RegExp`.
	 * @default "neutral"
	 */
	ignoreCase?: ThreePhaseConditionEnumKeysType;
	/**
	 * @property multipleLine
	 * @description Whether a multiple line `RegExp`.
	 * @default "neutral"
	 */
	multipleLine?: ThreePhaseConditionEnumKeysType;
	/**
	 * @property sticky
	 * @description Whether a sticky `RegExp`.
	 * @default "neutral"
	 */
	sticky?: ThreePhaseConditionEnumKeysType;
	/**
	 * @property unicode
	 * @description Whether an unicode `RegExp`.
	 * @default "neutral"
	 */
	unicode?: ThreePhaseConditionEnumKeysType;
	/** @alias exactly */exact?: ThreePhaseConditionEnumKeysType;
	/** @alias ignoreCase */caseInsensitive?: ThreePhaseConditionEnumKeysType;
	/** @alias multipleLine */multiline?: ThreePhaseConditionEnumKeysType;
	/** @alias multipleLine */multiLine?: ThreePhaseConditionEnumKeysType;
}
/**
 * @class RegExpFilter
 * @description Filter for `RegExp`.
 */
class RegExpFilter {
	#dotAll: ThreePhaseConditionEnumValuesType = "neutral";
	#exactly: ThreePhaseConditionEnumValuesType = "neutral";
	#global: ThreePhaseConditionEnumValuesType = "neutral";
	#ignoreCase: ThreePhaseConditionEnumValuesType = "neutral";
	#multipleLine: ThreePhaseConditionEnumValuesType = "neutral";
	#sticky: ThreePhaseConditionEnumValuesType = "neutral";
	#unicode: ThreePhaseConditionEnumValuesType = "neutral";
	/**
	 * @constructor
	 * @description Initialize the `RegExp` filter.
	 * @param {RegExpFilter | RegExpFilterOptions} [options] Options.
	 */
	constructor(options?: RegExpFilter | RegExpFilterOptions) {
		if (options instanceof RegExpFilter) {
			this.#dotAll = options.#dotAll;
			this.#exactly = options.#exactly;
			this.#global = options.#global;
			this.#ignoreCase = options.#ignoreCase;
			this.#multipleLine = options.#multipleLine;
			this.#sticky = options.#sticky;
			this.#unicode = options.#unicode;
		} else if (typeof options !== "undefined") {
			options.exactly ??= options.exact;
			options.ignoreCase ??= options.caseInsensitive;
			options.multipleLine ??= options.multiLine ?? options.multiline;
			for (let option of ["dotAll", "exactly", "global", "ignoreCase", "multipleLine", "sticky", "unicode"]) {
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
	 * @description Clone this `RegExp` filter for reuse.
	 * @returns {RegExpFilter} Another instance of this `RegExp` filter.
	 */
	get clone(): RegExpFilter {
		return new RegExpFilter(this);
	}
	/**
	 * @method status
	 * @description Get the status of this `RegExp` filter.
	 * @returns {RegExpFilterStatus} Status of this `RegExp` filter.
	 */
	get status(): RegExpFilterStatus {
		return {
			dotAll: this.#dotAll,
			exactly: this.#exactly,
			global: this.#global,
			ignoreCase: this.#ignoreCase,
			multipleLine: this.#multipleLine,
			sticky: this.#sticky,
			unicode: this.#unicode
		};
	}
	/**
	 * @method dotAll
	 * @description Whether a dot-all `RegExp`.
	 * @param {ThreePhaseConditionEnumKeysType} value
	 * @returns {this}
	 */
	dotAll(value: ThreePhaseConditionEnumKeysType): this {
		if (typeof value !== "string") {
			throw new TypeError(`Filter argument \`dotAll\` must be type of string!`);
		}
		let valueResolve: ThreePhaseConditionEnumValuesType | undefined = enumResolver<ThreePhaseConditionEnumKeysType, ThreePhaseConditionEnumValuesType>(ThreePhaseConditionEnum, value);
		if (typeof valueResolve !== "string") {
			throw new RangeError(`Filter argument \`dotAll\` must be either of these values: "${Object.keys(ThreePhaseConditionEnum).sort().join("\", \"")}"`);
		}
		this.#dotAll = valueResolve;
		return this;
	}
	/**
	 * @method exactly
	 * @description Whether an exactly `RegExp`.
	 * @param {ThreePhaseConditionEnumKeysType} value
	 * @returns {this}
	 */
	exactly(value: ThreePhaseConditionEnumKeysType): this {
		if (typeof value !== "string") {
			throw new TypeError(`Filter argument \`exactly\` must be type of string!`);
		}
		let valueResolve: ThreePhaseConditionEnumValuesType | undefined = enumResolver<ThreePhaseConditionEnumKeysType, ThreePhaseConditionEnumValuesType>(ThreePhaseConditionEnum, value);
		if (typeof valueResolve !== "string") {
			throw new RangeError(`Filter argument \`exactly\` must be either of these values: "${Object.keys(ThreePhaseConditionEnum).sort().join("\", \"")}"`);
		}
		this.#exactly = valueResolve;
		return this;
	}
	/**
	 * @method global
	 * @description Whether a global `RegExp`.
	 * @param {ThreePhaseConditionEnumKeysType} value
	 * @returns {this}
	 */
	global(value: ThreePhaseConditionEnumKeysType): this {
		if (typeof value !== "string") {
			throw new TypeError(`Filter argument \`global\` must be type of string!`);
		}
		let valueResolve: ThreePhaseConditionEnumValuesType | undefined = enumResolver<ThreePhaseConditionEnumKeysType, ThreePhaseConditionEnumValuesType>(ThreePhaseConditionEnum, value);
		if (typeof valueResolve !== "string") {
			throw new RangeError(`Filter argument \`global\` must be either of these values: "${Object.keys(ThreePhaseConditionEnum).sort().join("\", \"")}"`);
		}
		this.#global = valueResolve;
		return this;
	}
	/**
	 * @method ignoreCase
	 * @description Whether a case insensitive `RegExp`.
	 * @param {ThreePhaseConditionEnumKeysType} value
	 * @returns {this}
	 */
	ignoreCase(value: ThreePhaseConditionEnumKeysType): this {
		if (typeof value !== "string") {
			throw new TypeError(`Filter argument \`ignoreCase\` must be type of string!`);
		}
		let valueResolve: ThreePhaseConditionEnumValuesType | undefined = enumResolver<ThreePhaseConditionEnumKeysType, ThreePhaseConditionEnumValuesType>(ThreePhaseConditionEnum, value);
		if (typeof valueResolve !== "string") {
			throw new RangeError(`Filter argument \`ignoreCase\` must be either of these values: "${Object.keys(ThreePhaseConditionEnum).sort().join("\", \"")}"`);
		}
		this.#ignoreCase = valueResolve;
		return this;
	}
	/**
	 * @method multipleLine
	 * @description Whether a multiple line `RegExp`.
	 * @param {ThreePhaseConditionEnumKeysType} value
	 * @returns {this}
	 */
	multipleLine(value: ThreePhaseConditionEnumKeysType): this {
		if (typeof value !== "string") {
			throw new TypeError(`Filter argument \`multipleLine\` must be type of string!`);
		}
		let valueResolve: ThreePhaseConditionEnumValuesType | undefined = enumResolver<ThreePhaseConditionEnumKeysType, ThreePhaseConditionEnumValuesType>(ThreePhaseConditionEnum, value);
		if (typeof valueResolve !== "string") {
			throw new RangeError(`Filter argument \`multipleLine\` must be either of these values: "${Object.keys(ThreePhaseConditionEnum).sort().join("\", \"")}"`);
		}
		this.#multipleLine = valueResolve;
		return this;
	}
	/**
	 * @method sticky
	 * @description Whether a sticky `RegExp`.
	 * @param {ThreePhaseConditionEnumKeysType} value
	 * @returns {this}
	 */
	sticky(value: ThreePhaseConditionEnumKeysType): this {
		if (typeof value !== "string") {
			throw new TypeError(`Filter argument \`sticky\` must be type of string!`);
		}
		let valueResolve: ThreePhaseConditionEnumValuesType | undefined = enumResolver<ThreePhaseConditionEnumKeysType, ThreePhaseConditionEnumValuesType>(ThreePhaseConditionEnum, value);
		if (typeof valueResolve !== "string") {
			throw new RangeError(`Filter argument \`sticky\` must be either of these values: "${Object.keys(ThreePhaseConditionEnum).sort().join("\", \"")}"`);
		}
		this.#sticky = valueResolve;
		return this;
	}
	/**
	 * @method unicode
	 * @description Whether an unicode `RegExp`.
	 * @param {ThreePhaseConditionEnumKeysType} value
	 * @returns {this}
	 */
	unicode(value: ThreePhaseConditionEnumKeysType): this {
		if (typeof value !== "string") {
			throw new TypeError(`Filter argument \`unicode\` must be type of string!`);
		}
		let valueResolve: ThreePhaseConditionEnumValuesType | undefined = enumResolver<ThreePhaseConditionEnumKeysType, ThreePhaseConditionEnumValuesType>(ThreePhaseConditionEnum, value);
		if (typeof valueResolve !== "string") {
			throw new RangeError(`Filter argument \`unicode\` must be either of these values: "${Object.keys(ThreePhaseConditionEnum).sort().join("\", \"")}"`);
		}
		this.#unicode = valueResolve;
		return this;
	}
	/** @alias exactly */exact = this.exactly;
	/** @alias ignoreCase */caseInsensitive = this.ignoreCase;
	/** @alias multipleLine */multiline = this.multipleLine;
	/** @alias multipleLine */multiLine = this.multipleLine;
	/**
	 * @method test
	 * @description Determine item with the configured `RegExp` filter.
	 * @param {unknown} item Item that need to determine.
	 * @returns {boolean} Determine result.
	 */
	test(item: unknown): boolean {
		if (
			!(item instanceof RegExp) ||
			(this.#dotAll === "false" && item.dotAll) ||
			(this.#dotAll === "true" && !item.dotAll) ||
			(this.#exactly === "false" && item.source.startsWith("^") && item.source.endsWith("$")) ||
			(this.#exactly === "true" && (
				!item.source.startsWith("^") ||
				!item.source.endsWith("$")
			)) ||
			(this.#global === "false" && item.global) ||
			(this.#global === "true" && !item.global) ||
			(this.#ignoreCase === "false" && item.ignoreCase) ||
			(this.#ignoreCase === "true" && !item.ignoreCase) ||
			(this.#multipleLine === "false" && item.multiline) ||
			(this.#multipleLine === "true" && !item.multiline) ||
			(this.#sticky === "false" && item.sticky) ||
			(this.#sticky === "true" && !item.sticky) ||
			(this.#unicode === "false" && item.unicode) ||
			(this.#unicode === "true" && !item.unicode)
		) {
			return false;
		}
		return true;
	}
	/**
	 * @static test
	 * @description Determine item with the `RegExp` filter.
	 * @param {unknown} item Item that need to determine.
	 * @param {RegExpFilterOptions} [options={}] Options.
	 * @returns {boolean} Determine result.
	 */
	static test(item: unknown, options: RegExpFilterOptions = {}): boolean {
		return new this(options).test(item);
	}
}
/**
 * @function filterRegExp
 * @description Determine item with the `RegExp` filter.
 * @param {unknown} item Item that need to determine.
 * @param {RegExpFilterOptions} [options={}] Options.
 * @returns {boolean} Determine result.
 */
function filterRegExp(item: unknown, options: RegExpFilterOptions = {}): boolean {
	return new RegExpFilter(options).test(item);
}
export {
	filterRegExp,
	filterRegExp as filterRegEx,
	filterRegExp as filterRegularExpression,
	RegExpFilter,
	RegExpFilter as RegExFilter,
	RegExpFilter as RegularExpressionFilter,
	type RegExpFilterOptions,
	type RegExpFilterOptions as RegExFilterOptions,
	type RegExpFilterOptions as RegularExpressionFilterOptions,
	type RegExpFilterStatus,
	type RegExpFilterStatus as RegExFilterStatus,
	type RegExpFilterStatus as RegularExpressionFilterStatus
};
