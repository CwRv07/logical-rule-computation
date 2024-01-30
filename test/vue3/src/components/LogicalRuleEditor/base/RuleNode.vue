<script setup lang="ts">
import { ref } from "vue";
import {
  ComparisonRuleItem,
  LogicalRuleItem,
  RuleOptions,
  isLogicalRule,
} from "logical-rule-computation";
import LogicalRuleNode from "./LogicalRuleNode.vue";
import ComparisonRuleNode from "./ComparisonRuleNode.vue";
const rule = defineModel<RuleOptions>({ required: true });

const state = ref({
  isLogicalRule: isLogicalRule(rule.value),
});

/* 逻辑规则监听 */

</script>

<template>
  <LogicalRuleNode
    v-if="state.isLogicalRule"
    v-model="(rule as LogicalRuleItem)"
  />
  <ComparisonRuleNode v-else v-model="(rule as ComparisonRuleItem)" />
</template>

<style scoped></style>
