<template>
  <div :class="['collapse-btn', { 'is-button': button } ]" @click="handleCollapse">
    <i v-if="button" :class="`el-icon-d-arrow-${isCollapse ? 'right' : 'left'}`" />
    <i v-else :class="`el-icon-s-${isCollapse ? 'unfold' : 'fold'}`" />
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue';
import { store } from '@uts/instance';

defineProps({
  button: Boolean,
});

const isCollapse = computed(() => store.getters.collapse);

function handleCollapse() {
  store.dispatch('ChangeSetting', { key: 'collapse', value: !isCollapse.value });
}

</script>

<style lang="scss" scoped>
.collapse-btn {
  font-size: 22px;
  cursor: pointer;
  &.is-button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 42px;
    &:hover {
      background: $theme-color;
      i {
        color: #FFF;
      }
    }
  }
}
</style>
