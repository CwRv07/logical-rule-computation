import { LogicalOperator, ComparisonRuleItem } from "./Rule";
/**
 * @desc 报告类型
 */
export type Report = {
  success: boolean;
  error: (LogicalReportItem | ComparisonReportItem)[];
  detail: (LogicalReportItem | ComparisonReportItem)[];
};

/**
 * @desc 逻辑报告项
 */
export type LogicalReportItem = [
  LogicalOperator,
  (LogicalReportItem | ComparisonReportItem)[],
  boolean
];

/**
 * @desc 比较报告项
 */
export type ComparisonReportItem = [...ComparisonRuleItem, boolean];
