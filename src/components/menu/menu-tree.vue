<template>
  <el-sub-menu v-if="data.children?.length" :index="data.path">
    <template #title>
      <Icon v-if="data.meta?.icon" :icon="data.meta?.icon" />
      <span>{{ data.meta.title }}</span>
    </template>
    <MenuTree
      v-for="(item, index) in data.children"
      :key="index"
      :data="item"
      :parent-path="realPath(data.path)"
    />
  </el-sub-menu>
  <el-menu-item v-else :index="realPath(data.path)">
    <Icon v-if="data.meta?.icon" :icon="data.meta?.icon" />
    <span>{{ data.meta.title }}</span>
  </el-menu-item>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  parentPath: {
    type: String,
    default: '',
  },
});

const realPath = computed(() => (path) => {
  const { parentPath } = props;
  if (parentPath) return `${parentPath}/${path}`;
  return path;
});
</script>
