import { decodeHex } from "https://deno.land/std@0.208.0/encoding/hex.ts";
const signatureAlgorithm: HmacImportParams = {
	name: "HMAC",
	hash: {
		name: "SHA-256"
	}
};
const subtleCryptoKeyUsage: KeyUsage[] = ["sign", "verify"];
const regexpSHA256 = /^[\da-f]{64}$/v;
/**
 * Meta of the GitHub webhook delivery.
 */
export interface GitHubWebhookDeliveryMeta {
	/**
	 * Event of the GitHub webhook delivery.
	 */
	event: string;
	/**
	 * ID of the GitHub webhook delivery.
	 */
	id: string;
}
/**
 * Determine the request whether is from GitHub webhook delivery. For more information, please visit https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries.
 */
export class GitHubWebhookDeliveryValidator {
	#secretCrypto?: CryptoKey;
	#secretCryptoDefer?: Promise<CryptoKey>;
	/**
	 * Initialize GitHub webhook delivery validator.
	 * @param {string | Uint8Array} [secret] Secret of the webhook.
	 */
	constructor(secret?: string | Uint8Array) {
		if (typeof secret !== "undefined" && secret.length > 0) {
			this.#secretCryptoDefer = crypto.subtle.importKey("raw", (typeof secret === "string") ? new TextEncoder().encode(secret) : secret, signatureAlgorithm, false, subtleCryptoKeyUsage).catch((reason): never => {
				throw reason;
			});
		}
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
	 * Resolve the request whether is from GitHub webhook delivery.
	 * @param {Request} request Request.
	 * @returns {Promise<GitHubWebhookDeliveryMeta>} Meta of the GitHub webhook delivery.
	 */
	async resolve(request: Request): Promise<GitHubWebhookDeliveryMeta>;
	/**
	 * Resolve the request whether is from GitHub webhook delivery.
	 * @param {Headers} requestHeaders Headers of the request.
	 * @param {string} requestPayload Payload of the request.
	 * @returns {Promise<GitHubWebhookDeliveryMeta>} Meta of the GitHub webhook delivery.
	 */
	async resolve(requestHeaders: Headers, requestPayload: string): Promise<GitHubWebhookDeliveryMeta>;
	async resolve(...inputs: [request: Request] | [requestHeaders: Headers, requestPayload: string]): Promise<GitHubWebhookDeliveryMeta> {
		await this.#secretCryptoLoad();
		const headers: Headers = (inputs.length === 1) ? inputs[0].headers : inputs[0];
		const contentType: string | null = headers.get("Content-Type");
		if (contentType === null) {
			throw new ReferenceError(`Request is missing header \`Content-Type\`!`);
		}
		if (!contentType.startsWith("application/json")) {
			throw new Error(`Content type of the request is not a supported HTTP content type!`);
		}
		const event: string | null = headers.get("X-GitHub-Event");
		if (event === null) {
			throw new ReferenceError(`Request is missing header \`X-GitHub-Event\`!`);
		}
		const id: string | null = headers.get("X-GitHub-Delivery");
		if (id === null) {
			throw new ReferenceError(`Request is missing header \`X-GitHub-Delivery\`!`);
		}
		const meta: GitHubWebhookDeliveryMeta = { event, id };
		const signature256: string | null = headers.get("X-Hub-Signature-256");
		if (signature256 === null) {
			if (typeof this.#secretCrypto === "undefined") {
				return meta;
			}
			throw new ReferenceError(`Request is missing header \`X-Hub-Signature-256\`!`);
		}
		const [signatureAlgorithm, signatureValue, ...rest] = signature256.split("=");
		if (
			signatureAlgorithm !== "sha256" ||
			!regexpSHA256.test(signatureValue) ||
			rest.length > 0
		) {
			throw new SyntaxError(`Signature of the request is not a valid signature syntax!`);
		}
		if (await crypto.subtle.verify("HMAC", this.#secretCrypto!, decodeHex(signatureValue), new TextEncoder().encode((inputs.length === 1) ? await inputs[0].clone().text() : inputs[1]))) {
			return meta;
		}
		throw new Error("Request is not from GitHub webhook delivery, signature is not match!");
	}
	/**
	 * Validate the request whether is from GitHub webhook delivery.
	 * @param {Request} request Request.
	 * @returns {Promise<boolean | Error>} Determine result.
	 */
	async isValid(request: Request): Promise<boolean | Error>;
	/**
	 * Validate the request whether is from GitHub webhook delivery.
	 * @param {Headers} requestHeaders Headers of the request.
	 * @param {string} requestPayload Payload of the request.
	 * @returns {Promise<boolean | Error>} Determine result.
	 */
	async isValid(requestHeaders: Headers, requestPayload: string): Promise<boolean | Error>;
	async isValid(...inputs: [request: Request] | [requestHeaders: Headers, requestPayload: string]): Promise<boolean | Error> {
		try {
			//@ts-ignore Overload is correct.
			void await this.resolve(...inputs);
			return true;
		} catch (error) {
			if (error instanceof Error && error.name === "Error" && error.message === "Request is not from GitHub webhook delivery, signature is not match!") {
				return false;
			}
			return error;
		}
	}
}
export default GitHubWebhookDeliveryValidator;
