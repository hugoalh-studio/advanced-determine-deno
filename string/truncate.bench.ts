import { StringTruncator } from "./truncate.ts";
const sample1 = "Vel ex sit est sit est tempor enim et voluptua consetetur gubergren gubergren ut. Amet dolores sit. Duo iriure vel dolore illum diam. Ea vero diam diam tincidunt molestie elitr te sed nisl ut vulputate tincidunt accusam sit sed. Amet sea dolore rebum amet accusam labore dolor no sadipscing labore. Sit erat sit sed voluptua tempor sit ea dolor et.";
Deno.bench("1", { permissions: "none" }, () => {
	new StringTruncator(100).truncate(sample1);
});
Deno.bench("2", { permissions: "none" }, () => {
	new StringTruncator(100, { safeWords: false }).truncate(sample1);
});
