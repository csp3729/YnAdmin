<template>
  <el-tooltip effect="light" :content="isFullscreen?'正常':'全屏'" placement="bottom">
    <div class="header-menu-btn" @click="changeScreen">
      <Icon :icon="isFullscreen ? 'Crop' : 'FullScreen'" />
    </div>
  </el-tooltip>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import ScreenFull from 'screenfull';

const isFullscreen = ref(false);

onMounted(() => {
  window.addEventListener('keydown', keydown, true);
  ScreenFull.onchange(() => {
    isFullscreen.value = ScreenFull.isFullscreen;
  });
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', keydown);
  ScreenFull.off('change');
});

function keydown(event) {
  if (event.keyCode === 122) {
    event.returnValue = false;
    changeScreen();
  }
}

function changeScreen() {
  if (ScreenFull.isEnabled) {
    ScreenFull.toggle();
  }
}

</script>
