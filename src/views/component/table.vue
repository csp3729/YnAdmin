<template>
  <div class="content">
    <h2 class="title">Table 表格</h2>
    <p class="describe">Table表格只是在el-table上进行了一层封装并加入了头部工具栏，表格的高度受限于外部容器，默认为height：100%，当处于flex布局中，获得flex：1的效果。</p>
    <div class="source">
      <Table :headers="headers" :edit="false" :index="false" :data="state.data" title="表格数据" />
    </div>
    <div class="detail">
      <div class="label">Table Attributes</div>
      <p class="describe mt10">table继承el-table的所有props属性，注：因为table高度受限于外部容器，其中max-height已经在内部做了处理，所以不建议使用height跟max-height属性，表格高度应在外部容器限定。</p>
      <el-table :data="tableDetail">
        <el-table-column prop="model" label="参数" width="180px" />
        <el-table-column prop="explain" label="说明" />
        <el-table-column prop="type" label="类型" />
        <el-table-column prop="options" label="可选值" />
        <el-table-column prop="default" label="默认值" />
      </el-table>
      <div class="label">Table-column Attributes</div>
      <p class="describe mt10">el-table-column的属性比较多，这里只封装进去部分常用的功能</p>
      <el-table :data="columnDetail">
        <el-table-column prop="model" label="参数" width="180px" />
        <el-table-column prop="explain" label="说明" />
        <el-table-column prop="type" label="类型" />
        <el-table-column prop="options" label="可选值" />
        <el-table-column prop="default" label="默认值" />
      </el-table>
      <div class="label">Slot</div>
      <el-table :data="slotDetail">
        <el-table-column prop="name" label="name" width="180px" />
        <el-table-column prop="explain" label="说明" />
      </el-table>
    </div>
  </div>
</template>
<script setup>
import { inject, reactive, onMounted } from 'vue';

const http = inject('http');

const state = reactive({
  data: [
    {},
    {},
  ],
});

const headers = [
  {
    label: '姓名', prop: 'name', tooltip: true, resizable: true,
  },
  {
    label: '性别', prop: 'sex', type: 'select', formatter: (row) => (row.sex === '男' ? 1 : 2),
  },
  { label: '年龄', prop: 'age', textClass: ({ age }) => (age >= 24 ? 'up' : 'lower') },
  { label: '所在地', prop: 'area', type: 'input' },
  { label: '操作', prop: 'actions' },
];

/* eslint-disable object-curly-newline */
const tableDetail = [
  { model: 'headers', explain: '表格头部行数据，数组内的每一项对应table-column', type: 'array[{ label, prop, ... }]', options: '—', default: '—' },
  { model: 'data', explain: '显示的数据', type: 'array', options: '—', default: '—' },
  { model: 'tool', explain: '是否显示头部工具栏', type: 'string', options: '—', default: 'true' },
  { model: 'title', explain: '表格标题，仅在tool为true时显示', type: 'string', options: '—', default: '—' },
  { model: 'export', explain: '是否默认展示导出功能，仅在tool为true时有效', type: 'boolean', options: '—', default: 'false' },
  { model: 'index', explain: '是否默认显示序号', type: 'boolean', options: '—', default: 'true' },
];
const columnDetail = [
  { model: 'label', explain: '显示的标题', type: 'string', options: '—', default: '—' },
  { model: 'prop', explain: '对应列内容的字段名', type: 'string', options: '—', default: '—' },
  { model: 'width', explain: '对应列的宽度，默认的actions列宽度为200px', type: 'string / number', options: '—', default: '\'\' / 200' },
  { model: 'align', explain: '对齐方式', type: 'string', options: 'left / center / right', default: 'left' },
  { model: 'fixed', explain: '对齐方式', type: 'string', options: '—', default: 'center' },
  { model: 'formatter', explain: '用来格式化内容', type: 'function(row, column, cellValue, index)', options: '—', default: '—' },
  { model: 'sortable', explain: '对应列是否可以排序', type: 'boolean / string', options: 'true / false / \'custom\'', default: '—' },
  { model: 'sortMethod', explain: '对数据进行排序的时候使用的方法', type: 'function(a, b)', options: '—', default: '—' },
  { model: 'resizable', explain: '对应列是否可以通过拖动改变宽度，仅在table的border为true时有效', type: 'boolean', options: '—', default: 'false' },
  { model: 'tooltip', explain: '当内容过长被隐藏时显示 tooltip', type: 'boolean', options: '—', default: 'false' },
  { model: 'textClase', explain: '当前内容项的额外类名，通常用来设定不同状态下的文字颜色，仅在非slot模式下有效', type: 'string / function(row, column)', options: '—', default: '—' },
  { model: 'slot', explain: '使用slot模式代替数据内容', type: 'string', options: '—', default: '—' },
];

const slotDetail = [{ name: 'tool', explain: 'table头部工具的slot，用于扩展工具栏右侧的功能按' }];

const tableData = [
  {
    id: 1,
    date: '2016-05-02',
    name: '王大虎',
    address: '上海市普陀区金沙江路 1518 弄',
  },
  {
    id: 2,
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄',
    children: [],
  },
  {
    id: 3,
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄',
    // children: [
    //   {
    //     id: 31,
    //     date: '2016-05-01',
    //     name: '王小虎',
    //     address: '上海市普陀区金沙江路 1519 弄',
    //   },
    //   {
    //     id: 32,
    //     date: '2016-05-01',
    //     name: '王小虎',
    //     address: '上海市普陀区金沙江路 1519 弄',
    //   },
    // ],
  },
  {
    id: 4,
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄',
  },
];

onMounted(() => {
  http.getTableData().then((res) => {
    state.data = res;
  });
});
</script>
<style lang="scss" scoped>
.source {
  height: 400px;
}
:deep(.up) {
  color: #58bc58;
}
:deep(.lower) {
  color: red;
}
</style>
