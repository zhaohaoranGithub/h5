<template>
  <div class="app-footer">
    <div class="app-footer__inner">
      <van-col span='12' class="app-footer-cell" @click.native="$router.push({name:'login'})">
          <div class="app-footer-cell__pic"></div>
          <div class="app-footer-cell__brief">登录</div>
      </van-col>
      <van-col span='12' class="app-footer-cell" @click.native="$router.push({name:'registerAccount'})">
        <div class="app-footer-cell__pic"></div>
        <div class="app-footer-cell__brief">注册</div>

      </van-col>
    </div>
  </div>
</template>

<script>
export default {
  name: "app-footer",

  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
$--base-border-radius: 20px;
@include b(app-footer) {
  padding-top: 67px;
  overflow: hidden;
  @include e(inner) {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    box-shadow: 0px -1px 6px 0px rgba(174, 174, 174, 0.5);
    border-top-right-radius: $--base-border-radius;
    border-top-left-radius: $--base-border-radius;
    background: white;
    height: 67px;
    z-index: 1111;
    @include b(app-footer-cell) {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-flow: column;
      a {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column;
      }
      @include e(brief) {
        font-size: 12px;
        font-family: "PingFangSC-Regular";
        font-weight: 400;
        color: #000000;
        margin-top: 5px;
      }
      &:nth-child(1) {
        @include e(pic) {
          width: 18px;
          height: 18px;
          @include utils-bg(url("./login.png") no-repeat, contain);
        }
        @include e(brief) {
          color: #1e5adc;
        }
      }
      &:nth-child(2) {
        @include e(pic) {
          width: 18px;
          height: 20px;
          @include utils-bg(url("./reg.png") no-repeat, contain);
        }
      }
    }
  }
}
</style>