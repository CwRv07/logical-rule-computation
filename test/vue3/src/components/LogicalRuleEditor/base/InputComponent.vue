<script setup lang="ts">
import {
  Input,
  InputNumber,
  Select,
  DatePicker,
  RangePicker,
  TimePicker,
  TimeRangePicker,
} from "ant-design-vue";
import { FieldInputType } from "../types";
const props = defineProps<{
  type: FieldInputType;
  componentProps?: Record<string, any>;
}>();
const value = defineModel<any>();
</script>

<template>
  <InputNumber
    class="w-250px"
    v-if="props.type === FieldInputType.number"
    v-model:value="value"
    v-bind="props.componentProps"
  />
  <Input
    class="w-250px"
    v-else-if="props.type === FieldInputType.text"
    v-model:value="value"
    v-bind="props.componentProps"
  />
  <Select
    class="w-250px"
    v-else-if="props.type === FieldInputType.select"
    v-model:value="value"
    v-bind="props.componentProps"
  />
  <DatePicker
    class="w-250px"
    v-else-if="props.type === FieldInputType.date"
    v-model:value="value"
    v-bind="props.componentProps"
  />
  <RangePicker
    class="w-250px"
    v-else-if="props.type === FieldInputType.dateRange"
    v-model:value="value"
    v-bind="props.componentProps"
  />
  <TimePicker
    class="w-250px"
    v-else-if="props.type === FieldInputType.time"
    v-model:value="value"
    v-bind="props.componentProps"
  />
  <TimeRangePicker
    class="w-250px"
    v-else-if="props.type === FieldInputType.timeRange"
    v-model:value="value"
    v-bind="props.componentProps"
  />
</template>

<style scoped>
.w-250px {
  width: 250px;
}
</style>
