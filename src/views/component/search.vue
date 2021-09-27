<template>
  <div class="content">
    <h2 class="title">SearchForm 搜索工具</h2>
    <p class="describe">搜索工具宽度继承父元素，每行分为5等份展示每一项。当搜索条件较多的时候，默认展示5个，可以通过展开按钮展开更多的搜索条件。</p>
    <div class="source">
      <SearchForm v-model="state.form" :items="items" :label-width="state.setForm.width" />
    </div>
    <p class="actions">试试修改参数</p>
    <el-form class="pa5" :model="state.setForm" size="mini" inline>
      <el-form-item v-for="({label, type, model} , index) in formItems" :key="index" :label="label">
        <el-input-number v-if="type === 'number'" v-model="state.setForm[model]" />
      </el-form-item>
    </el-form>
    <div class="detail">
      <div class="label">SearchForm Attributes</div>
      <el-table :data="searchDetail">
        <el-table-column prop="model" label="参数" />
        <el-table-column prop="explain" label="说明" />
        <el-table-column prop="type" label="类型" />
        <el-table-column prop="options" label="可选值" />
        <el-table-column prop="default" label="默认值" />
      </el-table>
      <div class="label">Item Attributes</div>
      <el-table :data="itemDetail" size="">
        <el-table-column prop="model" label="参数" />
        <el-table-column prop="explain" label="说明" />
        <el-table-column prop="type" label="类型" />
        <el-table-column prop="options" label="可选值" />
        <el-table-column prop="default" label="默认值" />
      </el-table>
    </div>
  </div>
</template>
<script setup>
import { reactive, computed } from 'vue';

const state = reactive({
  form: {},
  setForm: {
    number: 8,
    width: 65,
  },
});

const formItems = [
  { label: '搜索条件', type: 'number', model: 'number' },
  { label: '标签宽度', type: 'number', model: 'width' },
];

const items = computed(() => {
  const { number } = state.setForm;
  return new Array(number).fill('').map((item, index) => {
    const tmp = { label: '输入框', model: `model${index + 1}` };
    switch (index) {
      case 1:
        tmp.label = '选择框';
        tmp.type = 'select';
        tmp.options = [{ label: '选项1', value: 1 }, { label: '选项2', value: 2 }];
        break;
      case 2:
        tmp.label = '日期框';
        tmp.type = 'date';
        break;
      case 3:
        tmp.label = '时间框';
        tmp.type = 'time';
        break;
      default:
        break;
    }
    return tmp;
  });
});

/* eslint-disable object-curly-newline */
const searchDetail = [
  { model: 'v-model', explain: '绑定值', type: 'object', options: '—', default: '—' },
  { model: 'items', explain: '搜索条件组', type: 'array', options: '—', default: '—' },
  { model: 'label-width', explain: '标签的的宽度', type: 'string / number', options: '—', default: '80px' },
  { model: 'default-open', explain: '多条件下是否默认展开', type: 'boolean', options: '—', default: 'false' },
  { model: 'open-type', explain: '展开更多按钮的类型', type: 'string', options: 'hover / button', default: 'button' },
  { model: 'select-auto-submit', explain: 'select类选择后是否自动查询', type: 'boolean', options: '—', default: 'false' },
];

const itemDetail = [
  { model: 'model', explain: '绑定值中关联的key', type: 'string', options: '—', default: '—' },
  { model: 'label', explain: '标签内容', type: 'string', options: '—', default: '—' },
  { model: 'type', explain: '搜索条件的类型', type: 'string', options: 'input / select / time / date', default: 'input' },
  { model: 'placeholder', explain: '占位符，默认情况下根据类型显示：请输入 / 请选择 加上label的值', type: 'string', options: '—', default: '—' },
  { model: 'options', explain: 'select的选项组，关联类型 { label, value }', type: 'array', options: '—', default: '—' },
  { model: 'format', explain: 'time / date 显示在输入框中的格式 ', type: 'string', options: '参考element-plus文档', default: '—' },
  { model: 'slot', explain: '将当前项定义为slot', type: 'string', options: '—', default: '—' },
  // { model: '', explain: '', type: '', options: '—', default: '—' },
];

</script>
<style lang="scss" scoped>

</style>
