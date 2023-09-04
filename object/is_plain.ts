/**
 * Determine whether the object is plain.
 * @param {object} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isObjectPlain(item: object): boolean {
	if (
		!(item instanceof Object) ||
		item.constructor.name !== "Object" ||
		Object.prototype.toString.call(item) !== "[object Object]"
	) {
		return false;
	}
	const itemPrototype: unknown = Object.getPrototypeOf(item);
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
	if (Object.getOwnPropertySymbols(item).length > 0) {
		return false;
	}
	const itemEntriesConfigurable: string[] = [];
	const itemEntriesEnumerable: string[] = [];
	const itemEntriesGetter: string[] = [];
	const itemEntriesNonAccessor: string[] = [];
	const itemEntriesNonConfigurable: string[] = [];
	const itemEntriesNonEnumerable: string[] = [];
	const itemEntriesNonWritable: string[] = [];
	const itemEntriesSetter: string[] = [];
	const itemEntriesWritable: string[] = [];
	const itemDescriptors = Object.getOwnPropertyDescriptors(item);
	for (const descriptor in itemDescriptors) {
		if (Object.hasOwn(itemDescriptors, descriptor)) {
			const descriptorProperties: PropertyDescriptor = itemDescriptors[descriptor];
			if (descriptorProperties.configurable) {
				itemEntriesConfigurable.push(descriptor);
			} else {
				itemEntriesNonConfigurable.push(descriptor);
			}
			if (descriptorProperties.enumerable) {
				itemEntriesEnumerable.push(descriptor);
			} else {
				itemEntriesNonEnumerable.push(descriptor);
			}
			if (typeof descriptorProperties.get !== "undefined") {
				itemEntriesGetter.push(descriptor);
			}
			if (typeof descriptorProperties.set !== "undefined") {
				itemEntriesSetter.push(descriptor);
			}
			if (typeof descriptorProperties.get === "undefined" && typeof descriptorProperties.set === "undefined") {
				itemEntriesNonAccessor.push(descriptor);
			}
			if (descriptorProperties.writable) {
				itemEntriesWritable.push(descriptor);
			} else {
				itemEntriesNonWritable.push(descriptor);
			}
		} else {
			return false;
		}
	}
	if (
		Object.entries(item).length !== itemEntriesEnumerable.length ||
		itemEntriesConfigurable.length + itemEntriesNonConfigurable.length !== itemEntriesEnumerable.length + itemEntriesNonEnumerable.length ||
		itemEntriesEnumerable.length + itemEntriesNonEnumerable.length !== itemEntriesGetter.length + itemEntriesNonAccessor.length + itemEntriesSetter.length ||
		itemEntriesGetter.length + itemEntriesNonAccessor.length + itemEntriesSetter.length !== itemEntriesNonWritable.length + itemEntriesWritable.length ||
		itemEntriesConfigurable.length + itemEntriesNonConfigurable.length !== itemEntriesNonWritable.length + itemEntriesWritable.length ||
		itemEntriesNonConfigurable.length > 0 ||
		itemEntriesNonEnumerable.length > 0 ||
		itemEntriesGetter.length > 0 ||
		itemEntriesSetter.length > 0 ||
		itemEntriesNonWritable.length > 0
	) {
		return false;
	}
	return true;
}
