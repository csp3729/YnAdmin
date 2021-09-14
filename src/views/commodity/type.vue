<template>
  <div>
    <p> Commodity - Type </p>
    <!-- <el-color-picker
      v-model="color"
      show-alpha
      :predefine="predefineColors">
    </el-color-picker> -->
    <el-date-picker
      v-model="value1"
      type="date"
      placeholder="Pick a date"
      :default-value="new Date(2010, 9, 1)">
    </el-date-picker>
  </div>
</template>

<script setup>
import { ref } from 'vue';
// import { defineComponent, ref } from 'vue';

// export default defineComponent({
// setup() {
const color = ref('rgba(255, 69, 0, 0.68)');
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
]);

const value1 = ref('');
// return {
//   color,
//   predefineColors,
// };
// },
// });
</script>

<style>

</style>
