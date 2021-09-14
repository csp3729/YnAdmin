<template>
  <div class="layout-list df">
    <div
      v-for="({ type }, index) in types" :key="index"
      :class="['layout-item', `layout-item--${type}`, { 'is-active': layout === type}]"
      @click="handlPattern(type)"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { store } from '@uts/instance';

const types = [{ type: 'lm' }, { type: 'lb' }, { type: 'tm' }];

const layout = computed(() => store.getters.layout);

const handlPattern = (type) => {
  store.dispatch('ChangeSetting', { key: 'layout', value: type });
};

</script>

<style lang="scss" scoped>

.layout-list {
  display: flex;
  align-items: center;
  justify-content: center;
}
.layout-item {
  position: relative;
  width: 56px;
  height: 48px;
  margin: 0 18px;
  overflow: hidden;
  cursor: pointer;
  background-color: #f0f2f5;
  border-radius: 4px;
  box-shadow: 0 1px 2.5px 0 rgba(0, 0, 0, 0.18);

  &::before, &::after {
    position: absolute;
    content: '';
  }

  &--lm, &--lb {
    &::before {
      top: 0;
      left: 0;
      // z-index: 1;
      width: 28%;
      height: 100%;
      background-color: #273352;
      border-radius: 4px 0 0 4px;
    }

    &::after {
      top: 0;
      left: 0;
      width: 100%;
      height: 25%;
      background-color: #fff;
    }
  }

  &--lm::before {
    z-index: 1;
  }

  &--tm {
    &::after {
      top: 0;
      left: 0;
      width: 100%;
      height: 25%;
      background-color: #273352;
    }
  }

  &:hover, &.is-active {
    padding: 12px;
    border: 2px solid $theme-color;

    &::before, &::after {
      border-radius: 0;
    }
  }
}
</style>
