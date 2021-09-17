<template :inheritAttrs="false">
  <div class="df-cc" v-bind="$attrs">
    <slot />
    <el-tooltip v-if="refresh" effect="light" content="刷新" :offset="0" placement="bottom">
      <el-button v-color="'#bbb'" class="fs20" type="text" icon="el-icon-refresh-right" @click="handleRefresh" />
    </el-tooltip>
    <el-tooltip v-if="showExport" effect="light" content="导出" :offset="0" placement="bottom">
      <el-button v-color="'#bbb'" class="fs20" type="text" icon="el-icon-download" @click="handleExport" />
    </el-tooltip>
    <el-tooltip effect="light" content="间距" :offset="0" placement="bottom">
      <el-button v-color="'#bbb'" class="fs20" type="text" icon="yn-icon-colum-height" @click="handleSize" />
    </el-tooltip>
    <el-popover width="300px" :offset="0" placement="bottom" trigger="hover">
      <template #reference>
        <el-button v-color="'#bbb'" class="fs20" type="text" icon="el-icon-setting" />
      </template>
      <div class="tool-header px10 df-sb-cc">
        <span>
          <el-checkbox :checked="showIndex" @change="handleShowIndex">序号</el-checkbox>
          <el-checkbox :checked="showExport" @change="handleShowExport">导出</el-checkbox>
        </span>
        <el-button class="fs14" type="text" @click="handleReset">重置</el-button>
      </div>
      <div class="tool-content px10 pt10">
        <el-checkbox-group v-model="state.checkedOpts" class="df fw-w" :min="1" @change="handleCheckedGroupChange">
          <div v-for="(opt, idx) in options" :key="idx" class="check-item">
            <el-checkbox :label="opt.prop || opt.slot">{{ opt.label }}</el-checkbox>
          </div>
        </el-checkbox-group>
      </div>
    </el-popover>
  </div>
  <el-dialog v-model="state.showExportSet" title="导出数据" width="400px">
    <el-form :model="state.form" label-width="84px">
      <el-form-item label="导出文件名">
        <el-input v-model="state.form.fileName" />
      </el-form-item>
      <el-form-item label="导出格式">
        <el-select v-model="state.form.type">
          <el-option v-for="t in typeOptions" :key="t" :label="t.label" :value="t.type" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="['xlsx', 'biff8'].indexOf(state.form.type) > -1" label="工作表名称">
        <el-input v-model="state.form.sheet" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="state.showExportSet = false">取 消</el-button>
        <el-button type="primary" @click="exportFile">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, defineProps, defineEmits } from 'vue';
import { ElMessage } from 'element-plus';
import XLSX from 'xlsx';

const props = defineProps({
  showIndex: Boolean,
  showExport: Boolean,
  tableSize: {
    type: String,
    default: '',
  },
  refresh: {
    type: Function,
    default() {},
  },
  checkeds: {
    type: Array,
    default: () => [],
  },
  options: {
    type: Array,
    default: () => [],
  },
  selected: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['update:tableSize', 'update:showIndex', 'update:showExport', 'update:checkeds']);

// 记录全部选项，重置时候使用,节省性能?
const checkeds = props.options.map((opt) => opt.prop || opt.slot);

const state = reactive({
  checkedOpts: props.checkeds,
  showExportSet: false,
  form: { fileName: props.title || 'excel-list', sheet: 'sheet1', type: 'xlsx' },
});

const typeOptions = [
  { type: 'xlsx', label: 'xlsx' },
  { type: 'biff8', label: 'xls' },
  { type: 'csv', label: 'csv' },
  { type: 'txt', label: 'txt' },
  { type: 'html', label: 'html' },
];

function handleRefresh() {
  // emit('refresh');
  props.refresh();
}

function handleSize() {
  const sizes = ['medium', 'small', 'mini'];
  const index = sizes.indexOf(props.tableSize);
  emit('update:tableSize', sizes[index > 1 ? 0 : index + 1]);
}

function handleShowIndex(val) {
  emit('update:showIndex', val);
}

function handleShowExport(val) {
  emit('update:showExport', val);
}

function handleCheckedGroupChange(val) {
  emit('update:checkeds', val);
}

function handleReset() {
  state.checkedOpts = checkeds;
  // emit('update:tableSize', 'medium');
  emit('update:showExport', false);
  emit('update:showIndex', true);
  emit('update:checkeds', checkeds);
}

function handleExport() {
  if (props.selected.length > 0) state.showExportSet = true;
  else ElMessage.error('请先选择需要导出的数据');
}

function exportFile() {
  const { fileName, sheet, type } = state.form;
  const { selected, showIndex, options } = props;
  const headers = showIndex ? ['序号'] : [];
  const keyArr = [];
  options.forEach((t) => {
    if (state.checkedOpts.includes(t.prop || t.slot)) {
      headers.push(t.label);
      keyArr.push(t.prop || t.slot);
    }
  });
  let data = selected.sort((a, b) => a.yn_sort - b.yn_sort);
  data = XLSX.utils.aoa_to_sheet([headers, ...data.map((t, i) => {
    const tmp = showIndex ? [i + 1] : [];
    keyArr.forEach((key) => tmp.push(t[key]));
    return tmp;
  })]);
  const suffix = typeOptions.find((opt) => opt.type === type).label;
  XLSX.writeFile({
    SheetNames: [sheet],
    Sheets: { [sheet]: data },
  }, `${fileName}.${suffix}`, { bookType: type });
  state.showExportSet = false;
}

</script>

<style lang="scss" scoped>
.tool-header {
  border-bottom: 1px solid #EBEEF5;
}
.check-item {
  width: 33.3%;
  margin-bottom: 5px;
}
</style>
