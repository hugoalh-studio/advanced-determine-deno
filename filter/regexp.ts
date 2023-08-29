import { enumResolver, ThreePhaseConditionEnum, type ThreePhaseConditionEnumStringify } from "../internal/enum.ts";
export interface RegExpFilterStatus {
	/**
	 * Whether a dot-all `RegExp`.
	 * @default "neutral"
	 */
	dotAll: ThreePhaseConditionEnum;
	/**
	 * Whether an exactly `RegExp`.
	 * @default "neutral"
	 */
	exactly: ThreePhaseConditionEnum;
	/**
	 * Whether a global `RegExp`.
	 * @default "neutral"
	 */
	global: ThreePhaseConditionEnum;
	/**
	 * Whether a case insensitive `RegExp`.
	 * @default "neutral"
	 */
	ignoreCase: ThreePhaseConditionEnum;
	/**
	 * Whether a multiple line `RegExp`.
	 * @default "neutral"
	 */
	multipleLine: ThreePhaseConditionEnum;
	/**
	 * Whether a sticky `RegExp`.
	 * @default "neutral"
	 */
	sticky: ThreePhaseConditionEnum;
	/**
	 * Whether an unicode `RegExp`.
	 * @default "neutral"
	 */
	unicode: ThreePhaseConditionEnum;
}
export {
	type RegExpFilterStatus as RegExFilterStatus,
	type RegExpFilterStatus as RegularExpressionFilterStatus
};
export interface RegExpFilterOptions extends Partial<Omit<RegExpFilterStatus, "dotAll" | "exactly" | "global" | "ignoreCase" | "multipleLine" | "sticky" | "unicode">> {
	/**
	 * Whether a dot-all `RegExp`.
	 * @default "neutral"
	 */
	dotAll?: ThreePhaseConditionEnumStringify;
	/**
	 * Whether an exactly `RegExp`.
	 * @default "neutral"
	 */
	exactly?: ThreePhaseConditionEnumStringify;
	/**
	 * Whether a global `RegExp`.
	 * @default "neutral"
	 */
	global?: ThreePhaseConditionEnumStringify;
	/**
	 * Whether a case insensitive `RegExp`.
	 * @default "neutral"
	 */
	ignoreCase?: ThreePhaseConditionEnumStringify;
	/**
	 * Whether a multiple line `RegExp`.
	 * @default "neutral"
	 */
	multipleLine?: ThreePhaseConditionEnumStringify;
	/**
	 * Whether a sticky `RegExp`.
	 * @default "neutral"
	 */
	sticky?: ThreePhaseConditionEnumStringify;
	/**
	 * Whether an unicode `RegExp`.
	 * @default "neutral"
	 */
	unicode?: ThreePhaseConditionEnumStringify;
	/** @alias exactly */exact?: this["exactly"];
	/** @alias ignoreCase */caseInsensitive?: this["ignoreCase"];
	/** @alias multipleLine */multiline?: this["multipleLine"];
	/** @alias multipleLine */multiLine?: this["multipleLine"];
}
export {
	type RegExpFilterOptions as RegExFilterOptions,
	type RegExpFilterOptions as RegularExpressionFilterOptions
};
/**
 * Filter for `RegExp`.
 */
