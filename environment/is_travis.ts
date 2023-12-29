/**
 * Determine whether this process is inside Travis.
 * 
 * **Require Permission:**
 * - Environment (`allow-env`):
 *   - `CI`
 *   - `TRAVIS`
 * @returns {boolean} Determine result.
 */
export function isEnvironmentTravis(): boolean {
	return (Deno.env.has("CI") && Deno.env.has("TRAVIS"));
}
export default isEnvironmentTravis;
