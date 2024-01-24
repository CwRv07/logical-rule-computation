/**
 * @desc 比较规则类型
 * @example
 * 表示"num"字段要大于10
 *    [ ">", "num", 10, "num要大于10" ]
 */
export type ComparisonRuleItem = [string, string, any,string?];

/**
 * @desc 逻辑规则类型
 * @example
 * 表示"num"字段要大于10且小于20
 *    [ "all",
 *      [
 *        [ ">", "num", 10 ],
 *        [ "<", "num", 20 ],
 *      ],
 *      "num要大于10且小于20"
 *    ]
 */
export type LogicalRuleItem = [
  LogicalOperator,
  [...(ComparisonRuleItem | LogicalRuleItem)[]],
  string?
];

export type LogicalOperator= "all" | "any";

/**
 * @desc 规则配置项类型
 * @example
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
