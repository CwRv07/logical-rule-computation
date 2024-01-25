import { LogicalRuleItem, RuleOptions } from "@/types/Rule";
import { Operations } from "@/types/Operations";
import { Report } from "@/types/Report";
import { originParser } from "@/origin-parser/index";
import { isLogicalRule } from "./utils";
import { DEFAULT_OPERATIONS } from "./default-options";
import { createReport } from "@/generate-report";

/**
 * @desc 计算逻辑规则
 * @example
 * 计算数据源是否满足规则“a > 10 && b.b > 10”
 *  calc(
 *    ["all",[[">", "a", 10],[">", "b.b", 10]], "a > 10 && b.b > 10"],
 *    { a: 25, b: { b: 20 } }
 *  );
 */
export const calc = <GenerateReport extends boolean>(
  rules: RuleOptions,
  origin: Record<string, any>,
  options: {
    generateReport?: GenerateReport;
    operations?: Operations;
  } = {
    generateReport: false as GenerateReport,
    operations: {},
  }
): GenerateReport extends true ? Report : boolean => {
  const { generateReport: isGenerateReport, operations: userOperations } =
    options;
  const parsedOrigin = originParser(origin);
  const formattedRules = formattingRules(rules);
  const operations = { ...DEFAULT_OPERATIONS, ...userOperations };
  const report = createReport();
  const next = (rule: RuleOptions): boolean => {
    if (isLogicalRule(rule)) {
      let result: boolean;
      const [key, otherRules, message = ""] = rule;
      isGenerateReport && report.pushLogicalReport([key, otherRules, message]);
      if (key === "all") {
        result = otherRules.every((item) => next(item));
      } else if (key === "any") {
        result = otherRules.some((item) => next(item));
      }
      isGenerateReport && report.popLogicalReport(result!);
      return result!;
    } else {
      const [operator, key, value, message = ""] = rule;
      const result = operations[operator](parsedOrigin[key], value);
      isGenerateReport &&
        report.addComparisonReport([operator, key, value, message], result);
      return result;
    }
  };
  const result = next(formattedRules);
  // @ts-ignore-next-line
  return isGenerateReport
    ? // @ts-ignore-next-line
      report.setSuccess(result) || report.getReport()
    : result;
};

/**
 * @desc 格式化规则配置，保证以逻辑运算规则为第一项便于运算
 */
const formattingRules = (rules: RuleOptions): LogicalRuleItem => {
  if (isLogicalRule(rules)) {
    return rules;
  } else {
    return ["all", [rules], ""];
  }
};
