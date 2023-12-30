import { isByteMatch } from "./_matcher.ts";
/**
 * Determine whether the byte is AmiBack Amiga Backup index file (`.idx`) format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteAmiBackAmigaBackupIndexFile(item: Uint8Array): boolean {
	return isByteMatch(item, "49 4E 44 58");
}
export default isByteAmiBackAmigaBackupIndexFile;
