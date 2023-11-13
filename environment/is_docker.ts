/**
 * @access private
 * @param {Uint8Array} data
 * @returns {boolean}
 */
function isEnvironmentDockerDataMatcher(data: Uint8Array): boolean {
	const dataString: string = new TextDecoder("utf-8").decode(data);
	return /docker/u.test(dataString);
}
/**
 * Determine whether this process is inside Docker.
 * 
 * **Require Permission:**
 * - **File System - Read (`allow-read`):**
 *   - `/.dockerenv`
 *   - `/proc/self/cgroup`
 * @returns {Promise<boolean>} Determine result.
 */
export async function isEnvironmentDocker(): Promise<boolean> {
	try {
		await Deno.stat("/.dockerenv");
		return true;
	} catch {
		// Continue on error.
	}
	try {
		return isEnvironmentDockerDataMatcher(await Deno.readFile("/proc/self/cgroup"));
	} catch {
		return false;
	}
}
export default isEnvironmentDocker;
/**
 * Determine whether this process is inside Docker.
 * 
 * **Require Permission:**
 * - **File System - Read (`allow-read`):**
 *   - `/.dockerenv`
 *   - `/proc/self/cgroup`
 * @returns {boolean} Determine result.
 */
export function isEnvironmentDockerSync(): boolean {
	try {
		Deno.statSync("/.dockerenv");
		return true;
	} catch {
		// Continue on error.
	}
	try {
		return isEnvironmentDockerDataMatcher(Deno.readFileSync("/proc/self/cgroup"));
	} catch {
		return false;
	}
}
