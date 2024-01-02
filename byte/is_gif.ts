import { BytesMatcher } from "./_matcher.ts";
export const bytesMatcherGIF: BytesMatcher = new BytesMatcher("47 49 46 38", {
	offset: 4,
	pattern: ["37", "39"]
}, {
	offset: 5,
	pattern: "61"
});
/**
 * **\[EXPERIMENTAL\]** Determine whether the byte is GIF (Graphics Interchange Format) (`.gif`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteGIF(item: Uint8Array): boolean {
	return bytesMatcherGIF.test(item);
}
export default isByteGIF;
