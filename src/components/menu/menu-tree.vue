<template>
  <template v-for="(item, index) in data" :key="index">
    <el-sub-menu v-if="item.children" :index="item.path">
      <template #title>
        <i :class="item.meta?.icon" />
        <span>{{ item.meta.title }}</span>
      </template>
      <menu-tree :data="item.children" :pate-path="loadPath(item.path)" />
    </el-sub-menu>
    <el-menu-item v-else :index="loadPath(item.path)">
      <i :class="item.meta?.icon" />
      <span>{{ item.meta.title }}</span>
    </el-menu-item>
  </template>
</template>
<script>
import { computed } from 'vue';

export default {
  name: 'MenuTree',
};
</script>

<script setup>
const props = defineProps({
  data: {
    type: Array,
    default: () => ([]),
  },
  patePath: {
    type: String,
    default: '',
  },
});

const loadPath = computed(() => (path) => {
  const { patePath } = props;
  if (patePath) return `${patePath}/${path}`;
  if (path.startsWith('/')) return path;
  return `/${path}`;
});
</script>

<style lang="">

</style>
