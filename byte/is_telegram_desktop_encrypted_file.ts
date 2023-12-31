import { BytesMatcher } from "./_matcher.ts";
const matcher: BytesMatcher = new BytesMatcher().addExactHex(0, "54 44 45 46");
/**
 * Determine whether the byte is Telegram Desktop Encrypted (`.tdef`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteTelegramDesktopEncryptedFile(item: Uint8Array): boolean {
	return matcher.match(item);
}
export default isByteTelegramDesktopEncryptedFile;
