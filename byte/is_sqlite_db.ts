import { isByteMatch } from "./_matcher.ts";
/**
 * Determine whether the item is SQLite Database (`.db`/`.sqlite`/`.sqlitedb`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteSQLiteDB(item: Uint8Array): boolean {
	return isByteMatch(item, ["53 51 4C 69 74 65 20 66 6F 72 6D 61 74 20 33 00"]);
}
export default isByteSQLiteDB;
