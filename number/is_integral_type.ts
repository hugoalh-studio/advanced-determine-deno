import { isNumericIntegralType } from "../numeric/is_integral_type.ts";
/**
 * Determine whether the number is in the range of the specified integral type.
 * @param {Parameters<typeof isNumericIntegralType>[0]} typeName Name of the integral numeric type.
 * @param {number} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isNumberIntegralType(typeName: Parameters<typeof isNumericIntegralType>[0], item: number): boolean {
	return isNumericIntegralType(typeName, item);
}
export default isNumberIntegralType;
