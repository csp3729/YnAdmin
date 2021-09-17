<template>
  <div v-if="showBreadcrumb" class="layout-breadcrumb df-sb-cc">
    <div class="df-cc">
      <YnCollapse v-if="showCollapse" class="mr12" />
      <el-breadcrumb>
        <transition-group name="breadcrumb">
          <el-breadcrumb-item v-for="t in routes" :key="t.path" :to="t.path">
            {{ t.meta.title }}
          </el-breadcrumb-item>
        </transition-group>
      </el-breadcrumb>
    </div>
    <div>
      <slot name="append" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { store } from '@uts/instance';
import { YnCollapse } from '@com/btns';

const route = useRoute();

const routes = computed(() => {
  const matched = [...route.matched];
  if (matched[0].path !== '/') matched.unshift({ path: '/', meta: { title: '主控面板' } });
  return matched.filter((t) => t.meta.title);
});

const showCollapse = computed(() => {
  const { layout, collapsePlace } = store.getters;
  return layout !== 'tm' && collapsePlace === 'breadcrumb';
});

const showBreadcrumb = computed(() => store.getters.breadcrumb);

</script>

<style lang="scss" scoped>
.layout-breadcrumb {
  height: 40px;
  background: #fff;
}
</style>
