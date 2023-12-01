const regexpWordMicrosoft = /microsoft/iv;
/**
 * @access private
 * @param {Uint8Array} data
 * @returns {boolean}
 */
function isEnvironmentWSLDataMatcher(data: Uint8Array): boolean {
	const dataString: string = new TextDecoder("utf-8").decode(data);
	return regexpWordMicrosoft.test(dataString);
}
/**
 * Determine whether this process is inside WSL (Windows Subsystem for Linux).
 * 
 * **Require Permission:**
 * - File System - Read (`allow-read`):
 *   - `/proc/version`
 * @returns {Promise<boolean>} Determine result.
 */
export async function isEnvironmentWSL(): Promise<boolean> {
	if (Deno.build.os !== "linux") {
		return false;
	}
	try {
		return isEnvironmentWSLDataMatcher(await Deno.readFile("/proc/version"));
	} catch {
		return false;
	}
}
export default isEnvironmentWSL;
/**
 * Determine whether this process is inside WSL (Windows Subsystem for Linux).
 * 
 * **Require Permission:**
 * - File System - Read (`allow-read`):
 *   - `/proc/version`
 * @returns {boolean} Determine result.
 */
export function isEnvironmentWSLSync(): boolean {
	if (Deno.build.os !== "linux") {
		return false;
	}
	try {
		return isEnvironmentWSLDataMatcher(Deno.readFileSync("/proc/version"));
	} catch {
		return false;
	}
}
