<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import { LOGICAL_OPERATOR, type RuleOptions } from "logical-rule-computation";
import LogicalRuleEditor from "./components/LogicalRuleEditor/index.vue";
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
</script>

<template>
  <LogicalRuleEditor v-model="rules" />
</template>

<style scoped>
div {
  color: red;
}
</style>
