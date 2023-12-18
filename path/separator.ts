import { isOSWindows } from "../environment/_os.ts";
export const pathSeparator = isOSWindows ? "\\" : "/";
export default pathSeparator;
