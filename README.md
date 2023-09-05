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

## 📓 Documentation (Excerpt)

For the full documentation, please visit the [GitHub Repository Wiki](https://github.com/hugoalh-studio/advanced-determine-deno/wiki).

### Getting Started

- Deno >= v1.34.0

```ts
/* Either */
import { ... } from "<URL>";// Named Import
import * as advancedDetermine from "<URL>";// Namespace Import
```

| **Domain / Registry** | **URL** |
|:-:|:--|
| Deno Land | *N/A* |
| DenoPKG | `https://denopkg.com/hugoalh-studio/advanced-determine-deno[@<Tag>]/mod.ts` |
| GitHub Raw **\*** | `https://raw.githubusercontent.com/hugoalh-studio/advanced-determine-deno/<Tag>/mod.ts` |
| Pax | `https://pax.deno.dev/hugoalh-studio/advanced-determine-deno[@<Tag>]/mod.ts` |

**\*:** Must provide a tag.

### API

#### Function

- `isArrayStrict`
- `isArrayUnique`
- `isArrayUniqueReference`
- `isAsyncFunction`
- `isAsyncGenerator`
- `isAsyncGeneratorFunction`
- `isBigIntEven`
- `isBigIntIntegralNumericType`
- `isBigIntNegative`
- `isBigIntOdd`
- `isBigIntPositive`
- `isBigIntPrime`
- `isBigIntSafe`
- `isNumberEven`
- `isNumberFloat`
- `isNumberIntegralNumericType`
- `isNumberNegative`
- `isNumberOdd`
- `isNumberPositive`
- `isNumberPrime`
- `isNumberSafe`
- `isObjectPlain`
- `isStringASCII`
- `isStringLowerCase`
- `isStringMultipleLine`
- `isStringSingleLine`
- `isStringTrimmable`
- `isStringTrimmableEnd`
- `isStringTrimmableStart`
- `isStringUpperCase`
- `isSyncFunction`
- `isSyncGenerator`
- `isSyncGeneratorFunction`

### Example

- ```ts
  isArrayUniqueReference([{ foo: "bar" }, { foo: "bar" }]);
  //=> true
  ```
- ```ts
  isArrayUnique([{ foo: "bar" }, { foo: "bar" }]);
  //=> false
  ```
