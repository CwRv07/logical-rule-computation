/**
 * @desc 运算规则类型
 */
export type OperationRule = (...props: any[]) => boolean;

/**
 * @desc 运算规则集合
 * @example
 *  {
 *    ">":(a,b)=>a>b,
 *    "<":(a,b)=>a<b
 *  }
 */
export type Operations = Record<string, OperationRule>;
