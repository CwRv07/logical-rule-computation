import { LOGICAL_OPERATOR } from "./Rule";
/**
 * @desc 报告类型
 */
export type Report = {
  success: boolean;
  error: LogicalReportItem | null;
  detail: LogicalReportItem;
};

/**
 * @desc 报告项类型
 */
export type ReportItem = LogicalReportItem | ComparisonReportItem;

/**
 * @desc 逻辑报告项类型
 */
export type LogicalReportItem = [
  LOGICAL_OPERATOR,
  (LogicalReportItem | ComparisonReportItem)[],
  string,
  boolean
];

/**
 * @desc 比较报告项类型
 */
export type ComparisonReportItem = [string, string, any, string, boolean];
