/**
 * Whether this process is on a MacOS operating system.
 */
export const isOSMac: boolean = Deno.build.os === "darwin";
/**
 * Whether this process is on a Windows operating system.
 */
export const isOSWindows: boolean = Deno.build.os === "windows";
/**
 * Whether this process is on an Unix or Unix like operating system.
 */
export const isOSUnix: boolean = !isOSMac && !isOSWindows;
