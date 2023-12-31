import { BytesMatcher } from "./_matcher.ts";
const matcher: BytesMatcher = new BytesMatcher().addExactHex(0, "54 44 46 24");
/**
 * Determine whether the byte is Telegram Desktop (`.tdf$`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteTelegramDesktopFile(item: Uint8Array): boolean {
	return matcher.match(item);
}
export default isByteTelegramDesktopFile;
