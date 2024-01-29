<script setup lang="ts">
import { ref, defineModel } from "vue";
import { LogicalRuleItem, LOGICAL_OPERATOR } from "logical-rule-computation";
import { Switch, Button } from "ant-design-vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import RuleNode from "./RuleNode.vue";
const rule = defineModel<LogicalRuleItem>({ required: true });
const state = ref({
  checked: rule.value[0] === LOGICAL_OPERATOR.ALL,
});
</script>

<template>
  <div class="logical-rule-node">
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
        <template v-for="item in rule[1]" :key="item.join(',')">
          <RuleNode :modelValue="item" @update:modelValue="(console as any)" />
        </template>
      </div>
      <div class="action-bar">
        <Button class="action-new" type="dashed"><PlusOutlined /></Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.logical-rule-node {
  display: flex;

  .logical-operator {
    position: relative;
    display: flex;
    align-items: center;

    &::before {
      position: absolute;
      display: block;
      top: 26px;
      /* bottom: calc(26px + 32px); */
      bottom: 16px;
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
      .action-new {
        width: 100%;
      }
    }
  }
}
</style>
