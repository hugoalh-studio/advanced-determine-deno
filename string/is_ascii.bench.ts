import { isStringASCII } from "./is_ascii.ts";
Deno.bench("1", { permissions: "none" }, () => {
	isStringASCII("日本語");
});
Deno.bench("2", { permissions: "none" }, () => {
	isStringASCII("👀");
});
Deno.bench("3", { permissions: "none" }, () => {
	isStringASCII("Hello, world!");
});
Deno.bench("4", { permissions: "none" }, () => {
	isStringASCII("");
});
