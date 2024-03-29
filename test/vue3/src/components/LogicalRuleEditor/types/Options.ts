import { OperationRule } from "logical-rule-computation";

export type FieldOptions = (FieldParentOption | FieldLeafOption)[];

export type FieldParentOption = {
  label: string;
  value: string;
  isLeaf: false;
  children: (FieldParentOption | FieldLeafOption)[];
};

export type FieldLeafOption = {
  label: string;
  value: string;
  isLeaf: true;
  operations: OperationOption[];
};

export type OperationOption = {
  label: string;
  value: string;
  type: FieldInputType;
  options?: Record<string, any>;
};

export enum FieldInputType {
  number = "number",
  text = "text",
  select = "select",
  date = "date",
  dateRange = "date-range",
  time = "time",
  timeRange = "time-range",
}

export type OperatorOptions = Record<string, OperationRule>;
