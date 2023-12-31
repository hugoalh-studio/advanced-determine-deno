import { BytesMatcher } from "./_matcher.ts";
const matcher: BytesMatcher = new BytesMatcher().addExactHex(0, "47 49 46 38").addExactHex(4, "37", "39").addExactHex(5, "61");
/**
 * Determine whether the byte is GIF (Graphics Interchange Format) (`.gif`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteGIF(item: Uint8Array): boolean {
	return matcher.match(item);
}
export default isByteGIF;
