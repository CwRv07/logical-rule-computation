<script setup lang="ts">
import { ref } from "vue";
import { Switch, Button } from "ant-design-vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import RuleNode from "./RuleNode.vue";

const state = ref({
  checked: true,
});
</script>

<template>
  <div class="rule-group">
    <div class="logical-operator">
      <Switch
        v-model:checked="state.checked"
        checked-children="且"
        un-checked-children="或"
        :style="{ 'background-color': state.checked ? '' : '#41b883' }"
      />
    </div>
    <div class="comparison-rule">
      <div class="rule-list">
        <RuleNode v-for="index of 5" :key="index" />
      </div>
      <div class="action-bar">
        <Button class="action-new" type="dashed"><PlusOutlined /></Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rule-group {
  display: flex;

  .logical-operator {
    position: relative;
    display: flex;
    align-items: center;

    &::before {
      position: absolute;
      display: block;
      top: 26px;
      bottom: calc(26px + 32px);
      left: 22px;
      width: 45px;
      border: 1px solid #ccc;
      border-right: 0px;
      content: "";
    }
  }

  .comparison-rule {
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    .rule-list > * {
      padding: 10px 0px;

      &:nth-last-child(n + 2) {
        border-bottom: 1px dashed #ccc;
      }
    }
    .action-bar {
      .action-new{
        width: 100%
      }
    }
  }
}
</style>
