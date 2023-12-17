import { isOSWindows } from "./_os.ts";
export const pathDelimiter = isOSWindows ? ";" : ":";
/**
 * Split environment value with operate system specific delimiter.
 * @access private
 * @param {string} item
 * @returns {string[]}
 */
function splitEnvironmentValue(item: string): string[] {
	return item.split(pathDelimiter).map((value: string): string => {
		return value.trim();
	}).filter((value: string): boolean => {
		return (value.length > 0);
	});
}
/**
 * Get PATHs.
 * 
 * **Require Permission:**
 * - Environment (`allow-env`):
 *   - `PATH`
 * @returns {string[]}
 */
export function getPaths(): string[] {
	return splitEnvironmentValue(Deno.env.get("PATH") ?? "");
}
/**
 * Get PATH extensions, always return `null` for non-Windows operate system.
 * 
 * **Require Permission:**
 * - Environment (`allow-env`):
 *   - `PATHEXT` *(Windows Only)*
 * @returns {string[] | null}
 */
export function getPathExts(): string[] | null {
	if (!isOSWindows) {
		return null;
	}
	let output = ".EXE;.CMD;.BAT;.COM";
	try {
		const value: string | undefined = Deno.env.get("PATHEXT");
		if (typeof value !== "undefined") {
			output = value;
		}
	} catch (error) {
		if (!(error instanceof Deno.errors.PermissionDenied)) {
			throw error;
		}
	}
	return splitEnvironmentValue(output);
}
