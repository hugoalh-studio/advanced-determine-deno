/**
 * Determine whether this terminal is support Unicode.
 * 
 * **Require Permission:**
 * - **Environment (`allow-env`):**
 *   - `SSH_CLIENT`
 * @returns {boolean} Determine result.
 */
export function isTerminalUnicode(): boolean {
	const envTerm: string | undefined = Deno.env.get("TERM");
	if (Deno.build.os !== "windows") {
		// Linux Console (Kernel)
		return envTerm !== "linux";
	}
	if (
		envTerm === "alacritty" ||
		envTerm === "xterm-256color" ||
		// Terminus (< v0.2.27)
		typeof Deno.env.get("TERMINUS_SUBLIME") !== "undefined" ||
		// Windows Terminal
		typeof Deno.env.get("WT_SESSION") !== "undefined" ||
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
