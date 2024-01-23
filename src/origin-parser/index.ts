import { ParsedData } from "@/types/Origin";

/**
 * @desc 解析待验证数据源，将数据对象扁平化
 * @example
 * 输入：{ a: { b: "123", c: null }, d: [1,2], e:true, f:function(){} }
 * 输出：{ a.b: "123", a.c: null, d: [1,2], e:true, f:null }
 */
export const originParser = <T extends Record<string, any>>(
  origin: T
): ParsedData<T> => {
  const parsedData: ParsedData<T> = {};
  const next = (prefix: string, object: Record<string, any>) => {
    Reflect.ownKeys(object).forEach(((key: string) => {
      if (
        object[key] === null ||
        object[key] === undefined ||
        typeof object[key] === "function"
      ) {
        // 空的情况下代入null
        parsedData[connectKey(prefix,key)] = null;
      } else if (
        typeof object[key] === "object" &&
        !Array.isArray(object[key])
      ) {
        // 对象的情况递归
        next(connectKey(prefix,key), object[key]);
      } else {
        // 数组和基本数据类型直接代入
        parsedData[connectKey(prefix,key)] = object[key];
      }
    }) as (key: string | symbol) => void);
  };

  next("", origin);
  return parsedData;
};

const connectKey = (prefix: string, key: string, spaceMark: string = ".") => {
  return prefix? prefix + spaceMark + key : key;
};
