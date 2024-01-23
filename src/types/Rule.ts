/**
 * @desc 比较规则类型
 * @example
 * 表示"num"字段要大于10
 *    [ ">", "num", 10 ]
 */
export type ComparisonRuleItem = [string, string, any];

/**
 * @desc 逻辑规则类型
 * @example
 * 表示"num"字段要大于10且小于20
 *    [ "all",
 *      [ ">", "num", 10 ],
 *      [ "<", "num", 20 ],
 *    ]
 */
export type LogicalRuleItem = [
  LogicalOperator,
  ...(ComparisonRuleItem | LogicalRuleItem)[]
];

export type LogicalOperator= "all" | "any";

/**
 * @desc 规则配置项类型
 * @example
 * 1.表示"num"字段要大于10
 *    [ ">", "num", 10 ]
 *
 * 2.表示"num"字段要大于10且小于20
 *    [ "all",
 *      [ ">", "num", 10 ],
 *      [ "<", "num", 20 ],
 *    ]
 */
export type RuleOptions = ComparisonRuleItem | LogicalRuleItem;
