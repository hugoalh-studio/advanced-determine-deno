import { BytesMatcher } from "./_matcher.ts";
export const bytesMatcherTelegramDesktopEncryptedFile: BytesMatcher = new BytesMatcher().addExactStartGroupHex(0, "54 44 45 46").freeze();
/**
 * Determine whether the byte is Telegram Desktop Encrypted (`.tdef`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteTelegramDesktopEncryptedFile(item: Uint8Array): boolean {
	return bytesMatcherTelegramDesktopEncryptedFile.match(item);
}
export default isByteTelegramDesktopEncryptedFile;
