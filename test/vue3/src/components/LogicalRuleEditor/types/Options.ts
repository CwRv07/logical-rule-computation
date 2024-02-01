import { OperationRule } from "logical-rule-computation";

export type FieldOptions = (FieldParentOption | FieldLeafOption)[];

export type FieldParentOption = {
  label: string;
  value: string;
  isLeaf: false;
  children?: (FieldParentOption|FieldLeafOption)[];
};

export type FieldLeafOption = {
  label: string;
  value: string;
  isLeaf: true;
  operations: {
    label: string;
    value: string;
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
