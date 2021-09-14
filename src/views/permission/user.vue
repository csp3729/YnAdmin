<template>
  <div>
    <div style="width: 450px">
      <CommitForm :config="formConfig" :disabled="false" v-model="state.form" @submit="submit" />
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const state = reactive({
  form: { radio: 1 },
});

const formConfig = {
  rules: {
    input: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
    time: [{ required: true, message: '请选择时间', trigger: 'blur' }],
  },
  items: [
    { label: '输入框', type: 'input', prop: 'input' },
    {
      label: '文本框', type: 'textarea', prop: 'textarea', max: 200,
    },
    {
      label: '时间', type: 'time', isRange: true, arrow: true, prop: 'time', default: new Date(),
    },
    {
      label: '日期', type: 'date', model: 'daterange', prop: 'date',
    },
    {
      label: '单选框', type: 'radio', prop: 'radio', options: [{ label: '选项1', value: 1 }, { label: '选项2', value: 2 }],
    },
  ],
  actions: { confirmText: '确认' },
};

const handleCancel = () => {
  console.log(66666);
};

const submit = () => {
  console.log(state.form);
};

</script>

<style lang="scss" scoped>

</style>
