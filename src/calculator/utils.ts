import { RuleOptions,LogicalRuleItem,ComparisonRuleItem } from "@/types/Rule";

/**
 * @desc 判断是否为逻辑规则
 */
export const isLogicalRule = (rule: RuleOptions):rule is LogicalRuleItem => {
  return (
    (Array.isArray(rule) && rule.length > 0 && rule[0] === "all") ||
    rule[0] === "any"
  );
};

/**
 * @desc 判断是否为比较规则
 */
export const isComparisonRule = (rule: RuleOptions):rule is ComparisonRuleItem => {
  return Array.isArray(rule) && rule.length === 3 && !isLogicalRule(rule);
};
