const regexpEnvCIDisable = /^false$/iv;
/**
 * Determine whether this process is in CI (Continuous Integration) mode.
 * 
 * **Require Permission:**
 * - Environment (`allow-env`): All
 * @returns {boolean} Determine result.
 */
export function isEnvironmentCI(): boolean {
	const envCI: string | undefined = Deno.env.get("CI");
	return (
		(typeof envCI !== "undefined" && !regexpEnvCIDisable.test(envCI) && envCI !== "0") ||
		Deno.env.has("CONTINUOUS_INTEGRATION") ||
		Object.keys(Deno.env.toObject()).some((key: string): boolean => {
			return key.startsWith("CI_");
		})
	);
}
export default isEnvironmentCI;
