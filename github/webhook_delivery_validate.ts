import { decodeHex } from "https://deno.land/std@0.208.0/encoding/hex.ts";
const algorithm: HmacImportParams = {
	name: "HMAC",
	hash: {
		name: "SHA-256"
	}
};
const keyUsage: KeyUsage[] = ["sign", "verify"];
const regexpSHA256 = /^[\da-f]{64}$/v;
/**
 * Use a webhook secret to validate the webhook delivery whether is from GitHub. For more information, please visit https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries.
 */
export class GitHubWebhookDeliveryValidator {
	#secretCrypto?: CryptoKey;
	#secretCryptoDefer?: Promise<CryptoKey>;
	/**
	 * Initialize GitHub webhook delivery validator.
	 * @param {string | Uint8Array} secret Secret of the webhook.
	 */
	constructor(secret: string | Uint8Array) {
		this.#secretCryptoDefer = crypto.subtle.importKey("raw", (typeof secret === "string") ? new TextEncoder().encode(secret) : secret, algorithm, false, keyUsage).catch((reason): never => {
			throw reason;
		});
	}
	/**
	 * Correctly load secret crypto.
	 * @access private
	 * @returns {Promise<void>}
	 */
	async #secretCryptoLoad(): Promise<void> {
		if (typeof this.#secretCryptoDefer !== "undefined") {
			this.#secretCrypto = await this.#secretCryptoDefer;
			this.#secretCryptoDefer = undefined;
		}
	}
	/**
	 * Validate the webhook delivery whether is from GitHub with detailed error.
	 * @param {Request} request Request of the webhook delivery.
	 * @returns {Promise<boolean | Error>} Determine result.
	 */
	async validateWithError(request: Request): Promise<boolean | Error>;
	/**
	 * Validate the webhook delivery whether is from GitHub with detailed error.
	 * @param {string} payload Payload of the webhook delivery.
	 * @param {string | Headers} signature Signature of the webhook delivery.
	 * @returns {Promise<boolean | Error>} Determine result.
	 */
	async validateWithError(payload: string, signature: string | Headers): Promise<boolean | Error>;
	async validateWithError(...inputs: [request: Request] | [payload: string, signature: string | Headers]): Promise<boolean | Error> {
		let payload: string;
		let signatureInput: string | Headers;
		if (inputs.length === 1) {
			const requestClone: Request = inputs[0].clone();
			payload = await requestClone.text();
			signatureInput = requestClone.headers;
		} else {
			[payload, signatureInput] = inputs;
		}
		let signatureRaw: string;
		if (typeof signatureInput === "string") {
			signatureRaw = signatureInput;
		} else {
			if (signatureInput.get("X-GitHub-Delivery") === null) {
				return new ReferenceError(`Request is missing header \`X-GitHub-Delivery\`!`);
			}
			if (signatureInput.get("X-GitHub-Event") === null) {
				return new ReferenceError(`Request is missing header \`X-GitHub-Event\`!`);
			}
			const signatureHeaderValue: string | null = signatureInput.get("X-Hub-Signature-256");
			if (signatureHeaderValue === null) {
				return new ReferenceError(`Request is missing header \`X-Hub-Signature-256\`!`);
			}
			signatureRaw = signatureHeaderValue;
		}
		const [signatureAlgorithm, signatureValue] = (signatureRaw.search("=") === -1) ? [undefined, signatureRaw] : signatureRaw.split("=");
		if (typeof signatureAlgorithm !== "undefined" && signatureAlgorithm !== "sha256") {
			return new SyntaxError(`Signature is not using algorithm SHA-256!`);
		}
		if (!regexpSHA256.test(signatureValue)) {
			return new SyntaxError(`Signature is not a valid SHA-256!`);
		}
		await this.#secretCryptoLoad();
		return crypto.subtle.verify("HMAC", this.#secretCrypto!, decodeHex(signatureValue), new TextEncoder().encode(payload));
	}
	/**
	 * Validate the webhook delivery whether is from GitHub.
	 * @param {Request} request Request of the webhook delivery.
	 * @returns {Promise<boolean>} Determine result.
	 */
	async validate(request: Request): Promise<boolean>;
	/**
	 * Validate the webhook delivery whether is from GitHub.
	 * @param {string} payload Payload of the webhook delivery.
	 * @param {string | Headers} signature Signature of the webhook delivery.
	 * @returns {Promise<boolean>} Determine result.
	 */
	async validate(payload: string, signature: string | Headers): Promise<boolean>;
	async validate(...inputs: [request: Request] | [payload: string, signature: string | Headers]): Promise<boolean> {
		//@ts-ignore Overload is correct.
		const result: boolean | Error = await this.validateWithError(...inputs);
		if (typeof result !== "boolean") {
			throw result;
		}
		return result;
	}
	/**
	 * Validate the webhook delivery whether is from GitHub with detailed error.
	 * @param {string | Uint8Array} secret Secret of the webhook.
	 * @param {Request} request Request of the webhook delivery.
	 * @returns {Promise<boolean | Error>} Determine result.
	 */
	static validateWithError(secret: string | Uint8Array, request: Request): Promise<boolean | Error>;
	/**
	 * Validate the webhook delivery whether is from GitHub with detailed error.
	 * @param {string | Uint8Array} secret Secret of the webhook.
	 * @param {string} payload Payload of the webhook delivery.
	 * @param {string | Headers} signature Signature of the webhook delivery.
	 * @returns {Promise<boolean | Error>} Determine result.
	 */
	static validateWithError(secret: string | Uint8Array, payload: string, signature: string | Headers): Promise<boolean | Error>;
	static validateWithError(secret: string | Uint8Array, ...inputs: [Request] | [payload: string, signature: string | Headers]): Promise<boolean | Error> {
		//@ts-ignore Overload is correct.
		return new this(secret).validateWithError(...inputs);
	}
	/**
	 * Validate the webhook delivery whether is from GitHub with detailed error.
	 * @param {string | Uint8Array} secret Secret of the webhook.
	 * @param {Request} request Request of the webhook delivery.
	 * @returns {Promise<boolean>} Determine result.
	 */
	static validate(secret: string | Uint8Array, request: Request): Promise<boolean>;
	/**
	 * Validate the webhook delivery whether is from GitHub with detailed error.
	 * @param {string | Uint8Array} secret Secret of the webhook.
	 * @param {string} payload Payload of the webhook delivery.
	 * @param {string | Headers} signature Signature of the webhook delivery.
	 * @returns {Promise<boolean>} Determine result.
	 */
	static validate(secret: string | Uint8Array, payload: string, signature: string | Headers): Promise<boolean>;
	static validate(secret: string | Uint8Array, ...inputs: [Request] | [payload: string, signature: string | Headers]): Promise<boolean> {
		//@ts-ignore Overload is correct.
		return new this(secret).validate(...inputs);
	}
}
export default GitHubWebhookDeliveryValidator;
/**
 * Validate the webhook delivery whether is from GitHub with detailed error.
 * @param {string | Uint8Array} secret Secret of the webhook.
 * @param {Request} request Request of the webhook delivery.
 * @returns {Promise<boolean | Error>} Determine result.
 */
