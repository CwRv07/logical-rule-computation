<script setup lang="ts">
import {
  ComparisonRuleItem,
  LogicalRuleItem,
  RuleOptions,
  isLogicalRule,
} from "logical-rule-computation";
import LogicalRuleNode from "./LogicalRuleNode.vue";
import ComparisonRuleNode from "./ComparisonRuleNode.vue";

const rule = defineModel<RuleOptions>({ required: true });
const emits = defineEmits<{
  "delete-rule": [];
  "transform-rule": [];
}>();
</script>

<template>
  <LogicalRuleNode
    v-if="isLogicalRule(rule)"
    v-model="(rule as LogicalRuleItem)"
    @delete-rule="emits('delete-rule')"
    @transform-rule="emits('transform-rule')"
  />
  <ComparisonRuleNode
    v-else
    v-model="(rule as ComparisonRuleItem)"
    @delete-rule="emits('delete-rule')"
    @transform-rule="emits('transform-rule')"
  />
</template>

<style scoped></style>
