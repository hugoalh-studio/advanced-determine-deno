import { ObjectMeta } from "./internal/object-meta.ts";
/**
 * @function isObjectPlain
 * @description Whether the object is plain.
 * @param {object} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
function isObjectPlain(item: object): boolean {
	if (
		!(item instanceof Object) ||
		item.constructor.name !== "Object" ||
		Object.prototype.toString.call(item) !== "[object Object]"
	) {
		return false;
	}
	let itemPrototype: unknown = Object.getPrototypeOf(item);
	if (itemPrototype !== null && itemPrototype !== Object.prototype) {
		return false;
	}
	let itemShadow: object = item;
	while (Object.getPrototypeOf(itemShadow) !== null) {
		itemShadow = Object.getPrototypeOf(itemShadow);
	}
	if (itemPrototype !== itemShadow) {
		return false;
	}
	let itemObjectMeta: ObjectMeta = new ObjectMeta(item);
	if (
		Object.entries(item).length !== itemObjectMeta.entriesEnumerable.length ||
		itemObjectMeta.entriesConfigurable.length + itemObjectMeta.entriesNonConfigurable.length !== itemObjectMeta.entriesEnumerable.length + itemObjectMeta.entriesNonEnumerable.length ||
		itemObjectMeta.entriesEnumerable.length + itemObjectMeta.entriesNonEnumerable.length !== itemObjectMeta.entriesGetter.length + itemObjectMeta.entriesNonAccessor.length + itemObjectMeta.entriesSetter.length ||
		itemObjectMeta.entriesGetter.length + itemObjectMeta.entriesNonAccessor.length + itemObjectMeta.entriesSetter.length !== itemObjectMeta.entriesNonWritable.length + itemObjectMeta.entriesWritable.length ||
		itemObjectMeta.entriesConfigurable.length + itemObjectMeta.entriesNonConfigurable.length !== itemObjectMeta.entriesNonWritable.length + itemObjectMeta.entriesWritable.length ||
		itemObjectMeta.entriesNonConfigurable.length > 0 ||
		itemObjectMeta.entriesNonEnumerable.length > 0 ||
		itemObjectMeta.entriesGetter.length > 0 ||
		itemObjectMeta.entriesSetter.length > 0 ||
		itemObjectMeta.entriesNonWritable.length > 0 ||
		itemObjectMeta.keysSymbol.length > 0
	) {
		return false;
	}
	return true;
}
export {
	isObjectPlain
};
