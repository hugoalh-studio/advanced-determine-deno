import { assertEquals } from "https://deno.land/std@0.208.0/assert/assert_equals.ts";
import { GitHubWebhookDeliveryValidator } from "./webhook_delivery_validate.ts";
Deno.test("False 1", { permissions: "none" }, async () => {
	assertEquals(await new GitHubWebhookDeliveryValidator("It's a Secret to Everybody!").validateWithError("Hello, World!", "sha256=757107ea0eb2509fc211221cce984b8a37570b6d7586c22c46f4379c8b043e17"), false);
});
Deno.test("True 1", { permissions: "none" }, async () => {
	assertEquals(await new GitHubWebhookDeliveryValidator("It's a Secret to Everybody").validateWithError("Hello, World!", "sha256=757107ea0eb2509fc211221cce984b8a37570b6d7586c22c46f4379c8b043e17"), true);
});
