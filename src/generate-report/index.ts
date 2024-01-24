import { Report, LogicalReportItem } from "@/types/Report";
import { LogicalRuleItem, ComparisonRuleItem } from "@/types/Rule";
import {
  createReportFromRule,
  isLogicalReport,
  setReportItemStatus,
} from "./utils";

/**
 * @desc 生成报告
 */
export const createReport = () => {
  const report: Report = {
    success: true,
    error: null as any,
    detail: null as any,
  };
  const stack: LogicalReportItem[] = [];

  const controller = {
    pushLogicalReport: (rule: LogicalRuleItem) => {
      const reportItem = createReportFromRule(rule);
      stack.push(reportItem);
    },
    popLogicalReport: (status: boolean) => {
      const reportItem = stack.pop()!;
      setReportItemStatus(reportItem, status);
      if (stack.length !== 0) {
        stack[stack.length - 1]![1].push(reportItem);
      } else {
        report.detail = reportItem;
      }
    },
    addComparisonReport: (rule: ComparisonRuleItem, status: boolean) => {
      const reportItem = createReportFromRule(rule, status);
      stack[stack.length - 1]![1]!.push(reportItem);
    },
    setSuccess: (success: boolean) => {
      report.success = success;
    },
    getReport: (): Report => {
      report.error = generateErrorReportByDetailReport(report.detail);
      return report;
    },
  };
  return controller;
};

/**
 * @desc 通过详情筛选错误报告
 */
const generateErrorReportByDetailReport = (
  reportItem: Report["detail"]
): Report["error"] => {
  const [op, otherReportItem, msg, s] = reportItem;
  const errorReportNode: LogicalReportItem = [op, [], msg, s];
  otherReportItem.forEach((item) => {
    if (item[item[0].length - 1]) return;

    if (isLogicalReport(item)) {
      errorReportNode[1].push(generateErrorReportByDetailReport(item));
    } else {
      errorReportNode[1].push(item);
    }
  });
  return errorReportNode;
};
