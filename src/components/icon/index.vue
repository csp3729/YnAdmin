<template>
  <el-icon :color="color" :size="size">
    <YnIcon :icon="icon" />
  </el-icon>
</template>

<script setup>
import { createVNode } from 'vue';
import * as $Icon from '@element-plus/icons-vue';

defineProps({
  icon: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '',
  },
  size: {
    type: [String, Number],
    default: '',
  },
});

const YnIcon = ({ icon }) => createVNode($Icon[icon]);

</script>
