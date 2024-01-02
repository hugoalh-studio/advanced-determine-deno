import { BytesMatcher } from "./_matcher.ts";
export const bytesMatcherAmiBackAmigaBackupIndexFile: BytesMatcher = new BytesMatcher("49 4E 44 58");
/**
 * **\[EXPERIMENTAL\]** Determine whether the byte is AmiBack Amiga Backup index file (`.idx`) format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteAmiBackAmigaBackupIndexFile(item: Uint8Array): boolean {
	return bytesMatcherAmiBackAmigaBackupIndexFile.test(item);
}
export default isByteAmiBackAmigaBackupIndexFile;