export class RegExpFilter {
	#status: RegExpFilterStatus = {
		dotAll: ThreePhaseConditionEnum.Neutral,
		exactly: ThreePhaseConditionEnum.Neutral,
		global: ThreePhaseConditionEnum.Neutral,
		ignoreCase: ThreePhaseConditionEnum.Neutral,
		multipleLine: ThreePhaseConditionEnum.Neutral,
		sticky: ThreePhaseConditionEnum.Neutral,
		unicode: ThreePhaseConditionEnum.Neutral
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
	 * @param {ThreePhaseConditionEnum | ThreePhaseConditionEnumStringify} value
	 * @returns {this}
	 */
	dotAll(value: ThreePhaseConditionEnum | ThreePhaseConditionEnumStringify): this {
		this.#status.dotAll = enumResolver<ThreePhaseConditionEnum, ThreePhaseConditionEnumStringify>(ThreePhaseConditionEnum, value, "Filter status `dotAll`");
		return this;
	}
	/**
	 * Whether an exactly `RegExp`.
	 * @param {ThreePhaseConditionEnum | ThreePhaseConditionEnumStringify} value
	 * @returns {this}
	 */
	exactly(value: ThreePhaseConditionEnum | ThreePhaseConditionEnumStringify): this {
		this.#status.exactly = enumResolver<ThreePhaseConditionEnum, ThreePhaseConditionEnumStringify>(ThreePhaseConditionEnum, value, "Filter status `exactly`");
		return this;
	}
	/**
	 * Whether a global `RegExp`.
	 * @param {ThreePhaseConditionEnum | ThreePhaseConditionEnumStringify} value
	 * @returns {this}
	 */
	global(value: ThreePhaseConditionEnum | ThreePhaseConditionEnumStringify): this {
		this.#status.global = enumResolver<ThreePhaseConditionEnum, ThreePhaseConditionEnumStringify>(ThreePhaseConditionEnum, value, "Filter status `global`");
		return this;
	}
	/**
	 * Whether a case insensitive `RegExp`.
	 * @param {ThreePhaseConditionEnum | ThreePhaseConditionEnumStringify} value
	 * @returns {this}
	 */
	ignoreCase(value: ThreePhaseConditionEnum | ThreePhaseConditionEnumStringify): this {
		this.#status.ignoreCase = enumResolver<ThreePhaseConditionEnum, ThreePhaseConditionEnumStringify>(ThreePhaseConditionEnum, value, "Filter status `ignoreCase`");
		return this;
	}
	/**
	 * Whether a multiple line `RegExp`.
	 * @param {ThreePhaseConditionEnum | ThreePhaseConditionEnumStringify} value
	 * @returns {this}
	 */
	multipleLine(value: ThreePhaseConditionEnum | ThreePhaseConditionEnumStringify): this {
		this.#status.multipleLine = enumResolver<ThreePhaseConditionEnum, ThreePhaseConditionEnumStringify>(ThreePhaseConditionEnum, value, "Filter status `multipleLine`");
		return this;
	}
	/**
	 * Whether a sticky `RegExp`.
	 * @param {ThreePhaseConditionEnum | ThreePhaseConditionEnumStringify} value
	 * @returns {this}
	 */
	sticky(value: ThreePhaseConditionEnum | ThreePhaseConditionEnumStringify): this {
		this.#status.sticky = enumResolver<ThreePhaseConditionEnum, ThreePhaseConditionEnumStringify>(ThreePhaseConditionEnum, value, "Filter status `sticky`");
		return this;
	}
	/**
	 * Whether an unicode `RegExp`.
	 * @param {ThreePhaseConditionEnum | ThreePhaseConditionEnumStringify} value
	 * @returns {this}
	 */
	unicode(value: ThreePhaseConditionEnum | ThreePhaseConditionEnumStringify): this {
		this.#status.unicode = enumResolver<ThreePhaseConditionEnum, ThreePhaseConditionEnumStringify>(ThreePhaseConditionEnum, value, "Filter status `unicode`");
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
			(this.#status.dotAll === ThreePhaseConditionEnum.False && item.dotAll) ||
			(this.#status.dotAll === ThreePhaseConditionEnum.True && !item.dotAll) ||
			(this.#status.exactly === ThreePhaseConditionEnum.False && item.source.startsWith("^") && item.source.endsWith("$")) ||
			(this.#status.exactly === ThreePhaseConditionEnum.True && (
				!item.source.startsWith("^") ||
				!item.source.endsWith("$")
			)) ||
			(this.#status.global === ThreePhaseConditionEnum.False && item.global) ||
			(this.#status.global === ThreePhaseConditionEnum.True && !item.global) ||
			(this.#status.ignoreCase === ThreePhaseConditionEnum.False && item.ignoreCase) ||
			(this.#status.ignoreCase === ThreePhaseConditionEnum.True && !item.ignoreCase) ||
			(this.#status.multipleLine === ThreePhaseConditionEnum.False && item.multiline) ||
			(this.#status.multipleLine === ThreePhaseConditionEnum.True && !item.multiline) ||
			(this.#status.sticky === ThreePhaseConditionEnum.False && item.sticky) ||
			(this.#status.sticky === ThreePhaseConditionEnum.True && !item.sticky) ||
			(this.#status.unicode === ThreePhaseConditionEnum.False && item.unicode) ||
			(this.#status.unicode === ThreePhaseConditionEnum.True && !item.unicode)
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
export {
	RegExpFilter as RegExFilter,
	RegExpFilter as RegularExpressionFilter
};
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
	filterRegExp as filterRegularExpression
};
