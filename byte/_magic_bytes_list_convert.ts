import { dirname as pathDirname } from "https://deno.land/std@0.210.0/path/dirname.ts";
import { fromFileUrl as pathFromFileUrl } from "https://deno.land/std@0.210.0/path/from_file_url.ts";
import { join as pathJoin } from "https://deno.land/std@0.210.0/path/join.ts";
import { parse as yamlParse } from "https://deno.land/std@0.210.0/yaml/parse.ts";
const root: string = pathDirname(pathFromFileUrl(import.meta.url));
const fileName = "magic_bytes_list";
const data: string = JSON.stringify(yamlParse(await Deno.readTextFile(pathJoin(root, `${fileName}.yml`))), undefined, "\t");
await Deno.writeTextFile(pathJoin(root, `${fileName}.json`), `${data}\n`);
await Deno.writeTextFile(pathJoin(root, `_${fileName}.ts`), `export default ${data} as const;\n`);
