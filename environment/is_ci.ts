/**
 * Determine whether this process is in CI (Continuous Integration) mode.
 * 
 * **Require Permission:**
 * - **Environment (`allow-env`):** *All*
 * @returns {boolean} Determine result.
 */
export function isEnvironmentCI(): boolean {
	const envCI: string | undefined = Deno.env.get("CI");
	return (
		(typeof envCI !== "undefined" && !/^false$/iu.test(envCI) && envCI !== "0") ||
		typeof Deno.env.get("CONTINUOUS_INTEGRATION") !== "undefined" ||
		Object.keys(Deno.env.toObject()).some((key: string): boolean => {
			return key.startsWith("CI_");
		})
	);
}
export default isEnvironmentCI;
