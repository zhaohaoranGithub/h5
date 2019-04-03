<template>
  <div class="share-qr-code">
    <!-- <div class="share-qr-code__title">
        移动端APP下载二维码
    </div> -->
    <div class="share-qr-code__box">
      <div class="share-qr-code__pic">
        <qriously :value="url" :size="155" :backgroundAlpha='1' background="white" class="share-qr-code__inner" id='mycanvas' v-if='canvasImg'/>
        <img :src="baseUri" alt="" v-else>
        <!-- <img :src="url" alt=""> -->
      </div>
    </div>
  </div>
</template>

<script>
  const host = window.location.host;
  const defaultUrl = host + "/download";
  export default {
    name: 'qr-code',
    data() {
      return {
        canvasImg: true,
        baseUri: '',
        backgroundAlpha:1,
      }
    },
    props: {
      url: {
        type: String,
        default: defaultUrl,
      },
    },
    mounted() {
      this.toImg();
    },

    methods: {
      //将生成的二维码保存为图片
      toImg() {
        let canvas = document.querySelector("#mycanvas>canvas");
        this.baseUri = canvas.toDataURL("image/png");
        this.canvasImg = false;
      },

    }
  };
</script>

<style lang="scss" scoped>
  @include b(share-qr-code) {
    /*padding-top: 54px;*/
    display: flex;
    justify-content: center;
    flex-flow: column;
    align-items: center;
    @include e(title) {
      width: 190px;
      height: 28px;
      line-height: 28px;
      background: rgba(0, 0, 0, 1);
      text-align: center;
      border-radius: 14px;
      font-size: 15px;
      font-family: "MicrosoftYaHeiUI";
      font-weight: 400;
      color: #ffffff;
    }

    @include e(box) {
      width: 155.5px;
      height: 155.5px;
      background: white;
      border: 1px solid #4C4B4B;
      // box-shadow: 0px 10px 22px 0px rgba(8, 11, 89, 0.4);
      margin-top: 11px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px;
    }

    @include e(pic) {
      width: 158px;
      height: 158px;

      img {
        width: 100%;
        height: 100%;
        background: white;
      }
    }
  }
</style>
