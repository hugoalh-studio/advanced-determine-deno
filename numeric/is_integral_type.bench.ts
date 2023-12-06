import { isNumericIntegralType } from "./is_integral_type.ts";
Deno.bench("1", { permissions: "none" }, () => {
	isNumericIntegralType("Byte", 9876);
});
Deno.bench("2", { permissions: "none" }, () => {
	isNumericIntegralType("Byte", 8n);
});
