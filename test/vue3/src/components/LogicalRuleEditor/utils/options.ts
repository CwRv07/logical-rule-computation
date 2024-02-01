import { FieldLeafOption, FieldParentOption } from "../types";

export const isFieldLeafOption = (
  option: FieldParentOption | FieldLeafOption
): option is FieldLeafOption => {
  return option.isLeaf;
};
