/**
 * @desc 比较规则类型
 * @example
 * 语法：[操作符,字段名,值,报告提示]
 *
 * 1.表示"num"字段要大于10
 *    [ ">", "num", 10, "num要大于10" ]
 */
export type ComparisonRuleItem = [string, string, any, string?];

/**
 * @desc 逻辑规则类型
 * @example
 * 语法：["all"|"any",逻辑规则数组,报告提示?]
 *
 * 1.表示"num"字段要大于10且小于20
 *    [ "all",
 *      [
 *        [ ">", "num", 10 ],
 *        [ "<", "num", 20 ],
 *      ],
 *      "num要大于10且小于20"
 *    ]
 */
export type LogicalRuleItem = [
  LOGICAL_OPERATOR,
  (ComparisonRuleItem | LogicalRuleItem)[],
  string?
];

export enum LOGICAL_OPERATOR {
  ALL = "all",
  ANY = "any",
}

/**
 * @desc 规则配置项类型
 * @example
 * 语法：
 * - 比较运算：[操作符,字段名,值,报告提示?]
 * - 逻辑运算：["all"|"any",逻辑规则数组,报告提示?]
 *
 * 1.表示"num"字段要大于10
 *    [ ">", "num", 10, "num要大于10" ]
 *
 * 2.表示"num"字段要大于10且小于20
 *    [ "all",
 *      [
 *        [ ">", "num", 10 ],
 *        [ "<", "num", 20 ],
 *      ],
 *      "num要大于10且小于20"
 *    ]
 */
export type RuleOptions = ComparisonRuleItem | LogicalRuleItem;
