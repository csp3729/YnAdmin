<template>
  <div class="df fd-c">
    <!-- <UploadImage v-model="state.fileList" :config="{ showedSize: 200 }" >
      <template #tip>
        <span>只能上传 jpg/png 文件，且不超过 500kb</span>
      </template>
      <el-button type="primary" @click="select">图库选择</el-button>
    </UploadImage> -->
    <SearchForm v-model="state.form" :items="state.items" @handle-search="handleRefresh" />
    <Table :headers="headers" :data="state.data" :tool="!false" title="" :refresh="handleRefresh" @edit="handleEdit">
      <template #tool>
        <el-button size="mini" type="text" icon="el-icon-folder-add" class="fs20" />
      </template>
      <template #actions>
        <el-button>这是一个按钮</el-button>
      </template>
    </Table>
    <Pagination
      v-model="state.paging" :prop="{ page: 'page', size: 'limit' }" :total="1000" @handleChange="handleRefresh"
    />
    <!-- <UploadImage v-model="state.fileList" /> -->
  </div>
</template>

<script setup>
import { reactive, inject, onMounted } from 'vue';

const http = inject('http');

const state = reactive({
  form: {},
  items: [
    { model: 'name', label: '名字', type: 'select' },
    { label: '年龄', model: 'age' },
  ],
  paging: {},
  fileList: [
    {
      albumId: 0,
      createDate: '2020-08-03 16:26:00',
      imageId: 917,
      imageUrl: 'http://120.77.216.222/oss-file/20200803/83e0df8950fb45d8b7b4795bde7a38e3.jpg',
      sellerId: 242,
      updateDate: '2020-08-03 16:26:00',
    },
    {
      albumId: 0,
      createDate: '2020-08-03 16:26:00',
      imageId: 917,
      imageUrl: 'http://120.77.216.222/oss-file/20210714/6d026e6d7bf94dd59a7db7c461cc2bb7.jpg',
      sellerId: 242,
      updateDate: '2020-08-03 16:26:00',
      status: 'error',
      percentage: 100,
    },
  ],
  data: [],
});

const headers = [
  { label: '姓名', prop: 'name' },
  { label: '年龄', prop: 'age' },
  { label: '性别', prop: 'sex' },
  { label: '所属地', prop: 'area' },
  // { label: '插入数据', slot: 'add' },
  { label: '操作', prop: 'actions' },
];

const select = () => console.log('哈哈哈哈哈');

onMounted(() => {
  http.getTableData().then((res) => {
    state.data = res;
  });
});

const handleRefresh = () => {
  console.log(111111111111222222, state.form);
};

const handleEdit = (val) => {
  console.log('============', val);
};

</script>

<style>

</style>
