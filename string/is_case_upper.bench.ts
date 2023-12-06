import { isStringCaseUpper } from "./is_case_upper.ts";
Deno.bench("1", { permissions: "none" }, () => {
	isStringCaseUpper("Hello, world!");
});
Deno.bench("2", { permissions: "none" }, () => {
	isStringCaseUpper("qwerty");
});
Deno.bench("3", { permissions: "none" }, () => {
	isStringCaseUpper("QWERTY");
});
