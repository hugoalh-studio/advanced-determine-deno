import { extname as pathExtname } from "https://deno.land/std@0.216.0/path/extname.ts";
import { isOSWindows } from "../environment/_os.ts";
import { getEnvironmentPathExts } from "../environment/pathext.ts";
export interface IsPathExecutableOptions {
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
 * @param {IsPathExecutableOptions} [options={}]
 * @returns {boolean}
 */
function assertPathExecutablePosix(stat: Deno.FileInfo, options: IsPathExecutableOptions = {}): boolean {
	if (!stat.isFile) {
		return false;
	}
	const ownGid: number | null = options.gid ?? Deno.gid();
	const ownUid: number | null = options.uid ?? Deno.uid();
	if (ownGid === null) {
		throw new Error(`Unable to get the group ID of the process!`);
	}
	if (ownUid === null) {
		throw new Error(`Unable to get the user ID of the process!`);
	}
	const pathGid: number | null = stat.gid;
	const pathMode: number | null = stat.mode;
	const pathUid: number | null = stat.uid;
	if (pathGid === null) {
		throw new Error(`Unable to get the group ID of the path!`);
	}
	if (pathMode === null) {
		throw new Error(`Unable to get the mode of the path!`);
	}
	if (pathUid === null) {
		throw new Error(`Unable to get the user ID of the path!`);
	}
	const g: number = Number.parseInt('010', 8);
	const o: number = Number.parseInt('001', 8);
	const u: number = Number.parseInt('100', 8);
	return (
		Boolean(pathMode & o) ||
		(Boolean(pathMode & g) && ownGid === pathGid) ||
		(Boolean(pathMode & u) && pathUid === ownUid) ||
		(Boolean(pathMode & (u | g)) && ownUid === 0)
	);
}
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
	const pathExts: string[] | null = getEnvironmentPathExts();
	if (pathExts === null) {
		return true;
	}
	return pathExts.map((pathExt: string): string => {
		return pathExt.toLowerCase();
	}).includes(pathExtname(path).toLowerCase());
}
/**
 * Determine whether the path is executable on the current operate system.
 * 
 * **Require Permission:**
 * - Environment (`allow-env`):
 *   - `PATHEXT` *(Windows Only)*
 * - File System - Read (`allow-read`): Resources
 * - System Info (`allow-sys`):
 *   - `gid` *(Non-Windows Only)*
 *   - `uid` *(Non-Windows Only)*
 * @param {string} path Path.
 * @param {IsPathExecutableOptions} [options={}] Options.
 * @returns {Promise<boolean>} Determine result.
 */
export async function isPathExecutable(path: string, options: IsPathExecutableOptions = {}): Promise<boolean> {
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
export default isPathExecutable;
/**
 * Determine whether the path is executable on the current operate system.
 * 
 * **Require Permission:**
 * - Environment (`allow-env`):
 *   - `PATHEXT` *(Windows Only)*
 * - File System - Read (`allow-read`): Resources
 * - System Info (`allow-sys`):
 *   - `gid` *(Non-Windows Only)*
 *   - `uid` *(Non-Windows Only)*
 * @param {string} path Path.
 * @param {IsPathExecutableOptions} [options={}] Options.
 * @returns {boolean} Determine result.
 */
export function isPathExecutableSync(path: string, options: IsPathExecutableOptions = {}): boolean {
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
