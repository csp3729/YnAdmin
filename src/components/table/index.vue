<template :inheritAttrs="false">
  <div class="table-tool px3 df-sb-cc">
    <span class="table-title">{{ title }}</span>
    <TabelTool
      v-if="tool"
      v-model:showIndex="state.showIndex"
      v-model:showExport="state.selection"
      v-model:tableSize="state.size"
      v-model:checkeds="state.checkedOpts"
      :options="options"
      :selected="state.selectionItems"
      :refresh="refresh"
    >
      <slot name="tool" />
    </TabelTool>
  </div>
  <el-table
    v-bind="$attrs"
    ref="tableRef"
    class="mb10"
    :data="tableData"
    :size="state.size"
    :stripe="stripe"
    :max-height="state.tableHeight"
    :header-cell-style="{ backgroundColor: '#eee' }"
    @selection-change="handleSelectionChange"
  >
    <el-table-column v-if="state.selection" key="select" type="selection" align="center" />
    <el-table-column v-if="state.showIndex" key="sort" type="index" label="序号" align="center" />
    <template v-for="(col, idx) in headers" :key="idx">
      <el-table-column
        v-if="isHide(state.checkedOpts, col)"
        :label="col.label"
        :width="col.width || ((col.prop || col.slot) === 'actions' ? 200 : '')"
        :prop="col.prop"
        :formatter="col.formatter"
        :align="col.align || 'center'"
      >
        <template v-if="col.slot" #default="scope">
          <slot :name="col.slot" :column="scope.column" :row="scope.row" :index="scope.$index" />
        </template>
        <template v-else-if="col.prop === 'actions'" #default="scope">
          <el-button type="success" size="mini" icon="el-icon-edit" @click="onEdit(scope)">编辑</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="onDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script setup>
import {
  reactive, ref, unref, computed, watch, nextTick, onMounted, onUnmounted, defineProps, defineEmits, onBeforeUpdate,
} from 'vue';
import elResize from 'element-resize-detector';
import { store } from '@uts/instance';
import {
  getElByClass, calcTableHeight, filterHeader, isHide,
} from './utils';
import TabelTool from './tableTool.vue';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  export: Boolean,
  stripe: Boolean,
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

const state = reactive({
  selection: props.export,
  showIndex: true,
  checkedOpts: [],
  selectionItems: [],
  size: 'small',
});

const options = [];

filterHeader(props.headers, options, state.checkedOpts);

// 过滤原数据添加排序标识
const tableData = computed(() => props.data.map((t, i) => Object.defineProperty(t, 'yn_sort', { value: i, enumerable: false })));

const tableRef = ref(null);

let searchTool;

const erd = elResize();

onMounted(() => {
  searchTool = getElByClass('search-tool');
  window.addEventListener('resize', setHeight);
  if (searchTool) erd.listenTo(searchTool, setHeight);
  // setHeight(); // 上边的监听会触发setHeight，这里不需要重复调用
});

onUnmounted(() => {
  window.removeEventListener('resize', setHeight);
  if (searchTool) erd.removeListener(searchTool, setHeight);
});

onBeforeUpdate(() => {
  nextTick(() => unref(tableRef).doLayout());
});

const actor = ['footer', 'headerHeight', 'breadcrumb', 'breadPlace'];
watch(
  () => [...actor.map((key) => store.getters[key])],
  () => nextTick(() => setHeight()),
);

function setHeight() {
  state.tableHeight = calcTableHeight(unref(tableRef).$el);
}

// 表格修改选中
function handleSelectionChange(val) {
  state.selectionItems = val;
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
.table-title {
  font-size: 16px;
  line-height: 40px;
  color: #666;
}
</style>
