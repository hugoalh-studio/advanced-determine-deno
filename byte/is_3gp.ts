import { isByteMatch } from "./_matcher.ts";
/**
 * Determine whether the item is 3GP (3rd Generation Partnership Project) (`.3gp`/`.3g2`) file format.
 * @param {Uint8Array} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isByte3GP(item: Uint8Array): boolean {
	return isByteMatch(item, "66 74 79 70 33 67", 4);
}
export default isByte3GP;
