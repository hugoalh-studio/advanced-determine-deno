import { BytesMatcher } from "./_matcher.ts";
export const bytesMatcherGIF: BytesMatcher = new BytesMatcher().addExactStartGroupHex(0, "47 49 46 38").addExactStartGroupHex(4, ["37", "39"]).addExactStartGroupHex(5, "61").freeze();
/**
 * **\[EXPERIMENTAL\]** Determine whether the byte is GIF (Graphics Interchange Format) (`.gif`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteGIF(item: Uint8Array): boolean {
	return bytesMatcherGIF.match(item);
}
export default isByteGIF;
