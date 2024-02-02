import { FieldLeafOption, FieldParentOption, FieldOptions } from "../types";

export const INTERVAL_CHAR = "$$";

export const isFieldLeafOption = (
  option: FieldParentOption | FieldLeafOption | undefined | null
): option is FieldLeafOption => {
  return option != null && option.isLeaf;
};

export const getFieldOptionsByValue = (
  options: FieldOptions,
  value: string
) => {
  const selectedValues = value.split(INTERVAL_CHAR);
  let selectedOptions: FieldParentOption | FieldLeafOption | undefined = {
    children: options,
  } as FieldParentOption;
  for (let i = 0; i < selectedValues.length; i++) {
    selectedOptions = (selectedOptions as FieldParentOption).children.find(
      (item) => item.value === selectedValues[i]
    );
    if (
      selectedOptions == null ||
      (isFieldLeafOption(selectedOptions) && i !== selectedValues.length - 1)
    ) {
      return null;
    }
  }
  return selectedOptions;
};
