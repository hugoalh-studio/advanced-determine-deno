import { enumResolver, ThreePhaseConditionEnum, type ThreePhaseConditionEnumKeysType, type ThreePhaseConditionEnumValuesType } from "../internal/enum.ts";
export interface RegExpFilterStatus {
	/**
	 * Whether a dot-all `RegExp`.
	 * @default "neutral"
	 */
	dotAll: ThreePhaseConditionEnumValuesType;
	/**
	 * Whether an exactly `RegExp`.
	 * @default "neutral"
	 */
	exactly: ThreePhaseConditionEnumValuesType;
	/**
	 * Whether a global `RegExp`.
	 * @default "neutral"
	 */
	global: ThreePhaseConditionEnumValuesType;
	/**
	 * Whether a case insensitive `RegExp`.
	 * @default "neutral"
	 */
	ignoreCase: ThreePhaseConditionEnumValuesType;
	/**
	 * Whether a multiple line `RegExp`.
	 * @default "neutral"
	 */
	multipleLine: ThreePhaseConditionEnumValuesType;
	/**
	 * Whether a sticky `RegExp`.
	 * @default "neutral"
	 */
	sticky: ThreePhaseConditionEnumValuesType;
	/**
	 * Whether an unicode `RegExp`.
	 * @default "neutral"
	 */
	unicode: ThreePhaseConditionEnumValuesType;
}
export interface RegExpFilterOptions extends Partial<Omit<RegExpFilterStatus, "dotAll" | "exactly" | "global" | "ignoreCase" | "multipleLine" | "sticky" | "unicode">> {
	/**
	 * Whether a dot-all `RegExp`.
	 * @default "neutral"
	 */
	dotAll?: ThreePhaseConditionEnumKeysType;
	/**
	 * Whether an exactly `RegExp`.
	 * @default "neutral"
	 */
	exactly?: ThreePhaseConditionEnumKeysType;
	/**
	 * Whether a global `RegExp`.
	 * @default "neutral"
	 */
	global?: ThreePhaseConditionEnumKeysType;
	/**
	 * Whether a case insensitive `RegExp`.
	 * @default "neutral"
	 */
	ignoreCase?: ThreePhaseConditionEnumKeysType;
	/**
	 * Whether a multiple line `RegExp`.
	 * @default "neutral"
	 */
	multipleLine?: ThreePhaseConditionEnumKeysType;
	/**
	 * Whether a sticky `RegExp`.
	 * @default "neutral"
	 */
	sticky?: ThreePhaseConditionEnumKeysType;
	/**
	 * Whether an unicode `RegExp`.
	 * @default "neutral"
	 */
	unicode?: ThreePhaseConditionEnumKeysType;
	/** @alias exactly */exact?: this["exactly"];
	/** @alias ignoreCase */caseInsensitive?: this["ignoreCase"];
	/** @alias multipleLine */multiline?: this["multipleLine"];
	/** @alias multipleLine */multiLine?: this["multipleLine"];
}
/**
 * Filter for `RegExp`.
 */
