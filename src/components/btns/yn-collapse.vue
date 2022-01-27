<template>
  <div :class="['collapse-btn', { 'is-button': button } ]" @click="handleCollapse">
    <Icon v-if="button" :icon="isCollapse ? 'DArrowRight' : 'DArrowLeft'" />
    <Icon v-else :icon="isCollapse ? 'Expand' : 'Fold'" />
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
  flex: 1;
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &.is-button {
    height: 42px;
    &:hover {
      background: $theme-color;
      color: #FFF;
    }
  }
}
</style>
