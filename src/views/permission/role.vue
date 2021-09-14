<template>
  <div>
    <Table :headers="headers" :data="[]" />
  </div>
</template>

<script setup>

const headers = [
  { label: '姓名', prop: 'name' },
  { label: '年龄', prop: 'age' },
  { label: '性别', prop: 'sex' },
  { label: '所属地', prop: 'area' },
  // { label: '插入数据', slot: 'add' },
  { label: '操作', prop: 'actions' },
];

// const open = () => {
//   $msgbox()
// }
</script>

<style lang="scss" scoped>

</style>
