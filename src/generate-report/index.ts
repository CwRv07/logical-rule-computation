import {
  Report,
  LogicalReportItem,
  ComparisonReportItem,
} from "@/types/Report";

/**
 * @desc 生成报告
 */
export const createReport = () => {
  const report: Report = { success: true, error: [], detail: [] };
  return {
    addLogicalReport: (item: LogicalReportItem) => {
      // TODO
      item;
    },
    addErrorRepost: (item: LogicalReportItem | ComparisonReportItem) => {
      // TODO
      item;
    },
    addComparisonReport: (item: ComparisonReportItem) => {
      // TODO
      item;
    },
    setSuccess: (success: boolean) => {
      report.success = success;
    },
    getReport: () => report,
  };
};
