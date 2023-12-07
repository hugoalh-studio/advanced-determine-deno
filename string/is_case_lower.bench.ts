import { isStringCaseLower } from "./is_case_lower.ts";
Deno.bench("False 1", { permissions: "none" }, () => {
	isStringCaseLower("Hello, world!");
});
Deno.bench("True 1", { permissions: "none" }, () => {
	isStringCaseLower("qwerty");
});
