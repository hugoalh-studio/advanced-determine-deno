/**
 * Determine whether this process is inside Podman.
 * 
 * **Require Permission:**
 * - **File System - Read (`allow-read`):**
 *   - `/run/.containerenv`
 * @returns {Promise<boolean>} Determine result.
 */
export async function isEnvironmentPodman(): Promise<boolean> {
	try {
		await Deno.stat("/run/.containerenv");
		return true;
	} catch {
		return false;
	}
}
export default isEnvironmentPodman;
/**
 * Determine whether this process is inside Podman.
 * 
 * **Require Permission:**
 * - **File System - Read (`allow-read`):**
 *   - `/run/.containerenv`
 * @returns {boolean} Determine result.
 */
export function isEnvironmentPodmanSync(): boolean {
	try {
		Deno.statSync("/run/.containerenv");
		return true;
	} catch {
		return false;
	}
}
