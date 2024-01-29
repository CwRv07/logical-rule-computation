import {
  RuleOptions,
  LogicalRuleItem,
  ComparisonRuleItem,
  LOGICAL_OPERATOR,
} from "@/types/Rule";
/**
 * @desc 判断是否为逻辑规则
 */
export const isLogicalRule = (rule: RuleOptions): rule is LogicalRuleItem => {
  return (
    Array.isArray(rule) &&
    (rule.length === 2 || rule.length === 3) &&
    Object.values(LOGICAL_OPERATOR).includes(rule[0] as LOGICAL_OPERATOR)
  );
};

/**
 * @desc 判断是否为比较规则
 */
export const isComparisonRule = (
  rule: RuleOptions
): rule is ComparisonRuleItem => {
  return (
    Array.isArray(rule) &&
    (rule.length === 3 || rule.length === 4) &&
    !isLogicalRule(rule)
  );
};
