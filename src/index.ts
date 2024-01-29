// @types
export type * from "./types/Operations";
export type * from "./types/Origin";
export type * from "./types/Report";
export type * from "./types/Rule";

// @main
export * from "@/calculator";
import { calc } from "@/calculator";

export default {
  calc,
};
