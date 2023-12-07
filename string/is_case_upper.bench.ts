import { isStringCaseUpper } from "./is_case_upper.ts";
Deno.bench("False 1", { permissions: "none" }, () => {
	isStringCaseUpper("Hello, world!");
});
Deno.bench("False 2", { permissions: "none" }, () => {
	isStringCaseUpper("qwerty");
});
Deno.bench("True 1", { permissions: "none" }, () => {
	isStringCaseUpper("QWERTY");
});
