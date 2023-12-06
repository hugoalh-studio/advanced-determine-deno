import { isStringCaseLower } from "./is_case_lower.ts";
Deno.bench("1", { permissions: "none" }, () => {
	isStringCaseLower("Hello, world!");
});
Deno.bench("2", { permissions: "none" }, () => {
	isStringCaseLower("qwerty");
});
