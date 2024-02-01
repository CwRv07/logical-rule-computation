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
    ["==", "a", 1, "a == 1"],
    [">", "b.b1", 1, "b > 1"],
    [
      LOGICAL_OPERATOR.ANY,
      [
        ["eq", "b.b3", null, "b.b3 === null"],
        ["neq", "b.b3", null, "b.b3 !== null"],
      ],
      "b.b3 === null || b.b3 !== null",
    ],
    [
      LOGICAL_OPERATOR.ANY,
      [
        ["eq", "b.b3", null, "b.b3 === null"],
        ["neq", "b.b3", null, "b.b3 !== null"],
      ],
      "b.b3 === null || b.b3 !== null",
    ],
    [">", "b.b1", 1, "b > 1"],
  ],
  "a == 1 && b > 1",
]);
const fieldOptions = ref<RuleEditorProps["fieldOptions"]>([
  {
    label: "人数",
    value: "count",
    isLeaf: false,
    children: [
      {
        label: "总人数",
        value: "count.total",
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
]);
</script>

<template>
  <LogicalRuleEditor v-model="rules" :fieldOptions="fieldOptions" />
</template>

<style scoped>
div {
  color: red;
}
</style>
