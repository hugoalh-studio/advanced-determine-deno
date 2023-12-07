import { isStringASCII } from "./is_ascii.ts";
Deno.bench("False 1", { permissions: "none" }, () => {
	isStringASCII("日本語");
});
Deno.bench("False 2", { permissions: "none" }, () => {
	isStringASCII("👀");
});
Deno.bench("True 1", { permissions: "none" }, () => {
	isStringASCII("Hello, world!");
});
Deno.bench("True 2", { permissions: "none" }, () => {
	isStringASCII("");
});
