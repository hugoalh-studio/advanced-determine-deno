# Advanced Determine (Deno)

[⚖️ MIT](./LICENSE.md)
[![CodeFactor Grade](https://img.shields.io/codefactor/grade/github/hugoalh-studio/advanced-determine-deno?label=Grade&logo=codefactor&logoColor=ffffff&style=flat-square "CodeFactor Grade")](https://www.codefactor.io/repository/github/hugoalh-studio/advanced-determine-deno)

|  | **Heat** | **Release - Latest** | **Release - Pre** |
|:-:|:-:|:-:|:-:|
| [![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=ffffff&style=flat-square "GitHub")](https://github.com/hugoalh-studio/advanced-determine-deno) | [![GitHub Stars](https://img.shields.io/github/stars/hugoalh-studio/advanced-determine-deno?label=&logoColor=ffffff&style=flat-square "GitHub Stars")](https://github.com/hugoalh-studio/advanced-determine-deno/stargazers) \| ![GitHub Total Downloads](https://img.shields.io/github/downloads/hugoalh-studio/advanced-determine-deno/total?label=&style=flat-square "GitHub Total Downloads") | ![GitHub Latest Release Version](https://img.shields.io/github/release/hugoalh-studio/advanced-determine-deno?sort=semver&label=&style=flat-square "GitHub Latest Release Version") (![GitHub Latest Release Date](https://img.shields.io/github/release-date/hugoalh-studio/advanced-determine-deno?label=&style=flat-square "GitHub Latest Release Date")) | ![GitHub Latest Pre-Release Version](https://img.shields.io/github/release/hugoalh-studio/advanced-determine-deno?include_prereleases&sort=semver&label=&style=flat-square "GitHub Latest Pre-Release Version") (![GitHub Latest Pre-Release Date](https://img.shields.io/github/release-date-pre/hugoalh-studio/advanced-determine-deno?label=&style=flat-square "GitHub Latest Pre-Release Date")) |

A Deno module to provide advanced method to determine item.

> **🔗 Other Edition:**
>
> - [NodeJS](https://github.com/hugoalh-studio/advanced-determine-nodejs)

## 📥 Import

### Deno

- **Target Version:** >= v1.34.0
- **Require Permission:** *N/A*

#### From

> **ℹ️ Notice:** Although it is recommended to import with default module path `mod.ts` in general, it is also able to import with submodule path (if available), but do not import that submodule if either:
>
> - It's file path has an underscore prefix (e.g.: `_foo.ts`, `_util/bar.ts`).
> - It is a benchmark or test file (e.g.: `foo.bench.ts`, `foo.test.ts`).
> - It's symbol has an underscore prefix (e.g.: `export function _baz() {}`).
>
> These elements are not considered part of the public API, thus no stability is guaranteed for them.

- **Deno Land:** *N/A*
- **DenoPKG:**
  ```
  https://denopkg.com/hugoalh-studio/shuffle-array-deno[@<Tag>]/mod.ts
  ```
- **GitHub Raw *\[Require Tag\]*:**
  ```
  https://raw.githubusercontent.com/hugoalh-studio/shuffle-array-deno/<Tag>/mod.ts
  ```
- **Pax:**
  ```
  https://pax.deno.dev/hugoalh-studio/shuffle-array-deno[@<Tag>]/mod.ts
  ```

## API (Excerpt)

### Function

- `isArrayStrict`
- `isArrayUnique`
- `isArrayUniqueReference`
- `isAsyncFunction`
- `isAsyncGenerator`
- `isAsyncGeneratorFunction`
- `isBigIntegerEven`
- `isBigIntEven`
- `isBigIntNegative`
- `isBigIntNumericIntegralType`
- `isBigIntOdd`
- `isBigIntPositive`
- `isBigIntPrime`
- `isBigIntSafe`
- `isJSON`
- `isNumberEven`
- `isNumberFloat`
- `isNumberNegative`
- `isNumberNumericIntegralType`
- `isNumberOdd`
- `isNumberPositive`
- `isNumberPrime`
- `isNumberSafe`
- `isNumericIntegralType`
- `isNumericPrime`
- `isObjectPlain`
- `isStringASCII`
- `isStringCaseLower`
- `isStringCaseUpper`
- `isStringSingleLine`
- `isStringTrimmable`
- `isStringTrimmableEnd`
- `isStringTrimmableStart`
- `isSyncFunction`
- `isSyncGenerator`
- `isSyncGeneratorFunction`

## Example

- ```ts
  import { isArrayUnique } from "https://raw.githubusercontent.com/hugoalh-studio/advanced-determine-deno/main/array/is_unique.ts";

  isArrayUnique([{ foo: "bar" }, { foo: "bar" }]);
  //=> false
  ```
- ```ts
  import { isArrayUniqueReference } from "https://raw.githubusercontent.com/hugoalh-studio/advanced-determine-deno/main/array/is_unique_reference.ts";

  isArrayUniqueReference([{ foo: "bar" }, { foo: "bar" }]);
  //=> true
  ```
- ```ts
  import { isNumericPrime } from "https://raw.githubusercontent.com/hugoalh-studio/advanced-determine-deno/main/numeric/is_prime.ts";

  isNumericPrime(17n);
  //=> true
  ```
- ```ts
  import { isStringCaseUpper } from "https://raw.githubusercontent.com/hugoalh-studio/advanced-determine-deno/main/string/is_case_upper.ts";

  isStringCaseUpper("Hello, world!");
  //=> false
  ```
