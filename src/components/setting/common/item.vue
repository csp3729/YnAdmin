<template :inheritAttrs="false">
  <div class="config-item">
    <span class="item--label">{{ title }}</span>
    <div class="item--content">
      <slot v-if="slot" :name="slot" />
      <el-switch
        v-if="type === 'switch'"
        v-model="value"
        v-bind="$attrs"
        :disabled="isDisabled"
        size="small"
      />
      <el-select
        v-if="type === 'select'"
        v-model="value"
        v-bind="$attrs"
        :disabled="isDisabled"
        size="small"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-input-number
        v-if="type === 'number'"
        v-model="value"
        v-bind="$attrs"
        :disabled="isDisabled"
        size="small"
        controls-position="right"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { store } from '@uts/instance';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: '',
  },
  disabled: {
    type: Function,
    default() {},
  },
  model: {
    type: String,
    // required: false,
    default: '',
  },
  options: {
    type: Array,
    default: () => [],
  },
  slot: {
    type: String,
    default: '',
  },
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

  .item--label {
    font-size: 14px;
  }

  .item--content {
    :deep(.el-input__inner) {
      width: 120px;
    }
    text-align: right;
  }

  :deep(.el-input-number--small) {
    width: 120px;
    height: 28px;
  }
}
</style>
