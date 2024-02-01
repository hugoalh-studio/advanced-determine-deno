import { decodeHex } from "https://deno.land/std@0.214.0/encoding/hex.ts";
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
 * GitHub webhook delivery validator to determine the request whether is from GitHub webhook delivery. For more information, please visit https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries.
 */
export class GitHubWebhookDeliveryValidator {
	#cryptor?: CryptoKey;
	#cryptorDefer?: Promise<CryptoKey>;
	#hasCryptor = false;
	/**
	 * Initialize GitHub webhook delivery validator.
	 * @param {string | Uint8Array} [secret] Secret of the webhook.
	 */
	constructor(secret?: string | Uint8Array) {
		if (typeof secret !== "undefined" && secret.length > 0) {
			this.#hasCryptor = true;
			this.#cryptorDefer = crypto.subtle.importKey("raw", (typeof secret === "string") ? new TextEncoder().encode(secret) : secret, signatureAlgorithm, false, subtleCryptoKeyUsage).catch((reason): never => {
				throw reason;
			});
		}
	}
	/**
	 * Correctly load cryptor.
	 * @access private
	 * @returns {Promise<void>}
	 */
	async #loadCryptor(): Promise<void> {
		if (typeof this.#cryptorDefer !== "undefined") {
			this.#cryptor = await this.#cryptorDefer;
			this.#cryptorDefer = undefined;
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
			if (this.#hasCryptor) {
				throw new ReferenceError(`Request is missing header \`X-Hub-Signature-256\`!`);
			}
			return meta;
		}
		const [signatureAlgorithm, signatureValue, ...rest] = signature256.split("=");
		if (
			signatureAlgorithm !== "sha256" ||
			!regexpSHA256.test(signatureValue) ||
			rest.length > 0
		) {
			throw new SyntaxError(`Signature of the request is not a valid signature syntax!`);
		}
		await this.#loadCryptor();
		if (await crypto.subtle.verify("HMAC", this.#cryptor!, decodeHex(signatureValue), new TextEncoder().encode((inputs.length === 1) ? await inputs[0].clone().text() : inputs[1]))) {
			return meta;
		}
		throw new Error("Request is not from GitHub webhook delivery, signature is not match!");
	}
	/**
	 * Validate the request whether is from GitHub webhook delivery.
	 * @param {Request} request Request.
	 * @returns {Promise<boolean>} Determine result.
	 */
	async isValid(request: Request): Promise<boolean>;
	/**
	 * Validate the request whether is from GitHub webhook delivery.
	 * @param {Headers} requestHeaders Headers of the request.
	 * @param {string} requestPayload Payload of the request.
	 * @returns {Promise<boolean>} Determine result.
	 */
	async isValid(requestHeaders: Headers, requestPayload: string): Promise<boolean>;
	async isValid(...inputs: [request: Request] | [requestHeaders: Headers, requestPayload: string]): Promise<boolean> {
		try {
			//@ts-ignore Overload is correct.
			void await this.resolve(...inputs);
			return true;
		} catch {
			return false;
		}
	}
}
export default GitHubWebhookDeliveryValidator;
