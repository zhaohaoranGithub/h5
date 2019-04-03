<template>
  <slide-container>
    <div class="share-main-container">
      <div class="share-main-container__bg">
        <div class="share-main-container__inner">
          <div class="share-main-container__logo">

          </div>
          <div class="share-main-container__title">
          </div>
          <div class="share-main-container__content">
            <qr-code :url="host" class="share-main-container__qr-code"></qr-code>
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
        host: window.location.host + '/introduce-sports',
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
      position: relative;
      //  min-height:100vh;
      @include utils-bg(url("./bg.png") center no-repeat, contain);
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
      z-index: 1;
    }
    @include e(logo) {
      width: 240px;
      height: 45px;
      @include utils-bg(url("../logo.png") no-repeat top, cover);
    }
    @include e(title) {
      width: 294px;
      height: 78px;
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
