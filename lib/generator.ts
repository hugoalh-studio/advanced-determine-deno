import { types } from "node:util";
/**
 * @function isAsyncGenerator
 * @description Whether the item is an asynchronous generator. This only reports back what the JavaScript engine is seeing; In particular, the return value may not match the original source code if a transpilation tool was used.
 * @param {unknown} item Item that need to determine.
 * @returns {item is AsyncGenerator<unknown, unknown, unknown>} Determine result.
 */
function isAsyncGenerator(item: unknown): item is AsyncGenerator<unknown, unknown, unknown> {
	return (types.isGeneratorObject(item) && Object.prototype.toString.call(item) === "[object AsyncGenerator]");
}
/**
 * @function isSyncGenerator
 * @description Whether the item is a synchronous generator. This only reports back what the JavaScript engine is seeing; In particular, the return value may not match the original source code if a transpilation tool was used.
 * @param {unknown} item Item that need to determine.
 * @returns {item is Generator<unknown, unknown, unknown>} Determine result.
 */
function isSyncGenerator(item: unknown): item is Generator<unknown, unknown, unknown> {
	return (types.isGeneratorObject(item) && Object.prototype.toString.call(item) === "[object Generator]");
}
export {
	isAsyncGenerator,
	isAsyncGenerator as isAsynchronousGenerator,
	isSyncGenerator,
	isSyncGenerator as isSynchronousGenerator
};
