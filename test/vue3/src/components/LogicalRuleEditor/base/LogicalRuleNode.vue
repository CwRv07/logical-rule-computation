<script setup lang="ts">
import { ref } from "vue";
import { LogicalRuleItem, LOGICAL_OPERATOR } from "logical-rule-computation";
import { Switch, Button } from "ant-design-vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import RuleNode from "./RuleNode.vue";
const rule = defineModel<LogicalRuleItem>({ required: true });

const state = ref({
  checked: rule.value[0] === LOGICAL_OPERATOR.ALL,
});

// 逻辑运算符
const handleLogicalOperatorChange = () => {
  rule.value[0] =
    rule.value[0] === LOGICAL_OPERATOR.ALL
      ? LOGICAL_OPERATOR.ANY
      : LOGICAL_OPERATOR.ALL;
};
</script>

<template>
  <div class="logical-rule-node">
    <div class="logical-operator">
      <Switch
        v-model:checked="state.checked"
        @change="handleLogicalOperatorChange"
        checked-children="且"
        un-checked-children="或"
        :style="{ 'background-color': state.checked ? '' : '#41b883' }"
      />
    </div>
    <div class="comparison-rule">
      <div class="rule-list">
        <template v-for="(item, index) in rule[1]" :key="item[item.length - 1]">
          <RuleNode
            :model-value="item"
            @update:model-value="(e) => (rule[1][index] = e)"
          />
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
