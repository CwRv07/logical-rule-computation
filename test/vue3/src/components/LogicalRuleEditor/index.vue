<script setup lang="ts">
import RuleNode from "./base/RuleNode.vue";
import { RuleOptions } from "logical-rule-computation";
import { RuleEditorProps } from "./types";
import { provide } from "vue";
const props = defineProps<{
  fieldOptions: RuleEditorProps["fieldOptions"];
}>();
const rules = defineModel<RuleOptions>({ required: true, default: [] });
provide("field-options", props.fieldOptions);
</script>

<template>
  <div class="logical-rule-editor">
    <RuleNode v-model="rules" />
  </div>
</template>

<style scoped></style>
