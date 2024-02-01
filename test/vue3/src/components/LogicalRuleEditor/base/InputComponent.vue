<script setup lang="ts">
import { Input, InputNumber } from "ant-design-vue";
import { FieldInputType } from "../types";
const props = defineProps<{
  type: FieldInputType;
  componentProps?: Record<string, any>;
}>();
const value = defineModel<number | string>();
</script>

<template>
  <InputNumber
    class="w-200px"
    v-if="props.type === FieldInputType.number"
    v-model="value"
    v-bind="props.componentProps"
  />
  <Input
    class="w-200px"
    v-else-if="props.type === FieldInputType.text"
    v-model="value"
    v-bind="props.componentProps"
  />
</template>

<style scoped>
.w-200px {
  width: 200px;
}
</style>
