<template>
  <el-sub-menu v-if="data.children?.length" :index="data.path">
    <template #title>
      <i :class="data.meta?.icon" />
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
    <i :class="data.meta?.icon" />
    <span>{{ data.meta.title }}</span>
  </el-menu-item>
</template>
<script>
import { computed } from 'vue';

export default {
  name: 'MenuTree',
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    parentPath: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const realPath = computed(() => (path) => {
      const { parentPath } = props;
      if (parentPath) return `${parentPath}/${path}`;
      return path;
    });

    return { realPath };
  },
};
</script>

<!-- <script setup>
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
</script> -->

<style lang="">

</style>
