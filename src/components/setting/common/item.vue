<template :inheritAttrs="false">
  <div class="config-item">
    <span class="label">{{ title }}</span>
    <div class="content">
      <slot v-if="slot" :name="slot" />
      <el-switch
        v-if="type === 'switch'"
        v-bind="$attrs"
        v-model="value"
        :disabled="isDisabled"
        size="mini" />
      <el-select
        v-if="type === 'select'"
        v-bind="$attrs"
        v-model="value"
        :disabled="isDisabled"
        size="mini">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value" />
      </el-select>
      <el-input-number
        v-if="type === 'number'"
        v-bind="$attrs"
        v-model="value"
        :disabled="isDisabled"
        size="mini"
        controls-position="right" />
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue';
import { store } from '@uts/instance';

const props = defineProps({
  title: String,
  type: String,
  disabled: {
    type: Function,
    default() {},
  },
  model: {
    type: String,
    // required: true,
  },
  options: {
    type: Array,
    default: () => [],
  },
  slot: String,
});

const value = computed({
  get: () => store.getters[props.model],
  set: (val) => store.dispatch('ChangeSetting', { key: props.model, value: val }),
});

const isDisabled = computed(props.disabled);

</script>

<style lang="scss" scoped>
.config-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:not(:last-child) {
    margin-bottom: 20px;
  }

  .label {
    font-size: 14px;
  }

  .content {
    width: 120px;
    text-align: right;
  }

  :deep(.el-input-number--mini) {
    width: 120px;
    height: 28px;
    &.is-controls-right .el-input-number__increase {
      top: 1.5px;
    }
  }
}
</style>
