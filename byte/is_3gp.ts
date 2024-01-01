import { BytesMatcher } from "./_matcher.ts";
export const bytesMatcher3gp: BytesMatcher = new BytesMatcher().addExactGroupHex(4, "66 74 79 70 33 67").freeze();
/**
 * Determine whether the byte is 3GP (3rd Generation Partnership Project) (`.3gp`/`.3g2`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByte3GP(item: Uint8Array): boolean {
	return bytesMatcher3gp.match(item);
}
export default isByte3GP;
