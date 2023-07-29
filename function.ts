import { types } from "node:util";
/**
 * Determine whether the item is an asynchronous function. This only reports back what the JavaScript engine is seeing; In particular, the return value may not match the original source code if a transpilation tool was used.
 * @param {unknown} item Item that need to determine.
 * @returns {item is (...parameters: unknown[]) => Promise<unknown>} Determine result.
 */
export function isAsyncFunction(item: unknown): item is (...parameters: unknown[]) => Promise<unknown> {
	return (types.isAsyncFunction(item) && !types.isGeneratorFunction(item) && Object.prototype.toString.call(item) === "[object AsyncFunction]");
}
/**
 * Determine whether the item is an asynchronous generator function. This only reports back what the JavaScript engine is seeing; In particular, the return value may not match the original source code if a transpilation tool was used.
 * @param {unknown} item Item that need to determine.
 * @returns {item is AsyncGeneratorFunction} Determine result.
 */
export function isAsyncGeneratorFunction(item: unknown): item is AsyncGeneratorFunction {
	return (types.isAsyncFunction(item) && types.isGeneratorFunction(item) && Object.prototype.toString.call(item) === "[object AsyncGeneratorFunction]");
}
/**
 * Determine whether the item is a synchronous function. This only reports back what the JavaScript engine is seeing; In particular, the return value may not match the original source code if a transpilation tool was used.
 * @param {unknown} item Item that need to determine.
 * @returns {item is (...parameters: unknown[]) => Exclude<unknown, Promise<unknown>>} Determine result.
 */
export function isSyncFunction(item: unknown): item is (...parameters: unknown[]) => Exclude<unknown, Promise<unknown>> {
	return (typeof item === "function" && !types.isAsyncFunction(item) && !types.isGeneratorFunction(item) && Object.prototype.toString.call(item) === "[object Function]");
}
/**
 * Determine whether the item is a synchronous generator function. This only reports back what the JavaScript engine is seeing; In particular, the return value may not match the original source code if a transpilation tool was used.
 * @param {unknown} item Item that need to determine.
 * @returns {item is GeneratorFunction} Determine result.
 */
export function isSyncGeneratorFunction(item: unknown): item is GeneratorFunction {
	return (!types.isAsyncFunction(item) && types.isGeneratorFunction(item) && Object.prototype.toString.call(item) === "[object GeneratorFunction]");
}
export {
	isAsyncFunction as isAsynchronousFunction,
	isAsyncGeneratorFunction as isAsynchronousGeneratorFunction,
	isSyncFunction as isSynchronousFunction,
	isSyncGeneratorFunction as isSynchronousGeneratorFunction
};
