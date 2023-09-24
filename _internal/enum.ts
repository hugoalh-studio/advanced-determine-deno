/**
 * @template {unknown} O
 * @template {unknown} K
 * @param {object} enumObject
 * @returns {Set<K>}
 */
export function enumGetKeys<O, K>(enumObject: object): Set<K> {
	return new Set(Object.keys(enumObject).sort()) as Set<K>;
}
/**
 * @template {unknown} O
 * @template {unknown} K
 * @template {unknown} V
 * @param {object} enumObject
 * @param {O | K} input
 * @returns {V | undefined}
 */
export function enumResolve<O, K, V>(enumObject: object, input: O | K): V | undefined {
	if (Object.values(enumObject).includes(input)) {
		return input as V;
	}
	try {
		return (enumObject as Record<string, string>)[input as string] as V;
	} catch {
		return undefined;
	}
}
