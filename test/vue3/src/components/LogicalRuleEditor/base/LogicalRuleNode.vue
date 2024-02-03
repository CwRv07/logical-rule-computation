<script setup lang="ts">
import { toRef, ref, watch } from "vue";
import {
  LogicalRuleItem,
  ComparisonRuleItem,
  LOGICAL_OPERATOR,
  isLogicalRule,
} from "logical-rule-computation";
import { Switch, Button } from "ant-design-vue";
import {
  PlusOutlined,
  DeleteOutlined,
  FullscreenExitOutlined,
} from "@ant-design/icons-vue";
import RuleNode from "./RuleNode.vue";
const rule = defineModel<LogicalRuleItem>({ required: true });
const emits = defineEmits<{
  "delete-rule": [];
  "transform-rule": [];
}>();
const state = ref({
  checked: rule.value[0] === LOGICAL_OPERATOR.ALL,
  decortationLine: {
    top: 16,
    bottom: 16,
  },
});

/* 修改逻辑运算符 */
const handleLogicalOperatorChange = () => {
  rule.value[0] =
    rule.value[0] === LOGICAL_OPERATOR.ALL
      ? LOGICAL_OPERATOR.ANY
      : LOGICAL_OPERATOR.ALL;
};

/* 动态绘制逻辑规则的装饰线 */
const ruleListEl = ref<HTMLDivElement>();
const decortationLine = toRef(state.value, "decortationLine");
watch(
  () => rule.value[1],
  () => {
    const height =
      (ruleListEl.value?.firstElementChild?.clientHeight ?? 0) - 10;
    if (height > 0 && height / 2 !== decortationLine.value.top) {
      decortationLine.value.top = height / 2;
    }
  },
  { deep: true, flush: "post" }
);

/* 规则增删管理-start */
const handleAddRule = (
  newRule: LogicalRuleItem | ComparisonRuleItem,
  index = rule.value[1].length,
  replace = false
) => {
  rule.value[1].splice(index, replace ? 1 : 0, newRule);
};
const handleDeleteRule = (index: number) => {
  rule.value[1].splice(index, 1);
};

const handlePushComparisonRule = (
  newRule: ComparisonRuleItem = ["", "", , ""]
) => {
  handleAddRule(newRule);
};

const handleTransformRule = (
  rule: LogicalRuleItem | ComparisonRuleItem,
  index: number
) => {
  if (isLogicalRule(rule)) {
    const newRule: ComparisonRuleItem = (rule[1].find(
      (item) => !isLogicalRule(item)
    ) ?? ["", "", , ""]) as ComparisonRuleItem;
    handleAddRule(newRule, index, true);
  } else {
    const newRule: LogicalRuleItem = [
      LOGICAL_OPERATOR.ALL,
      [rule, ["", "", , ""]],
      "",
    ];
    handleAddRule(newRule, index, true);
  }
};
/* 规则增删管理-end */
</script>

<template>
  <div class="logical-rule-node">
    <div
      class="logical-operator"
      :style="{
        '--custom-decoration-line-top': `${state.decortationLine.top}px`,
        '--custom-decoration-line-bottom': `${state.decortationLine.bottom}px`,
      }"
    >
      <Switch
        v-model:checked="state.checked"
        @change="handleLogicalOperatorChange"
        checked-children="且"
        un-checked-children="或"
        :style="{ 'background-color': state.checked ? '' : '#41b883' }"
      />
    </div>
    <div class="children-rule">
      <div class="rule-list" ref="ruleListEl">
        <template v-for="(item, index) in rule[1]" :key="item[item.length - 1]">
          <RuleNode
            :model-value="item"
            @update:model-value="(e:typeof item) => (rule[1][index] = e)"
            @delete-rule="handleDeleteRule(index)"
            @transform-rule="handleTransformRule(item, index)"
          />
        </template>
      </div>
      <div class="action-bar">
        <Button
          class="action-new"
          type="text"
          @click="handlePushComparisonRule()"
        >
          <PlusOutlined />
        </Button>
        <Button class="action-delete" type="text" @click="emits('delete-rule')">
          <DeleteOutlined />
        </Button>
        <Button
          class="action-transform"
          type="text"
          @click="emits('transform-rule')"
        >
          <FullscreenExitOutlined />
        </Button>
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
      top: var(--custom-decoration-line-top);
      bottom: var(--custom-decoration-line-bottom);
      left: 22px;
      width: 43px;
      border: 1px solid #ccc;
      border-right: 0px;
      content: "";
    }
  }

  .children-rule {
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    .rule-list > * {
      padding: 10px 0;
      &:first-child {
        padding-top: 0px;
      }
      &:nth-last-child(n + 2) {
        border-bottom: 1px dashed #ccc;
      }
    }
    .action-bar {
      width: 100%;
      height: 32px;
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      border: 1px dashed #ccc;
      border-radius: 6px;
      background-color: #f5f5f5;
      > * {
        flex: 1;
        height: 100%;
      }
    }
  }
}
</style>
