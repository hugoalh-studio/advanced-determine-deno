/**
 * Determine whether this process is inside Heroku.
 * 
 * **Require Permission:**
 * - Environment (`allow-env`):
 *   - `DYNO`
 *   - `HEROKU`
 *   - `HOME`
 * @returns {boolean} Determine result.
 */
export function isEnvironmentHeroku(): boolean {
	return (
		Deno.env.has("HEROKU") ||
		(Deno.env.has("DYNO") && Deno.env.get("HOME") === "/app")
	);
}
export default isEnvironmentHeroku;
