<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import dayjs from 'dayjs';
import { LOGICAL_OPERATOR, type RuleOptions } from "logical-rule-computation";
import LogicalRuleEditor from "./components/LogicalRuleEditor/index.vue";
import {
  RuleEditorProps,
  FieldInputType,
} from "./components/LogicalRuleEditor/types";
const rules: Ref<RuleOptions> = ref([
  LOGICAL_OPERATOR.ALL,
  [
    [
      LOGICAL_OPERATOR.ALL,
      [
        ["<", "count$$totalCount", 5, "a < 1"],
        [">", "count$$totalCount", 0, ""],
      ],
      "",
    ],
    [
      "between-date",
      "time$$registration-time",
      [dayjs("2024-02-01T02:56:33.483Z"), dayjs("2024-02-16T02:56:33.483Z")],
      "",
    ],
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
      {
        label: "年级",
        value: "grade",
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
                  label: "大一",
                  value: "college-1",
                },
                {
                  label: "大二",
                  value: "college-2",
                },
                {
                  label: "大三",
                  value: "college-3",
                },
                {
                  label: "大四",
                  value: "college-4",
                },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    label: "时间限制",
    value: "time",
    isLeaf: false,
    children: [
      {
        label: "报名时间",
        value: "registration-time",
        isLeaf: true,
        operations: [
          {
            label: "早于-日期",
            value: "less-date",
            type: FieldInputType.date,
          },
          {
            label: "区间-日期",
            value: "between-date",
            type: FieldInputType.dateRange,
          },
          {
            label: "早于-时间",
            value: "less-time",
            type: FieldInputType.time,
          },
          {
            label: "区间-时间",
            value: "between-time",
            type: FieldInputType.timeRange,
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
