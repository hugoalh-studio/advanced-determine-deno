import { isByteMatch } from "./_matcher.ts";
/**
 * Determine whether the item is Telegram Desktop (`.tdf$`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteTelegramDesktopFile(item: Uint8Array): boolean {
	return isByteMatch(item, "54 44 46 24");
}
export default isByteTelegramDesktopFile;
