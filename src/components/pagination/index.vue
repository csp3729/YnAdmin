<template>
  <el-pagination
    :class="place"
    :background="background"
    :total="total"
    :page-sizes="pageSizes"
    :page-size="modelValue[prop.size || 'pageSize']"
    :current-page="modelValue[prop.page || 'pageNum']"
    :layout="layout"
    @sizeChange="handleSizeChange"
    @currentChange="handleCurrentChange"
  />
</template>

<script setup>
import {
  computed, nextTick, defineProps, defineEmits,
} from 'vue';
import { store } from '@uts/instance';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
  background: {
    type: Boolean,
    default: true,
  },
  total: {
    type: Number,
    default: 0,
  },
  pageSizes: {
    type: Array,
    default: () => [10, 20, 50, 100],
  },
  // pageSize: {
  //   type: Number,
  //   default: 10,
  // },
  // currentPage: {
  //   type: Number,
  //   default: 1,
  // },
  layout: {
    type: String,
    default: 'total, sizes, prev, pager, next, jumper',
  },
  prop: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['update:modelValue', 'handleChange']);

const place = computed(() => store.getters.pagingPlace);

let isChangeSize = false;

function handleSizeChange(val) {
  isChangeSize = true;
  const { size = 'pageSize', page = 'pageNum' } = props.prop;
  emit('update:modelValue', { [size]: val, [page]: 1 });
  emit('handleChange');
  nextTick(() => { isChangeSize = false; });
}

function handleCurrentChange(val) {
  if (!isChangeSize) {
    const { pageSizes, modelValue, prop: { size = 'pageSize', page = 'pageNum' } } = props;
    emit('update:modelValue', { [size]: modelValue[size] || pageSizes[0], [page]: val });
    emit('handleChange');
  }
}
</script>
