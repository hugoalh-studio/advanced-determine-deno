import { extname as pathExtName } from "https://deno.land/std@0.209.0/path/extname.ts";
import { isOSWindows } from "./_os.ts";
import { getPathExts } from "./path.ts";
export interface IsExecutableOptions {
	/**
	 * If the path is not exist, whether to return `false` instead of throw an error.
	 * @default false
	 */
	mayNotExist?: boolean;
	/**
	 * Effective group ID to check executable mode flags on POSIX system.
	 * @default Deno.gid()
	 */
	gid?: number;
	/**
	 * Effective user ID to check executable mode flags on POSIX system.
	 * @default Deno.uid()
	 */
	uid?: number;
}
/**
 * @access private
 * @param {Deno.FileInfo} stat
 * @param {IsExecutableOptions} [options={}]
 * @returns {boolean}
 */
function assertPathExecutablePosix(stat: Deno.FileInfo, options: IsExecutableOptions = {}): boolean {
	if (!stat.isFile) {
		return false;
	}
	const gidOwn: number | null = options.gid ?? Deno.gid();
	const uidOwn: number | null = options.uid ?? Deno.uid();
	if (gidOwn === null) {
		throw new Error(`Unable to get the group ID of the process!`);
	}
	if (uidOwn === null) {
		throw new Error(`Unable to get the user ID of the process!`);
	}
	const gidPath: number | null = stat.gid;
	const modePath: number | null = stat.mode;
	const uidPath: number | null = stat.uid;
	if (gidPath === null) {
		throw new Error(`Unable to get the group ID of the path!`);
	}
	if (modePath === null) {
		throw new Error(`Unable to get the mode of the path!`);
	}
	if (uidPath === null) {
		throw new Error(`Unable to get the user ID of the path!`);
	}
	const g: number = Number.parseInt('010', 8);
	const o: number = Number.parseInt('001', 8);
	const u: number = Number.parseInt('100', 8);
	const ug: number = u | g;
	return (
		Boolean(modePath & o) ||
		(Boolean(modePath & g) && gidOwn === gidPath) ||
		(Boolean(modePath & u) && uidPath === uidOwn) ||
		(Boolean(modePath & ug) && uidOwn === 0)
	);
};
/**
 * @access private
 * @param {Deno.FileInfo} stat
 * @param {string} path
 * @returns {boolean}
 */
function assertPathExecutableWindows(stat: Deno.FileInfo, path: string): boolean {
	if (!stat.isFile) {
		return false;
	}
	const pathExts: string[] | null = getPathExts();
	if (pathExts === null) {
		return true;
	}
	return pathExts.map((pathExt: string): string => {
		return pathExt.toLowerCase();
	}).includes(pathExtName(path).toLowerCase());
}
/**
 * Determine whether the path is executable on the current operate system.
 * 
 * **Require Permission:**
 * - Environment (`allow-env`):
 *   - `PATHEXT` *(Windows Only)*
 * - System Info (`allow-sys`):
 *   - `gid` *(Non-Windows Only)*
 *   - `uid` *(Non-Windows Only)*
 * @param {string} path Path.
 * @param {IsExecutableOptions} [options={}] Options.
 * @returns {Promise<boolean>} Determine result.
 */
export async function isExecutable(path: string, options: IsExecutableOptions = {}): Promise<boolean> {
	const { mayNotExist = false } = options;
	try {
		const pathStat: Deno.FileInfo = await Deno.stat(path);
		if (isOSWindows) {
			return assertPathExecutableWindows(pathStat, path);
		}
		return assertPathExecutablePosix(pathStat, options);
	} catch (error) {
		if (mayNotExist && error instanceof Deno.errors.NotFound) {
			return false;
		}
		throw error;
	}
}
export default isExecutable;
/**
 * Determine whether the path is executable on the current operate system.
 * 
 * **Require Permission:**
 * - Environment (`allow-env`):
 *   - `PATHEXT` *(Windows Only)*
 * - System Info (`allow-sys`):
 *   - `gid` *(Non-Windows Only)*
 *   - `uid` *(Non-Windows Only)*
 * @param {string} path Path.
 * @param {IsExecutableOptions} [options={}] Options.
 * @returns {boolean} Determine result.
 */
export function isExecutableSync(path: string, options: IsExecutableOptions = {}): boolean {
	const { mayNotExist = false } = options;
	try {
		const pathStat: Deno.FileInfo = Deno.statSync(path);
		if (isOSWindows) {
			return assertPathExecutableWindows(pathStat, path);
		}
		return assertPathExecutablePosix(pathStat, options);
	} catch (error) {
		if (mayNotExist && error instanceof Deno.errors.NotFound) {
			return false;
		}
		throw error;
	}
}
