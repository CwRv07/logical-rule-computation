<script setup lang="ts">
import { defineModel } from 'vue';
import { RuleOptions } from 'logical-rule-computation';
import RuleNode from './RuleNode.vue';
const rules=defineModel<RuleOptions>({required:true})
</script>

<template>
  <RuleNode v-model="rules" />
</template>

<style scoped>

</style>
