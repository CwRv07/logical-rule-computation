import { RuleOptions } from "@/types/Rule";
import { Operations } from "@/types/Operations";
import { Report } from "@/types/Report";
import { originParser } from "@/origin-parser/index";
import { isLogicalRule } from "./utils";
import { DEFAULT_OPERATIONS } from "./default-options";
import { createReport } from "@/generate-report";

/**
 * @desc 计算逻辑规则
 * @example
 *  calc(
 *    ["all", [">", "a", 10],[">", "b.b", 10]],
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
  const parsedOrigin = originParser(origin);
  const formattedRules = formattingRules(rules);
  const operations = { ...DEFAULT_OPERATIONS, ...options.operations };
  const report = createReport();
  const next = (rule: RuleOptions): boolean => {
    if (isLogicalRule(rule)) {
      const [key, otherRules, message = ""] = rule;
      if (key === "all") {
        const result = otherRules.every((item) => next(item));
        // TODO 报告收集
        console.log(message, result);
        return result;
      } else if (key === "any") {
        const result = otherRules.some((item) => next(item));
        // TODO 报告收集
        console.log(message, result);
        return result;
      }
    } else {
      const [operator, key, value, message = ""] = rule;
      const result = operations[operator](parsedOrigin[key], value);
      // TODO 报告收集
      console.log(message, result);
      return result;
    }
    return true;
  };
  const result = next(formattedRules);
  // @ts-ignore-next-line
  return operations.generateReport
    ? // @ts-ignore-next-line
      report.setSuccess(result) && report.getReport()
    : result;
};

/**
 * @desc 格式化规则配置，保证以逻辑运算规则为第一项便于运算
 */
const formattingRules = (rules: RuleOptions): RuleOptions => {
  if (isLogicalRule(rules)) {
    return rules;
  } else {
    return ["all", rules];
  }
};
