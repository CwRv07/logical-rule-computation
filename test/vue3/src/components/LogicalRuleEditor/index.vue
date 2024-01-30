<script setup lang="ts">
import RuleNode from "./base/RuleNode.vue";
import { RuleOptions } from "logical-rule-computation";
const rules = defineModel<RuleOptions>({ required: true, default: [] });
</script>

<template>
  <div class="logical-rule-editor">
    <RuleNode v-model="rules" />
  </div>
</template>

<style scoped></style>
