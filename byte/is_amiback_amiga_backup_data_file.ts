import { BytesMatcher } from "./_matcher.ts";
export const bytesMatcherAmiBackAmigaBackupDataFile: BytesMatcher = new BytesMatcher("42 41 43 4B 4D 49 4B 45 44 49 53 4B");
/**
 * **\[EXPERIMENTAL\]** Determine whether the byte is AmiBack Amiga Backup data file (`.bac`) format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteAmiBackAmigaBackupDataFile(item: Uint8Array): boolean {
	return bytesMatcherAmiBackAmigaBackupDataFile.test(item);
}
export default isByteAmiBackAmigaBackupDataFile;
