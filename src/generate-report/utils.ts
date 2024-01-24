import {
  ComparisonReportItem,
  LogicalReportItem,
  ReportItem,
} from "@/types/Report";
import { ComparisonRuleItem, LogicalRuleItem } from "@/types/Rule";
import { isLogicalRule } from "@/calculator/utils";
import { LOGICAL_OPERATOR } from "@/calculator/default-options";
/**
 * @desc 创建运算报文
 */
export const createReportFromRule = <
  T extends ComparisonRuleItem | LogicalRuleItem
>(
  rule: T,
  status?: boolean
): T extends LogicalRuleItem ? LogicalReportItem : ComparisonReportItem => {
  let reportItem;
  if (isLogicalRule(rule)) {
    reportItem = createLogicalReportFromRule(rule);
  } else {
    reportItem = createComparisonReportFromRule(rule);
  }
  if (status != null) {
    setReportItemStatus(reportItem, status);
  }
  // @ts-ignore-next-line
  return reportItem;
};

/**
 * @desc 创建逻辑运算报告
 */
const createLogicalReportFromRule = (
  rule: LogicalRuleItem
): LogicalReportItem => {
  const [operator, _, message = ""] = rule;
  return [operator, [], message, true];
};

/**
 * @desc 创建比较运算报告
 */
const createComparisonReportFromRule = (
  rule: ComparisonRuleItem
): ComparisonReportItem => {
  const [operator, key, value, message = ""] = rule;
  return [operator, key, value, message, true];
};

/**
 * @desc 设置报文项成功状态
 */
export const setReportItemStatus = <
  T extends LogicalReportItem | ComparisonReportItem
>(
  report: T,
  status: boolean
): T => {
  report[report.length - 1] = status;
  return report;
};

/**
 * @desc 判断是否为逻辑运算报文
 */
export const isLogicalReport = (
  reportItem: ReportItem
): reportItem is LogicalReportItem => {
  return (
    Array.isArray(reportItem) &&
    reportItem.length === 4 &&
    LOGICAL_OPERATOR.includes(reportItem[0])
  );
};

export const isComparisonReport = (
  reportItem: ReportItem
): reportItem is ComparisonReportItem => {
  return (
    Array.isArray(reportItem) &&
    reportItem.length === 5 &&
    !isLogicalReport(reportItem)
  );
};
