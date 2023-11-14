import { isEnvironmentCI } from "../environment/is_ci.ts";
/**
 * Get open resource ID (rid).
 * @access private
 * @param {unknown} identifier Open resource identifier.
 * @returns {number | undefined} Open resource ID.
 */
function getOpenResourceID(identifier: unknown): number | undefined {
	for (const [id, resource] of Object.entries(Deno.resources())) {
		if (identifier === resource) {
			return Number(id);
		}
	}
	return;
}
/**
 * Determine whether this terminal is support interactive.
 * 
 * **Require Permission:**
 * - **Environment (`allow-env`):** *All*
 * @returns {boolean} Determine result.
 */
export function isTerminalInteractive(): boolean {
	const stdoutID: number | undefined = getOpenResourceID("stdout");
	if (
		typeof stdoutID === "undefined" ||
		!Deno.isatty(stdoutID)
	) {
		return false;
	}
	return (!isEnvironmentCI() && Deno.env.get("TERM") !== "dumb");
}
export default isTerminalInteractive;
