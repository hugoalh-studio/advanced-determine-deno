import { GitHubWebhookDeliveryValidator } from "./webhook_delivery.ts";
const sample1 = new Headers({
	"Content-Type": "application/json",
	"X-GitHub-Delivery": "",
	"X-GitHub-Event": "ping",
	"X-Hub-Signature-256": "sha256=757107ea0eb2509fc211221cce984b8a37570b6d7586c22c46f4379c8b043e17"
});
Deno.bench("False 1", { permissions: "none" }, async () => {
	await new GitHubWebhookDeliveryValidator("It's a Secret to Everybody!").isValid(sample1, "Hello, World!");
});
Deno.bench("True 1", { permissions: "none" }, async () => {
	await new GitHubWebhookDeliveryValidator("It's a Secret to Everybody").isValid(sample1, "Hello, World!");
});
