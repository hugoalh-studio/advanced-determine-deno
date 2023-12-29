/**
 * Determine whether this terminal is support Unicode.
 * 
 * **Require Permission:**
 * - Environment (`allow-env`):
 *   - `ConEmuTask`
 *   - `TERM`
 *   - `TERM_PROGRAM`
 *   - `TERMINAL_EMULATOR`
 *   - `TERMINUS_SUBLIME`
 *   - `WT_SESSION`
 * @returns {boolean} Determine result.
 */
export function isTerminalUnicode(): boolean {
	const envTerm: string | undefined = Deno.env.get("TERM");
	if (Deno.build.os !== "windows") {
		// Linux Console (Kernel)
		return (envTerm !== "linux");
	}
	if (
		envTerm === "alacritty" ||
		envTerm === "xterm-256color" ||
		// Terminus (< v0.2.27)
		Deno.env.has("TERMINUS_SUBLIME") ||
		// Windows Terminal
		Deno.env.has("WT_SESSION") ||
		// ConEmu and cmder
		Deno.env.get("ConEmuTask") === "{cmd::Cmder}" ||
		Deno.env.get("TERMINAL_EMULATOR") === "JetBrains-JediTerm"
	) {
		return true;
	}
	const envTermProgram: string | undefined = Deno.env.get("TERM_PROGRAM");
	return (
		envTermProgram === "Terminus-Sublime" ||
		envTermProgram === "vscode"
	);
}
export default isTerminalUnicode;
