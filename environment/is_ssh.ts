/**
 * Determine whether this process is inside SSH.
 * 
 * **Require Permission:**
 * - Environment (`allow-env`):
 *   - `SSH_CLIENT`
 * @returns {boolean} Determine result.
 */
export function isEnvironmentSSH(): boolean {
	return Deno.env.has("SSH_CLIENT");
}
export default isEnvironmentSSH;
