import { isNumericIntegralType } from "./is_integral_type.ts";
Deno.bench("False 1", { permissions: "none" }, () => {
	isNumericIntegralType("Byte", 9876);
});
Deno.bench("True 1", { permissions: "none" }, () => {
	isNumericIntegralType("Byte", 8n);
});
