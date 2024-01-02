import { BytesMatcher } from "./_matcher.ts";
export const bytesMatcherWASM: BytesMatcher = new BytesMatcher("00 61 73 6D");
/**
 * **\[EXPERIMENTAL\]** Determine whether the byte is WebAssembly binary (`.wasm`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteWASM(item: Uint8Array): boolean {
	return bytesMatcherWASM.test(item);
}
export default isByteWASM;
