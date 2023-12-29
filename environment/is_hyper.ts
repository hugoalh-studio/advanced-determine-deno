/**
 * Determine whether this process is inside [Hyper](https://hyper.is).
 * 
 * **Require Permission:**
 * - Environment (`allow-env`):
 *   - `TERM_PROGRAM`
 * @returns {boolean} Determine result.
 */
export function isEnvironmentHyper(): boolean {
	const result: string | undefined = Deno.env.get("TERM_PROGRAM");
	return (
		result === "Hyper" ||
		result === "HyperTerm"
	);
}
export default isEnvironmentHyper;
