<h1 align="center">
  逻辑规则计算库
</h1>

<div align="center">

[![NPM Version](https://img.shields.io/npm/v/logical-rule-computation)](https://www.npmjs.com/package/logical-rule-computation)
[![NPM Bundle Size](https://img.shields.io/bundlephobia/minzip/logical-rule-computation)](https://www.npmjs.com/package/logical-rule-computation)
[![NPM License](https://img.shields.io/npm/l/logical-rule-computation)](https://www.npmjs.com/package/logical-rule-computation)

</div>

## 1. 简介
基于 JavaScript 实现的逻辑规则计算库，可以通过添加逻辑和对比条件来快速计算数据是否符合要求。

<div>
  <img title="测试案例截图" src="https://s2.loli.net/2024/02/03/3YwvNun2IakeUhx.png">
<div>

## 2. 使用方法

```typescript
import { calc } from "logical-rule-computation";
const report = calc(
  [
    "all",
    [
      ["==", "a", 1, "a == 1"],
      [">", "b.b1", 1, "b > 1"],
      ["any",
        [
          ["eq", "b.b3", null, "b.b3 === null"],
          ["neq", "b.b3", null, "b.b3 !== null"]
        ],
        "b.b3 === null || b.b3 !== null"
      ],
    ],
    "a == 1 && b > 1",
  ],
  { a: 1, b: { b1: 2, b3: null } },
  { generateReport: true }
);
console.log(report);
```
