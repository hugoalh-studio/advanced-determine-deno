import { isOSWindows } from "./_os.ts";
import { splitEnvironmentValue } from "./_split_environment_value.ts";
/**
 * Get PATH extensions, always return `null` for non-Windows operate system.
 *
 * **Require Permission:**
 * - Environment (`allow-env`):
 *   - `PATHEXT` *(Windows Only)*
 * @returns {string[] | null}
 */
export function getEnvironmentPathExts(): string[] | null {
	if (!isOSWindows) {
		return null;
	}
	try {
		const value: string | undefined = Deno.env.get("PATHEXT");
		if (typeof value !== "undefined") {
			return splitEnvironmentValue(value);
		}
	} catch (error) {
		if (!(error instanceof Deno.errors.PermissionDenied)) {
			throw error;
		}
	}
	return splitEnvironmentValue(".EXE;.CMD;.BAT;.COM");
}
export default getEnvironmentPathExts;
