<script setup lang="ts">
import { defineModel } from "vue";
import {
  ComparisonRuleItem,
  LogicalRuleItem,
  isLogicalRule,
} from "logical-rule-computation";
import LogicalRuleNode from "./LogicalRuleNode.vue";
import ComparisonRuleNode from "./ComparisonRuleNode.vue";
const rule = defineModel<LogicalRuleItem | ComparisonRuleItem>({
  required: true,
});
</script>

<template>
  <template v-if="isLogicalRule(rule)">
    <LogicalRuleNode v-model="(rule as LogicalRuleItem)" />
  </template>
  <template v-else>
    <ComparisonRuleNode v-model="(rule as ComparisonRuleItem)" />
  </template>
</template>

<style scoped></style>
