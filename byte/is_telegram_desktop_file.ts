import { BytesMatcher } from "./_matcher.ts";
export const bytesMatcherTelegramDesktopFile: BytesMatcher = new BytesMatcher().addExactGroupHex(0, "54 44 46 24").freeze();
/**
 * Determine whether the byte is Telegram Desktop (`.tdf$`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteTelegramDesktopFile(item: Uint8Array): boolean {
	return bytesMatcherTelegramDesktopFile.match(item);
}
export default isByteTelegramDesktopFile;
