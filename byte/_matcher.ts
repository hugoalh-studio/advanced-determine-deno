const regexpHexBytesSignature = /^[\dA-F]{2}(?: [\dA-F]{2})*$/v;
function checkStartValue(start: number): void {
	if (!(Number.isSafeInteger(start) && start >= 0)) {
		throw new RangeError(`Argument \`start\` is not a number which is integer, positive, and safe!`);
	}
}
export interface BytesMatcherExact {
	length: number;
	signatures: Uint8Array[];
	start: number;
}
export interface BytesMatcherInvalidSyntaxDetail {
	actual: Uint8Array;
	expect: Uint8Array[];
	start: number;
}
export class BytesMatcher {
	#exacts: BytesMatcherExact[] = [];
	#freeze = false;
	addExactGroupHex(start: number, ...signatures: (string | Uint8Array)[]): this {
		if (this.#freeze) {
			throw new Error(`This matcher is not modifiable!`);
		}
		checkStartValue(start);
		const signaturesResolve: Uint8Array[] = signatures.map((signature: string | Uint8Array): Uint8Array => {
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
		const signaturesLength: number[] = signaturesResolve.map((signature: Uint8Array): number => {
			return signature.length;
		});
		if (signaturesLength.includes(0)) {
			throw new SyntaxError(`Some of the signatures are empty: {${signaturesLength.join(", ")}}`);
		}
		if (new Set<number>(signaturesLength).size !== 1) {
			throw new SyntaxError(`Lengths in the signatures group are not equivalent: {${signaturesLength.join(", ")}}`);
		}
		this.#exacts.push({
			length: start + signaturesLength[0],
			signatures: signaturesResolve,
			start
		});
		return this;
	}
	addExactGroupText(start: number, ...signatures: string[]): this {
		return this.addExactGroupHex(start, ...signatures.map((signature: string): Uint8Array => {
			return new TextEncoder().encode(signature);
		}));
	}
	freeze(): this {
		this.#freeze = true;
		return this;
	}
	matchDetail(source: Uint8Array): BytesMatcherInvalidSyntaxDetail[] {
		const errors: BytesMatcherInvalidSyntaxDetail[] = [];
		this.#exacts.forEach(({ length, signatures, start }: BytesMatcherExact): void => {
			const sourceSection: Uint8Array = source.slice(start, start + length);
			if (!signatures.some((signature: Uint8Array): boolean => {
				if (sourceSection.length !== signature.length) {
					return false;
				}
				return signature.every((byte: number, index: number): boolean => {
					return (sourceSection[index] === byte);
				});
			})) {
				errors.push({
					actual: new Uint8Array(sourceSection),
					expect: signatures.map((signature: Uint8Array): Uint8Array => {
						return new Uint8Array(signature);
					}),
					start
				});
			}
		});
		return errors.sort((a: BytesMatcherInvalidSyntaxDetail, b: BytesMatcherInvalidSyntaxDetail): number => {
			return (a.start - b.start);
		});
	}
	match(source: Uint8Array): boolean {
		return (this.matchDetail(source).length === 0);
	}
}
