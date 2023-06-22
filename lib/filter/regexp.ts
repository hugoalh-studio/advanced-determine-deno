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
	#status: RegExpFilterStatus = {
		dotAll: "neutral",
		exactly: "neutral",
		global: "neutral",
		ignoreCase: "neutral",
		multipleLine: "neutral",
		sticky: "neutral",
		unicode: "neutral"
	};
	/**
	 * @constructor
	 * @description Initialize the `RegExp` filter.
	 * @param {RegExpFilter | RegExpFilterOptions} [options] Options.
	 */
	constructor(options?: RegExpFilter | RegExpFilterOptions) {
		if (options instanceof RegExpFilter) {
			this.#status = { ...options.#status };
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
		return { ...this.#status };
	}
	/**
	 * @method dotAll
	 * @description Whether a dot-all `RegExp`.
	 * @param {ThreePhaseConditionEnumKeysType} value
	 * @returns {this}
	 */
	dotAll(value: ThreePhaseConditionEnumKeysType): this {
		this.#status.dotAll = enumResolver<ThreePhaseConditionEnumKeysType, ThreePhaseConditionEnumValuesType>(ThreePhaseConditionEnum, value, "dotAll");
		return this;
	}
	/**
	 * @method exactly
	 * @description Whether an exactly `RegExp`.
	 * @param {ThreePhaseConditionEnumKeysType} value
	 * @returns {this}
	 */
	exactly(value: ThreePhaseConditionEnumKeysType): this {
		this.#status.exactly = enumResolver<ThreePhaseConditionEnumKeysType, ThreePhaseConditionEnumValuesType>(ThreePhaseConditionEnum, value, "exactly");
		return this;
	}
	/**
	 * @method global
	 * @description Whether a global `RegExp`.
	 * @param {ThreePhaseConditionEnumKeysType} value
	 * @returns {this}
	 */
	global(value: ThreePhaseConditionEnumKeysType): this {
		this.#status.global = enumResolver<ThreePhaseConditionEnumKeysType, ThreePhaseConditionEnumValuesType>(ThreePhaseConditionEnum, value, "global");
		return this;
	}
	/**
	 * @method ignoreCase
	 * @description Whether a case insensitive `RegExp`.
	 * @param {ThreePhaseConditionEnumKeysType} value
	 * @returns {this}
	 */
	ignoreCase(value: ThreePhaseConditionEnumKeysType): this {
		this.#status.ignoreCase = enumResolver<ThreePhaseConditionEnumKeysType, ThreePhaseConditionEnumValuesType>(ThreePhaseConditionEnum, value, "ignoreCase");
		return this;
	}
	/**
	 * @method multipleLine
	 * @description Whether a multiple line `RegExp`.
	 * @param {ThreePhaseConditionEnumKeysType} value
	 * @returns {this}
	 */
	multipleLine(value: ThreePhaseConditionEnumKeysType): this {
		this.#status.multipleLine = enumResolver<ThreePhaseConditionEnumKeysType, ThreePhaseConditionEnumValuesType>(ThreePhaseConditionEnum, value, "multipleLine");
		return this;
	}
	/**
	 * @method sticky
	 * @description Whether a sticky `RegExp`.
	 * @param {ThreePhaseConditionEnumKeysType} value
	 * @returns {this}
	 */
	sticky(value: ThreePhaseConditionEnumKeysType): this {
		this.#status.sticky = enumResolver<ThreePhaseConditionEnumKeysType, ThreePhaseConditionEnumValuesType>(ThreePhaseConditionEnum, value, "sticky");
		return this;
	}
	/**
	 * @method unicode
	 * @description Whether an unicode `RegExp`.
	 * @param {ThreePhaseConditionEnumKeysType} value
	 * @returns {this}
	 */
	unicode(value: ThreePhaseConditionEnumKeysType): this {
		this.#status.unicode = enumResolver<ThreePhaseConditionEnumKeysType, ThreePhaseConditionEnumValuesType>(ThreePhaseConditionEnum, value, "unicode");
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
			(this.#status.dotAll === "false" && item.dotAll) ||
			(this.#status.dotAll === "true" && !item.dotAll) ||
			(this.#status.exactly === "false" && item.source.startsWith("^") && item.source.endsWith("$")) ||
			(this.#status.exactly === "true" && (
				!item.source.startsWith("^") ||
				!item.source.endsWith("$")
			)) ||
			(this.#status.global === "false" && item.global) ||
			(this.#status.global === "true" && !item.global) ||
			(this.#status.ignoreCase === "false" && item.ignoreCase) ||
			(this.#status.ignoreCase === "true" && !item.ignoreCase) ||
			(this.#status.multipleLine === "false" && item.multiline) ||
			(this.#status.multipleLine === "true" && !item.multiline) ||
			(this.#status.sticky === "false" && item.sticky) ||
			(this.#status.sticky === "true" && !item.sticky) ||
			(this.#status.unicode === "false" && item.unicode) ||
			(this.#status.unicode === "true" && !item.unicode)
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
