<h1 align="center">
逻辑规则计算库
</h1>

<div align="center">

[![NPM Version](https://img.shields.io/npm/v/logical-rule-computation)](https://www.npmjs.com/package/logical-rule-computation)
[![NPM Bundle Size](https://img.shields.io/bundlephobia/minzip/logical-rule-computation)](https://www.npmjs.com/package/logical-rule-computation)
[![NPM License](https://img.shields.io/npm/l/logical-rule-computation)](https://www.npmjs.com/package/logical-rule-computation)

</div>

## 1. 简介

🧐 基于 JavaScript 实现的逻辑规则计算库，可以通过添加逻辑和对比条件来快速计算数据是否符合要求。

<div>
  <img title="测试案例截图" src="https://s2.loli.net/2024/02/03/3YwvNun2IakeUhx.png">
<div>

## 2. 使用方法

### 2.1 安装依赖

```shell
npm install logical-rule-computation --save
yarn add logical-rule-computation
pnpm add logical-rule-computation
```

### 2.2 基础案例

```typescript
/*
  1.按需引入核心函数、常数与类型
*/
import {
  calc,
  LOGICAL_OPERATOR,
  type RuleOptions,
} from "logical-rule-computation";

/*
  2.提供计算规则
    - 采用数组模板可更轻量地存储在数据库中
    - 规则中可嵌套任意数量和种类运算符

  如下案例为 a==1 && b.b1>1 && (b.b3===null || b.b3!==null)
*/
const rules: RuleOptions = [
  LOGICAL_OPERATOR.ALL,
  [
    ["==", "a", 1, "a == 1"],
    [">", "b.b1", 1, "b > 1"],
    [
      LOGICAL_OPERATOR.ANY,
      [
        ["eq", "b.b3", null, "b.b3 === null"],
        ["neq", "b.b3", null, "b.b3 !== null"],
      ],
      "b.b3 === null || b.b3 !== null",
    ],
  ],
  "a == 1 && b > 1",
];

/* 3.提供待计算数据源（支持嵌套对象，可如上案例进行扁平化书写读取属性） */
const origin = { a: 1, b: { b1: 2, b3: null } };

/*
  4.调用核心函数进行计算
  第三个参数支持自定义配置，如generateReport控制是否生成计算报告
*/
const report = calc(rules, origin, { generateReport: true });

console.log(report);
```
### 2.3 运算符
**1. 逻辑运算符**

需要引入内置枚举类型常量`LOGICAL_OPERATOR`

|      | 书写方式               | 备注 |
| ---- | ---------------------- | ---- |
| 与   | `LOGICAL_OPERATOR.ALL` |      |
| 或   | `LOGICAL_OPERATOR.ANY` |      |

**2. 内置比较运算符**

备注为底层计算原理，其中`a`表示待计算数据源，`b`表示规则中对应的值

|          | 书写方式 | 备注                               |
| -------- | -------- | ---------------------------------- |
| 大于     | `>`      | `a > b`                              |
| 小于     | `<`      | `a < b`                              |
| 大于等于 | `>=`     | `a >= b`                             |
| 小于等于 | `<=`     | `a <= b`                             |
| 相等     | `==`     | `a == b`                             |
| 不相等   | `!=`     | `a != b`                             |
| 全等     | `===`    | `a === b`                            |
| 不全等   | `!==`    | `a !== b`                            |
| 包含     | `in`     | `Array.isArray(b) && b.includes(a)`  |
| 不包含   | `nin`    | `Array.isArray(b) && !b.includes(a)` |

**3. 自定义比较运算符**

```typescript
import { calc, type Operations } from "local-rule-computation";
/*
  自定义比较运算符通过键值对传入，其中key为书写方式，value为计算方法
  计算方法中接收两个参数，其中a表示待计算数据源，b表示规则中对应的值
*/
const customOperations: Operations = {
  between: (a: any, b: any) => Array.isArray(b) && a >= b[0] && a <= b[1],
};

// 通过配置项operations传入，并且其优先级高于内置比较运算符，可进行覆写
calc(rules, origin, {
  operations:customOperations
})
```

