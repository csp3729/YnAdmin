<template :inheritAttrs="false">
  <el-upload
    v-bind="$attrs"
    ref="imageUpload"
    :action="action"
    :show-file-list="false"
    :headers="headers"
    multiple
    :before-upload="beforeImageUpload"
    :on-progress="uploadProgress"
    :on-success="onSuccess"
    :file-list="modelValue"
  >
    <template #trigger>
      <slot name="trigger">
        <el-button type="primary">上传图片</el-button>
      </slot>
    </template>
    <slot />
    <template #tip>
      <div class="el-upload__tip">
        <slot name="tip" />
      </div>
    </template>
  </el-upload>
  <Draggable class="upload-img-list df fw-w" @end="onEnd" v-model="dragList" item-key="name">
    <template #item="{ element: { raw, percentage, imageUrl, status }, index }">
      <div :class="['list-item res', status ]" :style="{ width: `${imageSize}px`, height: `${imageSize}px` }">
        <el-image
          class="list-item--image"
          :src="loadImageUrl({ raw, imageUrl })"
          fit="contain"
          :preview-src-list="srcList"
          hide-on-click-modal />
        <div class="list-item--masking df-cc fd-c pa5">
          <span class="fail-tip">{{ status === 'error' ? '上传失败': ''}}</span>
          <el-progress class="progress" :status="status === 'error' ? 'exception':''" :show-text="false" :percentage="percentage" :stroke-width="2" />
          <span class="del-btn el-icon-delete" @click="handleRemove(index)"></span>
        </div>
        <span class="remove-btn abs el-icon-close" @click="handleRemove(index)" />
      </div>
    </template>
  </Draggable>
</template>

<script setup>
import {
  ref, computed, defineProps, defineEmits,
} from 'vue';
import Draggable from 'vuedraggable';
import { ElMessageBox, ElMessage } from 'element-plus';
import { store } from '@uts/instance';

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  action: {
    type: String,
    default: `${import.meta.env.VITE_BASE_URL}/tool/oss/upload`,
  },
  headers: {
    type: Object,
    default: () => ({ Authorization: store.state.user.token }),
  },
  config: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['update:modelValue']);

const imageUpload = ref(null);

const configData = computed(() => ({
  size: 10,
  showedSize: 120,
  // showedRaidus: 4,
  ...props.config,
}));

const imageSize = computed(() => {
  const size = configData.value.showedSize;
  return size >= 80 ? size : 120;
});

const dragList = computed({ get: () => props.modelValue, set: (list) => emit('update:modelValue', list) });

const srcList = computed(() => props.modelValue.map((item) => loadImageUrl(item)));

function loadImageUrl({ raw, imageUrl }) {
  return imageUrl || (window.URL ?? window.webkitURL).createObjectURL(raw);
}

function beforeImageUpload(file) {
  const { size } = configData.value;
  const isJPG = ['image/png', 'image/jpg', 'image/jpeg'].includes(file.type);
  const isLt2M = file.size / 1024 / 1024 < size;
  if (!isJPG) ElMessage.error('上传图片只能是 JPG/JPEG/PNG 格式!');
  if (!isLt2M) ElMessage.error(`上传图片大小不能超过 ${size}MB!`);
  return isJPG && isLt2M;
}

function handleRemove(index) {
  const file = props.modelValue[index];
  if (file.status === 'error') deleteImage(index);
  else {
    ElMessageBox.confirm('确认移除该图片吗？', '移除图片', {
      distinguishCancelAndClose: true,
      confirmButtonText: '移除',
      cancelButtonText: '取消',
    }).then(() => {
      if (file.percentage < 100) imageUpload.value.abort(file);
      deleteImage(index);
    }).catch(() => {});
  }
}

function deleteImage(index) {
  const list = [...props.modelValue];
  list.splice(index, 1);
  emit('update:modelValue', list);
  ElMessage.success('图片已移除');
}

function uploadProgress(event, file, fileList) {
  emit('update:modelValue', fileList);
}

function onSuccess(res, file, fileList) {
  // console.log(res.message); // 这里有可能应为token无效而上传失败，可能需要处理一下
  emitValue(fileList); // 正常情况下直接调用就完事了
}

function emitValue(fileList) {
  const list = fileList.map((item) => {
    const { response } = item;
    if (response) {
      if (response.code === 200) {
        return { imageUrl: response.data };
      }
      item.status = 'error';
    }
    return item;
  });
  emit('update:modelValue', list);
}

function onEnd() {}

</script>

<style lang="scss" scoped>
.upload-img-list {
  margin: 5px 0 10px -5px;
  .list-item {
    border-radius: 4px;
    margin: 5px;
    overflow: hidden;
    background: #f5f5f5;
    &:not(.uploading, .error):hover .remove-btn {
      display: block;
    }
    &.uploading, &.error {
      .list-item--masking {
        display: flex;
      }
    }
    &.error .del-btn {
      opacity: 1;
      color: #F56C6C;
    }
    &--image {
      width: 100%;
      height: 100%;
    }
    &--masking {
      display: none;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.4);
      position: absolute;
      top: 0;
      .del-btn {
        opacity: 0;
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 8px;
      }
      .fail-tip {
        height: 21px;
        color: #F56C6C;
      }
      .progress {
        margin: 10px 0;
        width: 100%;
      }
      &:hover .del-btn {
        opacity: 1;
      }
    }
    .remove-btn {
      display: none;
      cursor: pointer;
      font-size: 20px;
      top: 4px;
      right: 3px;
      color: #fff;
      text-shadow: 0px 0px 3px #000;
    }
  }
}
</style>
