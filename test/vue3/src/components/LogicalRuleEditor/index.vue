<script setup lang="ts">
import { defineModel } from "vue";
import RuleGroup from "./base/RuleGroup.vue";
import { RuleOptions } from "logical-rule-computation";
const rules = defineModel<RuleOptions>({
  default: [],
});
</script>

<template>
  <div class="logical-rule-editor">
    <RuleGroup v-model="rules"/>
  </div>
</template>

<style scoped>
</style>
