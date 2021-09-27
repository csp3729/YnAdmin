<template :inheritAttrs="false">
  <div class="yn-table">
    <TabelTool v-if="tool" v-model="state.tools" :title="title" :options="options" :selected="state.selected" :refresh="refresh">
      <slot name="tool" />
    </TabelTool>
    <el-table
      ref="tableRef"
      v-bind="$attrs"
      :data="tableData"
      :size="state.tools.tableSize"
      :max-height="state.tableHeight"
      :header-cell-style="{ backgroundColor: '#f5f7fa' }"
      @selection-change="handleSelectionChange"
    >
      <el-table-column v-if="state.tools.showExport && tool" key="select" type="selection" align="center" />
      <el-table-column v-if="state.tools.showIndex" key="sort" type="index" width="50px" label="序号" align="center" />
      <template v-for="(col, idx) in headers" :key="idx">
        <el-table-column
          v-if="isHide(state.tools.checkedOpts, col)"
          :label="col.label"
          :width="col.width || ((col.prop || col.slot) === 'actions' ? 200 : '')"
          :align="col.align"
          :sortable="col.sortable"
          :sort-method="col.sortMethod"
          :show-overflow-tooltip="col.tooltip"
          :resizable="col.resizable || false"
        >
          <template v-if="col.slot" #default="scope">
            <slot :name="col.slot" :column="scope.column" :row="scope.row" :index="scope.$index" />
          </template>
          <template v-else-if="col.prop === 'actions'" #default="scope">
            <el-button type="success" size="mini" icon="el-icon-edit" @click="onEdit(scope)">编辑</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="onDelete(scope)">删除</el-button>
          </template>
          <template v-else #default="scope">
            <span :class="typeof col.textClass === 'function' ? (col.textClass(scope.row, scope.column)) : col.textClass">
              {{ col.formatter?.(scope.row, scope.column, scope.cellValue, scope.$index) || scope.row[col.prop] }}
            </span>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script setup>
import {
  reactive, ref, unref, computed, nextTick, onMounted, onUnmounted, onBeforeUpdate,
} from 'vue';
import elResize from 'element-resize-detector';
import { getElByClass, filterHeader, isHide } from './utils';
import TabelTool from './tableTool.vue';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  export: Boolean,
  index: {
    type: Boolean,
    default: true,
  },
  refresh: {
    type: Function,
    default() {},
  },
  tool: {
    type: Boolean,
    default: true,
  },
  headers: {
    type: Array,
    default: () => [],
  },
  data: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['edit', 'delete']);

const tableRef = ref(null);

const state = reactive({
  tableHeight: 0,
  selected: [], // 当前的选择
  tools: {
    showIndex: props.index,
    showExport: props.export,
    tableSize: 'small',
    checkedOpts: [], // 已选显示
  },
});

const options = [];

filterHeader(props.headers, options, state.tools.checkedOpts);

// // 过滤原数据添加排序标识
const tableData = computed(() => props.data.map((t, i) => Object.defineProperty(t, 'yn_sort', { value: i, enumerable: false })));

const erd = elResize();

onMounted(() => {
  erd.listenTo(getElByClass('yn-table'), calcTableHeight);
});

onUnmounted(() => {
  erd.removeListener(getElByClass('yn-table'), calcTableHeight);
});

onBeforeUpdate(() => {
  nextTick(() => unref(tableRef).doLayout());
});

// 计算表格高度
function calcTableHeight({ offsetHeight }) {
  state.tableHeight = offsetHeight - (props.tool ? 50 : 0);
}

// 过滤数据
function formatData(scope, { formatter, prop }) {
  if (formatter) {
    return formatter?.(scope);
  }
  return scope[prop];
}

// 表格修改选中
function handleSelectionChange(val) {
  state.selected = val;
}

// 事件分发
function onEdit({ row, column, $index }) {
  emit('edit', { row, column, index: $index });
}

function onDelete({ row, column, $index }) {
  emit('delete', { row, column, index: $index });
}
</script>

<style lang="scss" scoped>
.yn-table {
  height: 100%;
  display: flex;
  flex-direction: column;
  :deep(.el-checkbox) {
    height: auto;
  }
}
</style>
