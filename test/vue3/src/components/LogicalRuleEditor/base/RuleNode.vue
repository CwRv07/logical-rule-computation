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
const emits = defineEmits<{
  "delete-rule": [];
  "transform-logical-rule": [];
}>();

const state = ref({
  isLogicalRule: isLogicalRule(rule.value),
});
</script>

<template>
  <LogicalRuleNode
    v-if="state.isLogicalRule"
    v-model="(rule as LogicalRuleItem)"
    @delete-rule="emits('delete-rule')"
    @transform-logical-rule="emits('transform-logical-rule')"
  />
  <ComparisonRuleNode
    v-else
    v-model="(rule as ComparisonRuleItem)"
    @delete-rule="emits('delete-rule')"
    @transform-logical-rule="emits('transform-logical-rule')"
  />
</template>

<style scoped></style>
