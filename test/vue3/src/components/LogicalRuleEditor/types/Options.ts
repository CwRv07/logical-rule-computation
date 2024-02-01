import { OperationRule } from "logical-rule-computation";

export type FieldOptions = (FieldParentOption | FieldLeafOption)[];

export type FieldParentOption = {
  label: string;
  value: string;
  children?: (FieldParentOption|FieldLeafOption)[];
};

export type FieldLeafOption = {
  label: string;
  value: string;
  operations: {
    label: string;
    operator: string;
    type: FieldInputType,
    options?: Record<string, any>;
  }[]
}

export enum FieldInputType{
  number = 'number',
  text = 'text',
  select = 'select',
  date = 'date',
  datetime = 'datetime'
}


export type OperatorOptions = Record<string, OperationRule>;
