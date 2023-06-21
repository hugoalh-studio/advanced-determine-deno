# Advanced Determine (Deno)

![License](https://img.shields.io/static/v1?label=License&message=MIT&style=flat-square "License")
[![GitHub Repository](https://img.shields.io/badge/Repository-181717?logo=github&logoColor=ffffff&style=flat-square "GitHub Repository")](https://github.com/hugoalh-studio/advanced-determine-deno)
[![GitHub Stars](https://img.shields.io/github/stars/hugoalh-studio/advanced-determine-deno?label=Stars&logo=github&logoColor=ffffff&style=flat-square "GitHub Stars")](https://github.com/hugoalh-studio/advanced-determine-deno/stargazers)
[![GitHub Contributors](https://img.shields.io/github/contributors/hugoalh-studio/advanced-determine-deno?label=Contributors&logo=github&logoColor=ffffff&style=flat-square "GitHub Contributors")](https://github.com/hugoalh-studio/advanced-determine-deno/graphs/contributors)
[![GitHub Issues](https://img.shields.io/github/issues-raw/hugoalh-studio/advanced-determine-deno?label=Issues&logo=github&logoColor=ffffff&style=flat-square "GitHub Issues")](https://github.com/hugoalh-studio/advanced-determine-deno/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr-raw/hugoalh-studio/advanced-determine-deno?label=Pull%20Requests&logo=github&logoColor=ffffff&style=flat-square "GitHub Pull Requests")](https://github.com/hugoalh-studio/advanced-determine-deno/pulls)
[![GitHub Discussions](https://img.shields.io/github/discussions/hugoalh-studio/advanced-determine-deno?label=Discussions&logo=github&logoColor=ffffff&style=flat-square "GitHub Discussions")](https://github.com/hugoalh-studio/advanced-determine-deno/discussions)
[![CodeFactor Grade](https://img.shields.io/codefactor/grade/github/hugoalh-studio/advanced-determine-deno?label=Grade&logo=codefactor&logoColor=ffffff&style=flat-square "CodeFactor Grade")](https://www.codefactor.io/repository/github/hugoalh-studio/advanced-determine-deno)

| **Releases** | **Latest** (![GitHub Latest Release Date](https://img.shields.io/github/release-date/hugoalh-studio/advanced-determine-deno?label=&style=flat-square "GitHub Latest Release Date")) | **Pre** (![GitHub Latest Pre-Release Date](https://img.shields.io/github/release-date-pre/hugoalh-studio/advanced-determine-deno?label=&style=flat-square "GitHub Latest Pre-Release Date")) |
|:-:|:-:|:-:|
| [![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=ffffff&style=flat-square "GitHub")](https://github.com/hugoalh-studio/advanced-determine-deno/releases) ![GitHub Total Downloads](https://img.shields.io/github/downloads/hugoalh-studio/advanced-determine-deno/total?label=&style=flat-square "GitHub Total Downloads") | ![GitHub Latest Release Version](https://img.shields.io/github/release/hugoalh-studio/advanced-determine-deno?sort=semver&label=&style=flat-square "GitHub Latest Release Version") | ![GitHub Latest Pre-Release Version](https://img.shields.io/github/release/hugoalh-studio/advanced-determine-deno?include_prereleases&sort=semver&label=&style=flat-square "GitHub Latest Pre-Release Version") |

## 📝 Description

A Deno module to provide advanced method to determine item.

> **🔗 Other Edition:**
>
> - [NodeJS](https://github.com/hugoalh-studio/advanced-determine-nodejs)

## 📚 Documentation (Excerpt)

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

#### Class

- `ArrayFilter`
- `BigIntFilter`
- `JSONFilter`
- `MapFilter`
- `NumberFilter`
- `ObjectFilter`
- `RegExpFilter`
- `SetFilter`
- `StringFilter`

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
- `isStringUpperCase`
- `isSyncFunction`
- `isSyncGenerator`
- `isSyncGeneratorFunction`

### Example

```ts
/* Either */
new ArrayFilter().test([]);
ArrayFilter.test([]);
filterArray([]);
//=> false (`allowEmpty` is `false`)
```

```ts
/* Either */
new ArrayFilter({ allowEmpty: true }).test([]);
new ArrayFilter().allowEmpty().test([]);
ArrayFilter.test([], { allowEmpty: true });
filterArray([], { allowEmpty: true });
//=> true
```

```ts
/* Either */
new NumberFilter({ ieee754: "safe", numericType: "float", sign: "positive" }).test(8.31);
new NumberFilter().ieee754("safe").numericType("float").sign("positive").test(8.31);
new NumberFilter().safe().float().positive().test(8.31);
NumberFilter.test(8.31, { ieee754: "safe", numericType: "float", sign: "positive" });
filterNumber(8.31, { ieee754: "safe", numericType: "float", sign: "positive" });
//=> true
```

```ts
/* Either */
new StringFilter().test("");
StringFilter.test("");
filterString("");
//=> false (`allowEmpty` is `false`)
```

```ts
/* Either */
new StringFilter({ allowEmpty: true }).test("");
new StringFilter().allowEmpty().test("");
StringFilter.test("", { allowEmpty: true });
filterString("", { allowEmpty: true });
//=> true
```

```ts
/* Either */
new StringFilter({ case: "lower" }).test("Hello World");
new StringFilter().case("lower").test("Hello World");
new StringFilter().lowerCase().test("Hello World");
StringFilter.test("Hello World", { case: "lower" });
filterString("Hello World", { case: "lower" });
//=> false
```
