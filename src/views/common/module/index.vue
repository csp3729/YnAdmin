<template>
  <div>
    <div >default-module</div>
    <el-input v-model="test"></el-input>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'ShopSetting',
  setup() {
    const test = ref('');

    return {
      test,
    };
  },
};
</script>

<style>

</style>
