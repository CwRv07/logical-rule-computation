<script setup lang="ts">
import { inject, ref, computed } from "vue";
import { type ComparisonRuleItem } from "logical-rule-computation";
import {
  Cascader,
  Select,
  Button,
  type CascaderProps,
  type SelectProps,
} from "ant-design-vue";
import { DeleteOutlined, FullscreenOutlined } from "@ant-design/icons-vue";
import { RuleEditorProps, FieldLeafOption, FieldParentOption } from "../types";
import {
  isFieldLeafOption,
  INTERVAL_CHAR,
  getFieldOptionsByValue,
} from "../utils";
import InputComponent from "./InputComponent.vue";

const rule = defineModel<ComparisonRuleItem>({ required: true });
const emits = defineEmits<{
  "delete-rule": [];
  "transform-rule": [];
}>();
const fieldOptions = inject<RuleEditorProps["fieldOptions"]>("field-options")!;

const TRY_INIT_OPTION = getFieldOptionsByValue(fieldOptions, rule.value[1]);
const state = ref<{
  selectedLeafOption: FieldLeafOption | null;
  selectedOperation: FieldLeafOption["operations"][0] | null;
}>({
  selectedLeafOption: (() =>
    isFieldLeafOption(TRY_INIT_OPTION) ? TRY_INIT_OPTION : null)(),
  selectedOperation: (() =>
    isFieldLeafOption(TRY_INIT_OPTION)
      ? TRY_INIT_OPTION.operations.find(
          (item) => item.value === rule.value[0]
        ) || null
      : null)(),
});

const cascaderValue = computed({
  get: () => rule.value[1].split(INTERVAL_CHAR),
  set: (selectedValues) => (rule.value[1] = selectedValues.join(INTERVAL_CHAR)),
});
const operatorSelectOptions = computed(() => {
  const operations = state.value.selectedLeafOption?.operations ?? [];
  return operations.map(({ label, value, type, options }) => ({
    label,
    value,
    _type: type,
    _options: options,
  }));
});

const handleFieldSelect = (
  _: string[],
  selectedOptions: (FieldParentOption | FieldLeafOption)[]
) => {
  const currentOptions = selectedOptions[selectedOptions.length - 1];
  if (
    isFieldLeafOption(currentOptions) &&
    state.value.selectedLeafOption !== currentOptions
  ) {
    state.value.selectedLeafOption = currentOptions;
    state.value.selectedOperation = null;
    rule.value[0] = rule.value[2] = "";
  } else {
    state.value.selectedLeafOption = null;
    state.value.selectedOperation = null;
    rule.value[0] = rule.value[2] = "";
  }
};
const handleOperatorSelect = (_: string, selectedOption: any) => {
  const { label, value, _type: type, _options: options } = selectedOption;
  state.value.selectedOperation = { label, value, type, options };
};
</script>

<template>
  <div class="comparison-rule-node">
    <Cascader
      class="rule-field"
      v-model:value="cascaderValue"
      :options="fieldOptions"
      change-on-select
      @change="handleFieldSelect as CascaderProps['onChange']"
      placeholder="请选择条件字段"
    />
    <Select
      v-if="state.selectedLeafOption"
      class="rule-operator"
      v-model:value="rule[0]"
      :options="operatorSelectOptions"
      @change="handleOperatorSelect as SelectProps['onChange']"
      placeholder="请选择运算符"
    />
    <InputComponent
      v-if="state.selectedOperation"
      v-model="rule[2]"
      :type="state.selectedOperation.type"
      :component-props="state.selectedOperation.options"
    />
    <div class="action-bar">
      <Button
        class="action-delete"
        type="dashed"
        shape="circle"
        size="small"
        @click="emits('delete-rule')"
      >
        <DeleteOutlined />
      </Button>
      <Button
        class="action-transform"
        type="dashed"
        shape="circle"
        size="small"
        @click="emits('transform-rule')"
      >
        <FullscreenOutlined />
      </Button>
    </div>
  </div>
</template>

<style scoped>
.comparison-rule-node {
  display: flex;
  align-items: center;
  gap: 10px;
  .rule-field {
    width: 250px;
  }
  .rule-operator {
    width: 150px;
  }
  .action-bar {
    margin-left: 5px;
    display: flex;
    flex-wrap: nowrap;
    gap: 2px;
    overflow-x: auto;
  }
}
</style>