export function validateGitHubWebhookDeliveryWithError(secret: string | Uint8Array, request: Request): Promise<boolean | Error>;
/**
 * Validate the webhook delivery whether is from GitHub with detailed error.
 * @param {string | Uint8Array} secret Secret of the webhook.
 * @param {string} payload Payload of the webhook delivery.
 * @param {string | Headers} signature Signature of the webhook delivery.
 * @returns {Promise<boolean | Error>} Determine result.
 */
export function validateGitHubWebhookDeliveryWithError(secret: string | Uint8Array, payload: string, signature: string | Headers): Promise<boolean | Error>;
export function validateGitHubWebhookDeliveryWithError(secret: string | Uint8Array, ...inputs: [Request] | [payload: string, signature: string | Headers]): Promise<boolean | Error> {
	//@ts-ignore Overload is correct.
	return new GitHubWebhookDeliveryValidator(secret).validateWithError(...inputs);
}
/**
 * Validate the webhook delivery whether is from GitHub with detailed error.
 * @param {string | Uint8Array} secret Secret of the webhook.
 * @param {Request} request Request of the webhook delivery.
 * @returns {Promise<boolean>} Determine result.
 */
export function validateGitHubWebhookDelivery(secret: string | Uint8Array, request: Request): Promise<boolean>;
/**
 * Validate the webhook delivery whether is from GitHub with detailed error.
 * @param {string | Uint8Array} secret Secret of the webhook.
 * @param {string} payload Payload of the webhook delivery.
 * @param {string | Headers} signature Signature of the webhook delivery.
 * @returns {Promise<boolean>} Determine result.
 */
export function validateGitHubWebhookDelivery(secret: string | Uint8Array, payload: string, signature: string | Headers): Promise<boolean>;
export function validateGitHubWebhookDelivery(secret: string | Uint8Array, ...inputs: [Request] | [payload: string, signature: string | Headers]): Promise<boolean> {
	//@ts-ignore Overload is correct.
	return new GitHubWebhookDeliveryValidator(secret).validate(...inputs);
}
