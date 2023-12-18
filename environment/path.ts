import { splitEnvironmentValue } from "./_split_environment_value.ts";
/**
 * Get PATHs.
 * 
 * **Require Permission:**
 * - Environment (`allow-env`):
 *   - `PATH`
 * @returns {string[]}
 */
export function getEnvironmentPaths(): string[] {
	return splitEnvironmentValue(Deno.env.get("PATH") ?? "");
}
export default getEnvironmentPaths;
