/**
 * Determine whether this process is inside SSH.
 * 
 * **Require Permission:**
 * - **Environment (`allow-env`):**
 *   - `SSH_CLIENT`
 * @returns {boolean} Determine result.
 */
export function isEnvironmentSSH(): boolean {
	return (typeof Deno.env.get("SSH_CLIENT") !== "undefined");
}
export default isEnvironmentSSH;
