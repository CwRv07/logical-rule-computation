import { Operations } from "@/types/Operations";

/**
 * @desc 支持基础计算操作
 */
export const DEFAULT_OPERATIONS:Operations = {
  ">": (a:any, b:any) => a > b,
  "<": (a:any , b: any) => a < b,
  ">=": (a: any, b: any) => a >= b,
  "<=": (a: any, b: any) => a <= b,
  "==": (a: any, b: any) => a == b,
  "!=": (a: any, b: any) => a != b,
  "eq": (a: any, b: any) => a === b,
  "neq": (a: any, b: any) => a !== b,
  "in": (a: any, b: any[]) => Array.isArray(b) && b.includes(a),
  "nin": (a: any, b: any[]) => Array.isArray(b) && !b.includes(a),
};
