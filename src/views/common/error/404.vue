<template>
  <div class="error-404 df-cc">
    <div class="center mb50">
      <div class="top res">
        <div class="df">
          <div class="mr5">
            <div class="page">Page</div>
            <div class="not">Not Found</div>
          </div>
          <div class="code">404</div>
        </div>
        <div class="tip">您访问的页面不存在，请返回...</div>
        <img src="@/assets/images/404.png">
      </div>
      <div class="bottom df-cc">
        <el-button type="primary" size="medium" @click="$router.replace('/')">返回首页</el-button>
        <el-button type="primary" size="medium" @click="$router.go(-1)">返回上一页</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
.error-404 {
  width: 100%;
  height: 100%;
}

.top {
  width: 500px;
  padding: 10px;
  border-bottom: 1px solid #efefef;

  .page {
    font-size: 60px;
    line-height: 60px;
    color: #B9CDF7;
    font-weight: 600;
    letter-spacing: -5px;
  }
  .not {
    font-size: 30px;
    line-height: 34px;
    color: #D0E0F7;
    font-weight: 400;
    letter-spacing: -3px;
  }

  .code {
    font-family: fantasy;
    font-size: 120px;
    line-height: 100px;
    color: #409EFE;
    // color: $theme-color;
    text-shadow: 5px 3px 0 #eee;
    letter-spacing: -12px;
  }

  .tip {
    font-size: 20px;
    line-height: 34px;
    font-weight: 600;
    color: #409EFE;
    // color: $theme-color;
  }

  img {
    position: absolute;
    right: -30px;
    bottom: -75px;
  }
}

.bottom {
  padding: 75px 0 130px;
  .el-button {
    width: 100px;
    padding-left: 0;
    padding-right: 0;
    text-align: center;
    background-color: #409EFE;
    border-color: #409EFE;
    &:hover {
      opacity: .8;
    }
    & + & {
      margin-left: 20px;
    }
  }
}

</style>
