<template>
  <el-sub-menu v-if="data.children?.length" :index="data.path">
    <template #title>
      <i :class="data.meta?.icon" />
      <span>{{ data.meta.title }}</span>
    </template>
    <menu-tree v-for="(item, index) in data.children" :key="index" :data="item" />
  </el-sub-menu>
  <el-menu-item v-else :index="data.path">
    <i :class="data.meta?.icon" />
    <span>{{ data.meta.title }}</span>
  </el-menu-item>
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
    type: Object,
    default: () => ({}),
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
