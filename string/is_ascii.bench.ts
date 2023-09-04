import { isStringASCII } from "./is_ascii.ts";
Deno.bench("1", () => {
	isStringASCII("日本語");
});
Deno.bench("2", () => {
	isStringASCII("Hello, world!");
});
