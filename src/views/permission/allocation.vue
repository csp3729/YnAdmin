<template>
  <div class="test">
    <!-- Allocation -->
    <div class="div1">子元素1</div>
    <div class="div2">
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
      <div>子元素2</div>
    </div>
    <div class="div3">子元素3</div>
  </div>
</template>
<script>
export default {

};
</script>
<style lang="scss" scoped>
.test {
  height: 100%;
  display: flex;
  flex-direction: column;
  > div {
    // float: left;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
.div1 {
  height: 100px;
  background: #ccc;
}
.div2 {
  flex: 1;
  background: pink;
  overflow-y: auto;
  // height: 200px;
}
.div3 {
  height: 150px;
  background: #58bc58;
}
</style>
