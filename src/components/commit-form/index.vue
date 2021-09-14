<template>
  <el-form
    ref="formRef"
    :model="form"
    :label-width="config.labelWidth || 100"
    :label-position="config.position || 'right'"
    :rules="config.rules"
    :size="config.size || 'small'"
  >
    <template v-for="(item, index) in (config.items || items)" :key="index">
      <el-form-item :label="item.label" :prop="item.prop">
        <slot v-if="item.slot" :name="item.slot" />
        <template v-else>
          <el-input
            v-if="['input','textarea'].indexOf(item.type) > -1"
            v-model="form[item.prop]"
            :type="item.mode || item.type"
            :placeholder="item.placeholder || `请输入${item.label}`"
            :disabled="item.disabled"
            :minlength="item.min"
            :maxlength="item.max"
            show-word-limit
            clearable
          />
          <el-select
            v-if="item.type === 'select'"
            v-model="form[item.prop]"
            :value-key="item.valueKey"
            :placeholder="item.placeholder || `请选择${item.label}`"
            :disabled="item.disabled"
            clearable
          >
            <el-option
              v-for="(opt, index) in item.options" :key="index"
              :label="opt.label"
              :value="opt.value"
              :disabled="opt.disabled"
            />
          </el-select>
          <el-time-picker
            v-if="item.type === 'time'"
            v-model="form[item.prop]"
            :default-value="modelValue[item.prop] || item.default"
            :placeholder="item.placeholder || `请选择${item.label}`"
            :disabled="item.disabled"
            :is-range="item.isRange"
            :arrow-control="item.arrow"
            :format="item.format"
            :disabled-hours="item.disabledHours"
            :disabled-minutes="item.disabledMinutes"
            :disabled-seconds="item.disabledSeconds"
            clearable
          />
          <el-date-picker
            v-if="item.type === 'date'"
            :type="item.model || 'date'"
            v-model="form[item.prop]"
            :default-time="modelValue[item.prop]"
            :placeholder="item.placeholder || '请选择日期'"
            :range-separator="item.separator || '至'"
            :start-placeholder="item.startPlaceholder || '请选择开始日期'"
            :end-placeholder="item.endPlaceholder || '请选择结束日期'"
            :disabled="item.disabled"
            :format="item.format"
            clearable
          />
          <el-radio-group
            v-if="item.type === 'radio'"
            v-model="form[item.prop]"
          >
            <template v-for="(opt, index) in item.options" :key="index">
              <el-radio-button v-if="item.button" :label="opt.value">{{ opt.label }}</el-radio-button>
              <el-radio v-else :label="opt.value">{{ opt.label }}</el-radio>
            </template>
          </el-radio-group>
          <el-checkbox-group
            v-if="item.type === 'checked'"
            v-model="form[item.prop]"
          >
            <el-checkbox v-for="(opt, index) in item.options" :key="index" :label="opt" />
          </el-checkbox-group>
        </template>
      </el-form-item>
    </template>
    <el-form-item :class="locaAct(config.actions?.align)">
      <el-button :disabled="disabled" @click="handleClear">清空</el-button>
      <el-button type="primary" :disabled="disabled" @click="handleSubmit">{{ config.actions.confirmText || '提交' }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import {
  ref, unref, computed, defineProps, defineEmits,
} from 'vue';

const props = defineProps({
  config: {
    type: Object,
    default: () => ({}),
  },
  items: {
    type: Array,
    default: () => ([]),
  },
  modelValue: {
    type: Object,
    default: () => ({}),
  },
  disabled: Boolean,
});

const emit = defineEmits(['update:modelValue', 'submit']);

const formRef = ref(null);

const form = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});

function locaAct(loca) {
  return ['left', 'right', 'center'].includes(loca) ? loca : 'center';
}

function handleClear() {
  unref(formRef).resetFields();
  emit('update:modelValue', {});
}

function handleSubmit() {
  unref(formRef).validate((valid) => {
    if (valid) emit('submit');
  });
}

</script>

<style lang="scss" scoped>
.center :deep(.el-form-item__content) {
  margin-left: 0 !important;
  text-align: center;
}
.right :deep(.el-form-item__content) {
  text-align: right;
}
</style>
