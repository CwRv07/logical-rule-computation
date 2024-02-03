<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import { LOGICAL_OPERATOR, type RuleOptions } from "logical-rule-computation";
import LogicalRuleEditor from "./components/LogicalRuleEditor/index.vue";
import {
  RuleEditorProps,
  FieldInputType,
} from "./components/LogicalRuleEditor/types";
const rules: Ref<RuleOptions> = ref([
  LOGICAL_OPERATOR.ALL,
  [
    ["<", "count$$totalCount", 5, "a < 1"],
    [">", "count$$totalCount", 0, "b > 0"],
  ],
]);
const fieldOptions = ref<RuleEditorProps["fieldOptions"]>([
  {
    label: "人数限制",
    value: "count",
    isLeaf: false,
    children: [
      {
        label: "总人数",
        value: "totalCount",
        isLeaf: true,
        operations: [
          {
            label: "等于",
            value: "eq",
            type: FieldInputType.number,
          },
          {
            label: "少于",
            value: "<",
            type: FieldInputType.number,
          },
          {
            label: "多于",
            value: ">",
            type: FieldInputType.number,
          },
        ],
      },
    ],
  },
  {
    label: "参赛范围",
    value: "range",
    isLeaf: false,
    children: [
      {
        label: "学院",
        value: "college",
        isLeaf: true,
        operations: [
          {
            label: "属于",
            value: "in",
            type: FieldInputType.select,
            options: {
              mode: "multiple",
              options: [
                {
                  label: "计算机学院",
                  value: "computer-college",
                },
                {
                  label: "数学学院",
                  value: "math-college",
                },
                {
                  label: "农学院",
                  value: "agriculture-college",
                },
              ],
            },
          },
          {
            label: "不属于",
            value: "nin",
            type: FieldInputType.select,
          },
        ],
      },
    ],
  },
]);
</script>

<template>
  <LogicalRuleEditor v-model="rules" :fieldOptions="fieldOptions" />
  <div style="white-space: pre-wrap">
    {{ JSON.stringify(rules, undefined, 2) }}
  </div>
</template>

<style scoped>
div {
  color: red;
}
</style>
