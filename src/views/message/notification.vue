<template>
  <div>
    <el-button type="primary" @click="send1">页面通知</el-button>
    <el-button type="primary" @click="send2">桌面通知</el-button>
    <el-button type="primary">根据状态通知</el-button>
  </div>
</template>
<script setup>
import { ElNotification } from 'element-plus';

function send1() {
  ElNotification({
    title: '您有新消息', message: '显示消息', offset: 120,
  });
}

const send2 = () => {
  notification('您有新消息！', {
    // 通知显示正文。非必须，默认为空
    body: '你的好友XX上线了！',
    // 通知显示正文的图片地址。非必须，默认为空
    // image: 'imgae url',
    // 通知左侧图标。非必须，默认为空
    icon: '',
    // 通知的分类标记（ID）。非必须，默认为空
    tag: '',
    // 通知相关联的数据，通常用于方法的回调，传参。非必须，默认为空
    data: '可以是任意数据类型',
    // 通知显示延迟的时间。非必须，默认通知实例创建完成就显示
    // timestamp: '',
    // 通知主体内容的水平展示顺序，有点类似direction属性。非必须，默认值是auto, 可以是ltr或rtl
    dir: 'auto',
    // 当没有足够的空间来显示通知本身时，用于表示通知的图像的URL。非必须，默认为空
    // badge: 'xxx',
    // 通知的语言。非必须默认为空
    // lang: '',
    // 通知显示时，设备的振动模式。非必须，默认为空
    vibrate: [200, 100, 200],
    // 新通知出现是否覆盖旧的通知，覆盖（true）则永远只显示一条通知，不覆盖（false）则会多条通知重叠。非必须，默认为true
    // renotify: false,
    // 通知是否静音。非必须，默认为false，表示无声
    silent: false,
    // 通知声源文件地址。非必须，默认为空
    // sound: 'mp3',
    // 是否不在屏幕上显示通知信息。非必须，默认为false表示要显示
    noscreen: false,
    // 指定通知是否应该粘滞性，即不容易被用户清理。非必须，默认false表示不具粘滞性
    sticky: false,
    // 指定通知是否保持活性，直到用户点击或关闭。非必须，默认为false
    requireInteraction: false,
    unique: true,
    // duration: 4500,
  });
};

const nots = {};

const notification = (title, options) => {
  const winNotification = window.Notification || window.mozNotification || window.webkitNotification;
  winNotification?.requestPermission((status) => {
    if (status === 'granted') {
      const { duration, tag, unique } = options;
      const isUnique = unique && tag;
      if (isUnique) nots[tag]?.close();
      const not = new Notification(title, options);
      if (isUnique) nots[tag] = not;
      if (duration) {
        setTimeout(() => {
          not.close();
          delete nots[tag];
        }, duration);
      }
    }
    if (status === 'denied') {
      console.log('用户拒绝了推送');
    }
  });
};
</script>
<style lang="scss" scoped>

</style>
