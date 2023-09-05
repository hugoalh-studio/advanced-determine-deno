import { isStringASCII } from "./is_ascii.ts";
Deno.bench("1", { permissions: "none" }, () => {
	isStringASCII("日本語");
});
Deno.bench("2", { permissions: "none" }, () => {
	isStringASCII("Hello, world!");
});
