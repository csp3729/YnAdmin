<template :inheritAttrs="false">
  <div class="yn-table">
    <TabelTool v-if="tools" v-model="state.tools" :title="title" :options="options" :selected="state.selected">
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
      <template v-for="(col, idx) in columns" :key="idx">
        <el-table-column
          v-if="isHide(state.tools.checkedOpts, col)"
          :label="col.label"
          :width="col.width || ((col.prop || col.slot) === 'oper' ? 200 : '')"
          :align="col.align"
          :sortable="col.sortable"
          :sort-method="col.sortMethod"
          :show-overflow-tooltip="col.tooltip"
          :resizable="col.resizable || false"
        >
          <template #default="scope">
            <slot v-if="col.slot" :name="col.slot" :column="scope.column" :row="scope.row" :index="scope.$index" />
            <template v-else-if="col.prop === 'oper'">
              <template v-if="col.oper">
                <el-button
                  v-for="(btn, i) in col.oper"
                  :key="i"
                  :class="btn.class"
                  size="mini"
                  :type="btn.type"
                  :icon="btn.icon"
                  :plain="btn.plain"
                  :round="btn.round"
                  :circle="btn.circle"
                  @click="btn.onClick?.(scope)"
                >
                  {{ btn.text }}
                </el-button>
              </template>
              <template v-else>
                <el-button v-if="state.edits[scope.$index]" type="primary" size="mini" icon="el-icon-finished" @click="onSave(scope)">
                  保存
                </el-button>
                <el-button v-else type="success" size="mini" icon="el-icon-edit" @click="onEdit(scope)">编辑</el-button>
                <el-button type="danger" size="mini" icon="el-icon-delete" @click="onDelete(scope)">删除</el-button>
              </template>
            </template>
            <!-- <template v-else-if="edit && col.edit && state.edits[scope.$index]">
              <el-input v-if="col.edit.type === 'input'" v-model="state.edits[scope.$index][col.prop]" size="mini" clearable />
              <el-select v-if="col.edit.type === 'select'" v-model="state.edits[scope.$index][col.prop]" clearable>
                <el-option v-for="(t, i) in col.edit.items" :key="i" :label="t.label" :value="t.value" />
              </el-select>
            </template> -->
            <span v-else :class="typeof col.textClass === 'function' ? (col.textClass(scope.row, scope.column)) : col.textClass">
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
  // edit: Boolean,
  tools: {
    type: Boolean,
    default: true,
  },
  columns: {
    type: Array,
    default: () => [],
  },
  data: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['edit', 'save', 'delete']);

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
  edits: [],
  editForm: {},
});

const options = [];

filterHeader(props.columns, options, state.tools.checkedOpts);

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
  state.tableHeight = offsetHeight - (props.tools ? 50 : 0);
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
  if (props.edit) {
    // state.edits.push($index);
    // state.editForm = { ...row };
    state.edits[$index] = { ...row };
  } else {
    emit('edit', { row, column, index: $index });
  }
}

function onSave({ row, column, $index }) {
  // state.edits.splice(state.edits.indexOf($index), 1);
  // console.log(row);
  const data = state.edits[$index];
  delete state.edits[$index];
  console.log(data);
  emit('save', data);
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
