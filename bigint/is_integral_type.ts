import { isNumericIntegralType } from "../numeric/is_integral_type.ts";
/**
 * Determine whether the big integer is in the range of the specify integral type.
 * @param {Parameters<typeof isNumericIntegralType>[0]} typeName Name of the integral numeric type.
 * @param {bigint} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isBigIntIntegralType(typeName: Parameters<typeof isNumericIntegralType>[0], item: bigint): boolean {
	return isNumericIntegralType(typeName, item);
}
export {
	isBigIntIntegralType as isBigIntegerIntegralType
};
export default isBigIntIntegralType;
