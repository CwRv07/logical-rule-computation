import { calc } from "../dist/es/index.js";

const result = calc(
  [
    "all",
    [
      ["==", "a", 1, "a == 1"],
      [">", "b.b1", 1, "b > 1"],
      ["any", [["eq", "b.b3", undefined, "b.b3 == null"]]],
    ],
    "a == 1 && b > 1",
  ],
  { a: 1, b: { b1: 2, b3: null } },
  { generateReport: true }
);
console.log(result);
