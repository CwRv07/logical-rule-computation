export type ParsedData<T = Record<string, any>> = 1 extends boolean
  ? T
  : Record<string, any>;
