<template>
  <div class="search-tool">
    <div class="tool-content df" :style="{ height: height }">
      <el-form class="df flex1 fw-w" :model="form" label-width="100px">
        <template v-for="(t, i) in items" :key="i">
          <el-form-item class="tool-item" :label="t.label">
            <slot v-if="t.slot" :name="t.slot"></slot>
            <el-select v-else-if="t.type === 'select'" class="w100" v-model="form[t.prop]">
              <el-option  v-for="opt in t.options" :key="opt.value" :label="opt.label" :value="opt.value" />
            </el-select>
            <el-input v-else v-model="form[t.prop]"></el-input>
          </el-form-item>
        </template>
        <div v-if="state.more && state.open" class="tool-btns flex1 tr">
          <el-button @click="clear">清空</el-button>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
        </div>
      </el-form>
      <div v-if="!state.more || !state.open" class="tool-btns ml20">
        <el-button color="red" @click="clear">清空</el-button>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </div>
    </div>
    <span v-if="state.more" class="tool-open-btn pointer" @click="handleOpen">
      <i :class="`el-icon-d-arrow-${state.open?'left':'right'}`"></i>
    </span>
  </div>
</template>

<script setup>
import {
  reactive, computed, defineProps, defineEmits,
} from 'vue';

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  defaultOpen: Boolean,
  modelValue: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['handleSearch', 'update:modelValue']);

const state = reactive({
  more: props.items.length > 5,
  open: props.defaultOpen,
});

const height = computed(() => {
  let line = 1;
  if (state.more && state.open) {
    line = Math.ceil(props.items.length / 5) + (props.items.length % 5 === 0 ? 1 : 0);
  }
  return `${line * 51}px`;
});

const form = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});

function handleOpen() {
  state.open = !state.open;
}

function clear() {
  emit('update:modelValue', {});
}

function handleSearch() {
  emit('handleSearch');
}
</script>

<style lang="scss" scoped>
.search-tool {
  position: relative;
  &:hover .tool-open-btn {
    display: block;
  }
}
:deep(.el-input), :deep(.el-select) {
  width: 100% !important;
}
.tool- {
  &content {
    overflow: hidden;
    transition: all .3s;
  }
  &item {
    width: 19.2%;
    margin-left: 1%;
    &:nth-child(5n+1) {
      margin-left: 0;
    }
  }
  &open-btn {
    display: none;
    padding: 5px 2px;
    position: absolute;
    left: 50%;
    bottom: 0px;
    z-index: 1001;
    transform: translate(-50%, 29%) rotate(90deg);
    color: $theme-color;
    animation: shake 1.5s infinite;
  }
}

@keyframes shake {
  from {
    bottom: 0;
  }
  25% {
    bottom: 2px;
  }
  50% {
    bottom: 4px;
  }
  75% {
    bottom: 2px;
  }
  to {
    bottom: 0;
  }
}

</style>
