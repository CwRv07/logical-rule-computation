<script setup lang="ts">
import { Cascader, Select, Button } from "ant-design-vue";
import { DeleteOutlined } from "@ant-design/icons-vue";
</script>

<template>
  <div class="rule-node">
    <Cascader class="rule-field"/>
    <Select class="rule-operator" />
    <Select class="rule-value" />
    <div class="action-bar">
      <Button class="action-delete" type="dashed" shape="circle" size="small">
        <DeleteOutlined />
      </Button>
    </div>
  </div>
</template>

<style scoped>
.rule-node {
  display: flex;
  align-items: center;
  gap: 10px;
  .rule-field{
    width: 250px;
  }
  .rule-operator{
    width: 150px;
  }
  .rule-value{
    width: 250px;
  }
  .action-bar{
    margin-left: 5px;
  }
}
</style>
