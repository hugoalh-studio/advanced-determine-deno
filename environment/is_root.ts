/**
 * Determine whether this process is running as root user.
 * 
 * **Require Permission:**
 * - System Info (`allow-sys`):
 *   - `uid` *(Non-Windows Only)*
 * @returns {boolean} Determine result.
 */
export function isEnvironmentRoot(): boolean {
	return (Deno.uid() === 0);
}
export default isEnvironmentRoot;