export class RegExpFilter {
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
	 * Initialize the `RegExp` filter.
	 * @param {RegExpFilter | RegExpFilterOptions} [options] Options.
	 */
	constructor(options?: RegExpFilter | RegExpFilterOptions) {
		if (options instanceof RegExpFilter) {
			this.#status = { ...options.#status };
		} else if (typeof options !== "undefined") {
			options.exactly ??= options.exact;
			options.ignoreCase ??= options.caseInsensitive;
			options.multipleLine ??= options.multiLine ?? options.multiline;
			for (const option of ["dotAll", "exactly", "global", "ignoreCase", "multipleLine", "sticky", "unicode"]) {
				//@ts-ignore Handle by it's method.
				if (typeof options[option] !== "undefined") {
					//@ts-ignore Handle by it's method.
					this[option](options[option]);
				}
			}
		}
	}
	/**
	 * Clone this `RegExp` filter for reuse.
	 * @returns {RegExpFilter} Another instance of this `RegExp` filter.
	 */
	get clone(): RegExpFilter {
		return new RegExpFilter(this);
	}
	/**
	 * Get the status of this `RegExp` filter.
	 * @returns {RegExpFilterStatus} Status of this `RegExp` filter.
	 */
	get status(): RegExpFilterStatus {
		return { ...this.#status };
	}
	/**
	 * Whether a dot-all `RegExp`.
	 * @param {ThreePhaseConditionEnumKeysType} value
	 * @returns {this}
	 */
	dotAll(value: ThreePhaseConditionEnumKeysType): this {
		this.#status.dotAll = enumResolver<ThreePhaseConditionEnumKeysType, ThreePhaseConditionEnumValuesType>(ThreePhaseConditionEnum, value, "Filter status `dotAll`");
		return this;
	}
	/**
	 * Whether an exactly `RegExp`.
	 * @param {ThreePhaseConditionEnumKeysType} value
	 * @returns {this}
	 */
	exactly(value: ThreePhaseConditionEnumKeysType): this {
		this.#status.exactly = enumResolver<ThreePhaseConditionEnumKeysType, ThreePhaseConditionEnumValuesType>(ThreePhaseConditionEnum, value, "Filter status `exactly`");
		return this;
	}
	/**
	 * Whether a global `RegExp`.
	 * @param {ThreePhaseConditionEnumKeysType} value
	 * @returns {this}
	 */
	global(value: ThreePhaseConditionEnumKeysType): this {
		this.#status.global = enumResolver<ThreePhaseConditionEnumKeysType, ThreePhaseConditionEnumValuesType>(ThreePhaseConditionEnum, value, "Filter status `global`");
		return this;
	}
	/**
	 * Whether a case insensitive `RegExp`.
	 * @param {ThreePhaseConditionEnumKeysType} value
	 * @returns {this}
	 */
	ignoreCase(value: ThreePhaseConditionEnumKeysType): this {
		this.#status.ignoreCase = enumResolver<ThreePhaseConditionEnumKeysType, ThreePhaseConditionEnumValuesType>(ThreePhaseConditionEnum, value, "Filter status `ignoreCase`");
		return this;
	}
	/**
	 * Whether a multiple line `RegExp`.
	 * @param {ThreePhaseConditionEnumKeysType} value
	 * @returns {this}
	 */
	multipleLine(value: ThreePhaseConditionEnumKeysType): this {
		this.#status.multipleLine = enumResolver<ThreePhaseConditionEnumKeysType, ThreePhaseConditionEnumValuesType>(ThreePhaseConditionEnum, value, "Filter status `multipleLine`");
		return this;
	}
	/**
	 * Whether a sticky `RegExp`.
	 * @param {ThreePhaseConditionEnumKeysType} value
	 * @returns {this}
	 */
	sticky(value: ThreePhaseConditionEnumKeysType): this {
		this.#status.sticky = enumResolver<ThreePhaseConditionEnumKeysType, ThreePhaseConditionEnumValuesType>(ThreePhaseConditionEnum, value, "Filter status `sticky`");
		return this;
	}
	/**
	 * Whether an unicode `RegExp`.
	 * @param {ThreePhaseConditionEnumKeysType} value
	 * @returns {this}
	 */
	unicode(value: ThreePhaseConditionEnumKeysType): this {
		this.#status.unicode = enumResolver<ThreePhaseConditionEnumKeysType, ThreePhaseConditionEnumValuesType>(ThreePhaseConditionEnum, value, "Filter status `unicode`");
		return this;
	}
	/** @alias exactly */exact = this.exactly;
	/** @alias ignoreCase */caseInsensitive = this.ignoreCase;
	/** @alias multipleLine */multiline = this.multipleLine;
	/** @alias multipleLine */multiLine = this.multipleLine;
	/**
	 * Determine item with the configured `RegExp` filter.
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
	 * Determine item with the `RegExp` filter.
	 * @param {unknown} item Item that need to determine.
	 * @param {RegExpFilterOptions} [options={}] Options.
	 * @returns {boolean} Determine result.
	 */
	static test(item: unknown, options: RegExpFilterOptions = {}): boolean {
		return new this(options).test(item);
	}
}
/**
 * Determine item with the `RegExp` filter.
 * @param {unknown} item Item that need to determine.
 * @param {RegExpFilterOptions} [options={}] Options.
 * @returns {boolean} Determine result.
 */
export function filterRegExp(item: unknown, options: RegExpFilterOptions = {}): boolean {
	return new RegExpFilter(options).test(item);
}
export {
	filterRegExp as filterRegEx,
	filterRegExp as filterRegularExpression,
	RegExpFilter as RegExFilter,
	RegExpFilter as RegularExpressionFilter,
	type RegExpFilterOptions as RegExFilterOptions,
	type RegExpFilterOptions as RegularExpressionFilterOptions,
	type RegExpFilterStatus as RegExFilterStatus,
	type RegExpFilterStatus as RegularExpressionFilterStatus
};
