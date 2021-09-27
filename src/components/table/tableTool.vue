<template>
  <div class="yn-table-tool px3 df-sb-cc">
    <span class="table-title">{{ title }}</span>
    <div class="df-cc">
      <slot />
      <el-tooltip v-if="refresh" effect="light" content="刷新" :offset="0" placement="bottom">
        <el-button v-color="'#bbb'" class="fs20" type="text" icon="el-icon-refresh-right" @click="handleRefresh" />
      </el-tooltip>
      <el-tooltip v-if="modelValue.showExport" effect="light" content="导出" :offset="0" placement="bottom">
        <el-button v-color="'#bbb'" class="fs20" type="text" icon="el-icon-download" @click="handleExport" />
      </el-tooltip>
      <el-dropdown :offset="0" @command="(value) => handleEmit('tableSize', value)">
        <el-button v-color="'#bbb'" class="fs20 mx10" type="text" icon="yn-icon-colum-height" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="{ label, value } in size"
              :key="value"
              :class="{ active: modelValue.tableSize === value }"
              :command="value"
            >
              {{ label }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-popover width="300px" :offset="0" placement="bottom" trigger="hover">
        <template #reference>
          <el-button v-color="'#bbb'" class="fs20" type="text" icon="el-icon-setting" />
        </template>
        <div class="tool-header px10 df-sb-cc">
          <span>
            <el-checkbox v-model="showIndex">序号</el-checkbox>
            <el-checkbox v-model="showExport">导出</el-checkbox>
          </span>
          <el-button class="fs14" type="text" @click="handleReset">重置</el-button>
        </div>
        <div class="tool-content px10 pt10">
          <el-checkbox-group v-model="checkedOpts" class="df fw-w" :min="1">
            <div v-for="(opt, idx) in options" :key="idx" class="check-item">
              <el-checkbox :label="opt.prop || opt.slot">{{ opt.label }}</el-checkbox>
            </div>
          </el-checkbox-group>
        </div>
      </el-popover>
    </div>
  </div>
  <el-dialog v-model="state.showExportSet" title="导出数据" width="400px">
    <el-form :model="state.form" label-width="84px">
      <el-form-item label="导出文件名">
        <el-input v-model="state.form.fileName" />
      </el-form-item>
      <el-form-item label="导出格式">
        <el-select v-model="state.form.type">
          <el-option v-for="{ label, type } in typeOptions" :key="type" :label="label" :value="type" />
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
import { reactive, computed, onUpdated } from 'vue';
import { ElMessage } from 'element-plus';
import XLSX from 'xlsx';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
  title: {
    type: String,
    default: '',
  },
  options: {
    type: Array,
    default: () => [],
  },
  selected: {
    type: Array,
    default: () => ([]),
  },
  refresh: {
    type: Function,
    default() {},
  },
});

const emit = defineEmits(['update:modelValue']);

const size = [{ label: '默认', value: 'medium' }, { label: '中等', value: 'small' }, { label: '紧凑', value: 'mini' }];

// 记录初始传入的状态，用于重置设置
const defaultValue = { ...props.modelValue };

const showIndex = computed({
  get: () => props.modelValue.showIndex,
  // set: (value) => emit('update:modelValue', { ...props.modelValue, showIndex: value }),
  set: (value) => handleEmit('showIndex', value),
});

const showExport = computed({
  get: () => props.modelValue.showExport,
  // set: (value) => emit('update:modelValue', { ...props.modelValue, showExport: value }),
  set: (value) => handleEmit('showExport', value),
});

const checkedOpts = computed({
  get: () => props.modelValue.checkedOpts,
  set: (value) => emit('update:modelValue', { ...props.modelValue, checkedOpts: value }),
});

const state = reactive({
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

function handleEmit(key, value) {
  emit('update:modelValue', { ...props.modelValue, [key]: value });
}

function handleReset() {
  emit('update:modelValue', defaultValue);
}

function handleExport() {
  if (props.selected.length > 0) state.showExportSet = true;
  else ElMessage.error('请先选择需要导出的数据');
}

function exportFile() {
  const { fileName, sheet, type } = state.form;
  const { selected, options, modelValue: { showIndex: sort } } = props;
  const headers = sort ? ['序号'] : [];
  const keyArr = [];
  options.forEach((t) => {
    if (state.checkedOpts.includes(t.prop || t.slot)) {
      headers.push(t.label);
      keyArr.push(t.prop || t.slot);
    }
  });
  let data = selected.sort((a, b) => a.yn_sort - b.yn_sort);
  data = XLSX.utils.aoa_to_sheet([headers, ...data.map((t, i) => {
    const tmp = sort ? [i + 1] : [];
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
.table-title {
  font-size: 16px;
  line-height: 40px;
  color: #666;
}
.active {
  background-color: var(--el-color-primary-light-8);
  color: var(--el-dropdown-menuItem-hover-color);
}
.tool-header {
  border-bottom: 1px solid #EBEEF5;
}
.check-item {
  width: 33.3%;
  margin-bottom: 5px;
}
</style>
