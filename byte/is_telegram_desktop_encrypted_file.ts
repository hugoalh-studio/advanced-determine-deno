import { BytesMatcher } from "./_matcher.ts";
export const bytesMatcherTelegramDesktopEncryptedFile: BytesMatcher = new BytesMatcher("54 44 45 46");
/**
 * **\[EXPERIMENTAL\]** Determine whether the byte is Telegram Desktop Encrypted (`.tdef`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteTelegramDesktopEncryptedFile(item: Uint8Array): boolean {
	return bytesMatcherTelegramDesktopEncryptedFile.test(item);
}
export default isByteTelegramDesktopEncryptedFile;
