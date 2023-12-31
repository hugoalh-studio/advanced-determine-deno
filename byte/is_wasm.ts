import { BytesMatcher } from "./_matcher.ts";
const matcher: BytesMatcher = new BytesMatcher().addExactHex(0, "00 61 73 6D");
/**
 * Determine whether the byte is WebAssembly binary (`.wasm`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByteWASM(item: Uint8Array): boolean {
	return matcher.match(item);
}
export default isByteWASM;
