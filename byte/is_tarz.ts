import { BytesMatcher } from "./_matcher.ts";
export const bytesMatcherTarZLZH: BytesMatcher = new BytesMatcher("1F A0");
export const bytesMatcherTarZLZW: BytesMatcher = new BytesMatcher("1F 9D");
/**
 * **\[EXPERIMENTAL\]** Determine whether the byte is Tar Zip (`.tar.z`/`.z`) file format using LZH algorithm.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteTarZLZH(item: Uint8Array): boolean {
	return bytesMatcherTarZLZH.test(item);
}
/**
 * **\[EXPERIMENTAL\]** Determine whether the byte is Tar Zip (`.tar.z`/`.z`) file format using Lempel-Ziv-Welch algorithm.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteTarZLZW(item: Uint8Array): boolean {
	return bytesMatcherTarZLZW.test(item);
}
/**
 * **\[EXPERIMENTAL\]** Determine whether the byte is Tar Zip (`.tar.z`/`.z`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteTarZ(item: Uint8Array): boolean {
	return (
		isByteTarZLZH(item) ||
		isByteTarZLZW(item)
	);
}
export default isByteTarZ;
