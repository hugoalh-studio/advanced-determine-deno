import { uniqueArray } from "https://deno.land/x/unique_array@v1.0.14/mod.ts";
const regexpHexBytesSignature = /^[\dA-F]{2}(?: [\dA-F]{2})*$/v;
interface BytesMatcherExact {
	length: number;
	signatures: Uint8Array[];
}
interface BytesMatcherExactEnd extends BytesMatcherExact {
	ends: number[];
}
interface BytesMatcherExactStart extends BytesMatcherExact {
	starts: number[];
}
function resolveSignatures(signatures: string | Uint8Array | (string | Uint8Array)[]): BytesMatcherExact {
	const resolve: Uint8Array[] = (Array.isArray(signatures) ? signatures : [signatures]).map((signature: string | Uint8Array): Uint8Array => {
		if (signature instanceof Uint8Array) {
			return signature;
		}
		if (!regexpHexBytesSignature.test(signature)) {
			throw new SyntaxError(`\`${signature}\` is not a valid hex!`);
		}
		return Uint8Array.of(...signature.split(" ").map((byte: string): number => {
			return Number.parseInt(byte, 16);
		}));
	});
	const lengths: number[] = resolve.map((signature: Uint8Array): number => {
		return signature.length;
	});
	if (
		lengths.includes(0) ||
		uniqueArray(lengths).length !== 1
	) {
		throw new SyntaxError(`{${lengths.join(" || ")}} is not a valid signatures group!`);
	}
	return {
		length: lengths[0],
		signatures: resolve
	};
}
export class BytesMatcher {
	#exactsEnd: BytesMatcherExactEnd[] = [];
	#exactsStart: BytesMatcherExactStart[] = [];
	#freeze = false;
	#checkFreeze(): void {
		if (this.#freeze) {
			throw new Error(`This matcher is not modifiable!`);
		}
	}
	addExactEndGroupHex(ends: number | number[], signatures: string | Uint8Array | (string | Uint8Array)[]): this {
		this.#checkFreeze();
		this.#exactsEnd.push({
			...resolveSignatures(signatures),
			ends: Array.isArray(ends) ? ends : [ends]
		});
		return this;
	}
	addExactEndGroupText(ends: number | number[], signatures: string | string[]): this {
		return this.addExactEndGroupHex(ends, (Array.isArray(signatures) ? signatures : [signatures]).map((signature: string): Uint8Array => {
			return new TextEncoder().encode(signature);
		}));
	}
	addExactStartGroupHex(starts: number | number[], signatures: string | Uint8Array | (string | Uint8Array)[]): this {
		this.#checkFreeze();
		this.#exactsStart.push({
			...resolveSignatures(signatures),
			starts: Array.isArray(starts) ? starts : [starts]
		});
		return this;
	}
	addExactStartGroupText(starts: number | number[], signatures: string | string[]): this {
		return this.addExactStartGroupHex(starts, (Array.isArray(signatures) ? signatures : [signatures]).map((signature: string): Uint8Array => {
			return new TextEncoder().encode(signature);
		}));
	}
	freeze(): this {
		this.#freeze = true;
		return this;
	}
	match(source: Uint8Array): boolean {
		for (const { ends, length, signatures } of this.#exactsEnd) {
			if (!ends.some((end: number): boolean => {
				const sourceSection: Uint8Array = source.slice(source.length - end, source.length - end + length);
				if (sourceSection.length !== length) {
					return false;
				}
				return signatures.some((signature: Uint8Array): boolean => {
					return signature.every((byte: number, index: number): boolean => {
						return (sourceSection[index] === byte);
					});
				});
			})) {
				return false;
			}
		}
		for (const { length, signatures, starts } of this.#exactsStart) {
			if (!starts.some((start: number): boolean => {
				const sourceSection: Uint8Array = source.slice(start, start + length);
				if (sourceSection.length !== length) {
					return false;
				}
				return signatures.some((signature: Uint8Array): boolean => {
					return signature.every((byte: number, index: number): boolean => {
						return (sourceSection[index] === byte);
					});
				});
			})) {
				return false;
			}
		}
		return true;
	}
}
