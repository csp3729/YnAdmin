<template>
  <el-menu
    :class="[topMenuPlace, { isInherit: color.text }]"
    :mode="mode" router
    :background-color="color.background"
    :text-color="color.text"
    :unique-opened="unique"
    :default-active="$route.path"
    :collapse="isCollapse"
  >
    <el-menu-item v-if="showLogo" class="menu-item--logo" disabled>
      <img src="@/assets/logo.png" width="28" height="28">
      <span class="logo-title">YnAdmin</span>
    </el-menu-item>
    <MenuTree :data="menus" />
    <el-menu-item v-if="showCollapse" class="menu-collapse">
      <YnCollapse button />
    </el-menu-item>
  </el-menu>
</template>
<script setup>
import { computed } from 'vue';
import { store } from '@uts/instance';
import { filterAuthRoutes } from '@uts/permission';

import { YnCollapse } from '@com/btns';

import MenuTree from './menu-tree.vue';

defineProps({
  menus: {
    type: Array,
    default: () => ([]),
  },
});

const mode = computed(() => (store.getters.layout === 'tm' ? 'horizontal' : 'vertical'));

const topMenuPlace = computed(() => store.getters.topMenuPlace);

const unique = computed(() => store.getters.unique);

const isCollapse = computed(() => store.getters.layout !== 'tm' && store.getters.collapse);

const showCollapse = computed(() => store.getters.layout !== 'tm' && store.getters.collapsePlace === 'menu');

const showLogo = computed(() => store.getters.layout === 'lm');

const color = computed(() => {
  const defaultColor = { background: '', text: '' };
  const { layout, menuColor } = store.getters;
  const isDefault = layout === 'tm' || !menuColor;
  return isDefault ? defaultColor : { background: menuColor, text: '#FFF' };
});

// const menus = computed(() => {
//   const { routes, authRoutes } = store.getters;
//   const routesMap = filterAuthRoutes(routes, authRoutes);
//   routesMap.unshift({ path: '/dashboard', meta: { title: '主控面板', icon: 'el-icon-s-operation' } });
//   return routesMap;
// });

</script>

<style lang="scss" scoped>
  .el-menu {
    height: 100%;

    &.isInherit :deep(i) {
      color: inherit;
    }

    .el-menu-item, :deep(.el-sub-menu__title) {
      border-right-color: transparent; // 移除默认颜色导致切换时候有黑边出现
    }
    // 垂直模式样式修改
    &:not(.el-menu--horizontal):not(.el-menu--popup) {
      &:not(.el-menu--collapse) {
        width: 201px;
      }
      :deep(.el-sub-menu.is-active:not(.is-opened)) .el-sub-menu__title, :deep(.el-menu-item.is-active) {
        background-color: #ecf5ff;
        border-right: 3px solid $theme-color;
        color: $theme-color !important;
        i {
          color: inherit;
        }
      }
    }

    // 水平模式样式修改
    &.el-menu--horizontal {
      display: flex;
      align-items: center;
      border-bottom: none;
      height: 100%;
      &.left {
        justify-content: flex-start;
      }
      &.center {
        justify-content: center;
      }
      &.right {
        justify-content: flex-end;
      }
      .el-menu-item, .el-sub-menu, :deep(.el-sub-menu__title) {
        height: 100%;
        display: flex;
        align-items: center;
      }
      .el-menu-item.is-active, :deep(.el-sub-menu.is-active) .el-sub-menu__title {
        &, i {
          color: $theme-color;
        }
      }
    }

    &.el-menu--popup .el-menu-item.is-active {
      color: $theme-color;
    }

  }
  .menu-item--logo {
    opacity: 1;
    cursor: auto;
    img {
      margin-left: -3px;
    }
    .logo-title {
      margin-left: 10px;
      font-size: 1.5em;
      font-weight: bold;
    }
  }

  .menu-collapse {
    width: 100%;
    height: auto;
    position: absolute;
    bottom: 0;
    padding: 0 !important;
  }
</style>
