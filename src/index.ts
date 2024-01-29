// @types
export type * from "./types/Operations";
export type * from "./types/Origin";
export type * from "./types/Report";
export type * from "./types/Rule";

// @main
import { calc, LOGICAL_OPERATOR } from "@/calculator";

export { calc, LOGICAL_OPERATOR };
export default {
  calc,
};
