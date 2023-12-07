import { isNumericPrime } from "./is_prime.ts";
Deno.bench("Number False 1", { permissions: "none" }, () => {
	isNumericPrime(9876);
});
Deno.bench("BigInteger False 1", { permissions: "none" }, () => {
	isNumericPrime(8n);
});
Deno.bench("Number True 1", { permissions: "none" }, () => {
	isNumericPrime(17);
});
Deno.bench("BigInteger True 1", { permissions: "none" }, () => {
	isNumericPrime(23n);
});
