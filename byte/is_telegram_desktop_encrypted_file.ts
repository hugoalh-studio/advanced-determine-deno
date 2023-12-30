import { isByteMatch } from "./_matcher.ts";
/**
 * Determine whether the byte is Telegram Desktop Encrypted (`.tdef`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteTelegramDesktopEncryptedFile(item: Uint8Array): boolean {
	return isByteMatch(item, "54 44 45 46");
}
export default isByteTelegramDesktopEncryptedFile;
