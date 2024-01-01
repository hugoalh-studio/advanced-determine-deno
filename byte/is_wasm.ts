import { BytesMatcher } from "./_matcher.ts";
export const bytesMatcherWASM: BytesMatcher = new BytesMatcher().addExactStartGroupHex(0, "00 61 73 6D").freeze();
/**
 * Determine whether the byte is WebAssembly binary (`.wasm`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteWASM(item: Uint8Array): boolean {
	return bytesMatcherWASM.match(item);
}
export default isByteWASM;
