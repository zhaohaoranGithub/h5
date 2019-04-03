<template>
  <slide-container>
    <div class="share-main-container">
      <div class="share-main-container__bg">
        <div class="share-main-container__girl"></div>
        <div class="share-main-container__inner">
          <div class="share-main-container__logo">

          </div>
          <div class="share-main-container__title">
          </div>
          <div class="share-main-container__content">
            <qr-code :url="host"></qr-code>
            <share-button>
              <div class="share-button__cell">
                长按二维码保存到相册
              </div>
              <div class="share-button__cell" @click="onCopy()">
                复制下载链接
              </div>
            </share-button>
          </div>
        </div>
      </div>
    </div>
  </slide-container>
</template>

<script>
  import slideContainer from "../components/slide-container";

  import qrCode from "../components/qr-code";

  import shareButton from "../components/share-button";

  import copy from "../../../../mixins/copy";

  export default {
    name: "share-sports",
    data() {
      return {
        host: window.location.host + '/introduce-cashnet',
      };
    },

    mixins: [copy],


    components: {
      slideContainer,
      shareButton,
      qrCode
    }
  };
</script>

<style lang="scss" scoped>
  @include b(share-main-container) {
    height: 100%;

    @include e(bg) {
      height: 100%;
      overflow: hidden;
      position: relative;
      //  min-height:100vh;
      @include utils-bg(url("./bg.png") bottom no-repeat, 100% 100%);
    }
    @include e(girl){
      width: 100%;
      height: 571.5px;
      position: absolute;
      @include utils-bg(url("./girl.png") top no-repeat,contain);
      top: 170px;
      left: 0;
    }
    @include e(inner) {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-flow: column;
      // height: 100%;
      padding-top: 41px;
      /*position: relative;*/
      z-index: 2;
    }
    @include e(logo) {
      width: 240px;
      height: 45px;
      @include utils-bg(url("../logo.png") no-repeat top, cover);
    }
    @include e(title) {
      width: 322.5px;
      height: 57.5px;
      margin-top: 10px;
      @include utils-bg(url("title.png") no-repeat top, cover);
    }
    @include e(content) {
      width: 100%;
      position: absolute;
      top: 45%;
      left: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

  }
</style>
