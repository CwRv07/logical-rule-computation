import { RuleOptions } from "@/types/Rule";
import { Operations } from "@/types/Operations";
import { originParser } from "@/origin-parser/index";
import { isLogicalRule } from "./utils";
import { DefaultOperations } from "./defaultOptions";

export const calc = (rules: RuleOptions, origin:Record<string, any>, operations:Operations={}): boolean => {
  const parsedData = originParser(origin);
  const formattedRules = formattingRules(rules);
  operations = { ...DefaultOperations, ...operations };

  const next = (rule:RuleOptions):boolean => {
    if (isLogicalRule(rule)) {
      const [key, ...otherRules] = rule;
      if (key === "all") {
        return otherRules.every((item) => next(item));
      } else if (key === 'any') {
        return otherRules.some((item) => next(item));
      }
    } else {
      const [operator,key,value] = rule;
      return operations[operator](parsedData[key],  value);
    }
    return true;
  }

  return next(formattedRules);
};


/**
 * @desc 格式化规则配置，保证以逻辑运算规则为第一项便于运算
 */
const formattingRules = (rules:RuleOptions):RuleOptions => {
  if (isLogicalRule(rules)) {
    return rules;
  } else {
    return ["all", rules]
  }
}

