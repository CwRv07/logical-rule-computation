import { Operations } from "@/types/Operations";

export const DefaultOperations:Operations = {
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
