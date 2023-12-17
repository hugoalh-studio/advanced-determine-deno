export const isOSMac: boolean = Deno.build.os === "darwin";
export const isOSWindows: boolean = Deno.build.os === "windows";
export const isOSLinux: boolean = !isOSMac && !isOSWindows;
