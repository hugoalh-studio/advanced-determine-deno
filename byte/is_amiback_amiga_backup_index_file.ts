import { BytesMatcher } from "./_matcher.ts";
export const bytesMatcherAmiBackAmigaBackupIndexFile: BytesMatcher = new BytesMatcher().addExactStartGroupHex(0, "49 4E 44 58").freeze();
/**
 * Determine whether the byte is AmiBack Amiga Backup index file (`.idx`) format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteAmiBackAmigaBackupIndexFile(item: Uint8Array): boolean {
	return bytesMatcherAmiBackAmigaBackupIndexFile.match(item);
}
export default isByteAmiBackAmigaBackupIndexFile;
