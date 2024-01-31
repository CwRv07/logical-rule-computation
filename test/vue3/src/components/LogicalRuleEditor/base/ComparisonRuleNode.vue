<script setup lang="ts">
import { type ComparisonRuleItem } from "logical-rule-computation";
import { Cascader, Select, Button } from "ant-design-vue";
import { DeleteOutlined, FullscreenOutlined } from "@ant-design/icons-vue";
const rule = defineModel<ComparisonRuleItem>({ required: true });
const emits = defineEmits<{
  "delete-rule": [];
  "transform-logical-rule": [];
}>();
</script>

<template>
  <div class="comparison-rule-node">
    <Cascader class="rule-field" :placeholder="rule[1]" />
    <Select class="rule-operator" :placeholder="rule[0]" />
    <Select class="rule-value" :placeholder="String(rule[2])" />
    <div class="action-bar">
      <Button
        class="action-delete"
        type="dashed"
        shape="circle"
        size="small"
        @click="emits('delete-rule')"
      >
        <DeleteOutlined />
      </Button>
      <Button
        class="action-transform"
        type="dashed"
        shape="circle"
        size="small"
        @click="emits('transform-logical-rule')"
      >
        <FullscreenOutlined />
      </Button>
    </div>
  </div>
</template>

<style scoped>
.comparison-rule-node {
  display: flex;
  align-items: center;
  gap: 10px;
  .rule-field {
    width: 250px;
  }
  .rule-operator {
    width: 150px;
  }
  .rule-value {
    width: 250px;
  }
  .action-bar {
    margin-left: 5px;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
  }
}
</style>
