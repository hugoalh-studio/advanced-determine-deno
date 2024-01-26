import { isEnvironmentCI } from "../environment/is_ci.ts";
/**
 * Determine whether this terminal is support interactive.
 * 
 * **Require Permission:**
 * - Environment (`allow-env`): All
 * @returns {boolean} Determine result.
 */
export function isTerminalInteractive(): boolean {
	return (Deno.stderr.isTerminal() && Deno.stdin.isTerminal() && Deno.stdout.isTerminal() && isEnvironmentCI() && Deno.env.get("TERM") !== "dumb");
}
export default isTerminalInteractive;
