import { isOSWindows } from "./_os.ts";
export const environmentValueDelimiter = isOSWindows ? ";" : ":";
export default environmentValueDelimiter;
