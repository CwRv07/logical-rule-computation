# logical-rule-computation

## 1. 简介

基于 JavaScript 实现的逻辑规则计算库，可以通过添加逻辑和对比条件来快速计算数据是否符合要求。
<div>
  <img src="document/img/preview.png">
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
