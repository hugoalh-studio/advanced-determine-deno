import { isNumericPrime } from "./is_prime.ts";
Deno.bench("Number 1", { permissions: "none" }, () => {
	isNumericPrime(9876);
});
Deno.bench("BigInteger 1", { permissions: "none" }, () => {
	isNumericPrime(8n);
});
Deno.bench("Number 2", { permissions: "none" }, () => {
	isNumericPrime(17);
});
Deno.bench("BigInteger 2", { permissions: "none" }, () => {
	isNumericPrime(23n);
});
