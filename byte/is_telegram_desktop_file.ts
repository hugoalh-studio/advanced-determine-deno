import { BytesMatcher } from "./_matcher.ts";
export const bytesMatcherTelegramDesktopFile: BytesMatcher = new BytesMatcher("54 44 46 24");
/**
 * **\[EXPERIMENTAL\]** Determine whether the byte is Telegram Desktop (`.tdf$`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteTelegramDesktopFile(item: Uint8Array): boolean {
	return bytesMatcherTelegramDesktopFile.test(item);
}
export default isByteTelegramDesktopFile;
