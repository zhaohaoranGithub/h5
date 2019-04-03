<template>
  <div class="app-download-out">
    <div class="app-download">
        <div class="app-download__left">
          <img class="img-recreation animated" key="one" src="./recreation-figure.png" alt="" v-if="activeIndex === 0">
          <img class="img-sports animated" key="two" src="./sports-figure.png" alt=""  v-if="activeIndex === 1">
        </div>
        <div class="app-download__center">
          <mobile-swiper :list="list" :options="swiperOption"></mobile-swiper>
        </div>
        <div class="app-download__right">
          <div class="app-download__app">
            APP下载
          </div>
          <div class="app-download__nav">
            <div class="app-download__tab" :class="{'is-active': activeIndex === 0}" @click="activeIndex = 0">
              贝博娱乐APP
            </div>
            <div class="app-download__tab" :class="{'is-active': activeIndex === 1}" @click="activeIndex = 1">
              贝博体育APP
            </div>
            <div class="app-download__brief app-download__brief--right">
              您可以通过扫描二维码下载该<br> 应用程序。
            </div>
          </div>
          <div class="app-download__qrs">
            <div class="app-download__qr" v-if="activeIndex === 0">
              <div class="app-download__qr-pic-wrapper">
                <!-- <img class="app-download__qr-pic" src="./qrcode-main.png"/> -->
                <qriously :value="getDownloadCode('pc')" :size="size" :backgroundAlpha="backgroundAlpha" />
              </div>
              <div class="app-download__qr-name">
                建议使用浏览器自带扫码工具
              </div>
            </div>
            <div class="app-download__qr" v-else>
              <div class="app-download__qr-pic-wrapper">
                <!-- <img class="app-download__qr-pic" src="./qrcode-sports.png" /> -->
                <qriously :value="getDownloadCode('sports')" :size="size" :backgroundAlpha="backgroundAlpha" />
              </div>
              <div class="app-download__qr-name">
                建议使用浏览器自带扫码工具
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
  import MobileSwiper from "./mobile-swiper";
  import {qrCode} from '@/build';
  export default {
    name: "app-download",
    mixins:[qrCode],
    components: {
      MobileSwiper
    },
    data() {
      return {
        // figurePic: require('./recreation-figure.png'),
        activeIndex: 0,
        swiperOption: {
          loop: true,
          spaceBetween: 0,
          autoplay: {
            delay: 5000
          },
          pagination: {
            el: ".swiper-pagination",
            clickable: true
          }
        }
      };
    },
    computed:{
      list(){
        if(this.activeIndex == 0){ //娱乐
          return  [
            require("./recreation-1.png"),
            require("./recreation-2.png"),
            require("./recreation-3.png")
          ]
        }else if(this.activeIndex == 1){//体育
          return [
            require("./sports-1.png"),
            require("./sports-2.png"),
            require("./sports-3.png")
          ]
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  $--main-width: 1200px !default;
  $--center-top: 70px !default;
  $--aside-top: 120px !default;
  @include b(app-download-out){
    background: url(./app-download-bg.png) no-repeat center;
    background-size: 100% 100%;
    padding: 0 0 100px;
  }
  @include b(app-download) {
    @include main-center($--main-width);
    position: relative;
    display: flex;
    justify-content: space-between;
    @include e(left) {
      width: 400px;
      height: 642px;
      padding-top: 100px;
      /*background: url(./sports-figure.png) no-repeat center;*/
      position: relative;
      img{
        display: block;
        position: absolute;
        left: -200px;
        animation-name: fadeInRight-50;
      }
      .img-sports{
        left: -50px;
      }
    }

    @include e(right) {
      margin-top: $--aside-top;
      width: 400px;
    }
    @include e(center) {
      flex: 0 0 339px;
      margin: $--center-top 84px 0 54px;
    }
    @include e(app) {
     font-size: 40px;
      font-weight: bold;
      margin-bottom: 30px;
    }
    @include e(title) {
      font-size: 38px;
      font-weight: bold;

      @include m(left) {
        margin-bottom: 20px;
      }
      @include m(right) {
        margin-bottom: 20px;
      }
    }
    @include e(sub-title) {
      font-size: 28px;
      color: #2c343a;
      margin-bottom: 8px;
    }
    @include e(brief) {
      font-size: 16px;
      color: rgba(136, 151, 170, 0.7);
      white-space: nowrap;
      @include m(left) {
        margin-bottom: 117px;
      }
    }
    @include e(address) {
      font-size: 24px;
      font-weight: bold;
    }

    @include e(qrs) {
      display: flex;
    }
    @include e(qr) {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 0 0 130px;
    }

    @include e(nav) {
      font-size: 28px;
      color: $--color-gray;
      margin-bottom: 50px;
      height: 220px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    @include e(tab) {
      width: 236px;
      height: 61px;
      cursor: pointer;
      border: 1px solid #1E5ADC;
      border-radius: 8px;
      font-weight: bold;
      font-size: 28px;
      color: #1E5ADC;
      letter-spacing: 0.97px;
      line-height: 61px;
      text-align: center;
      @include when(active) {
        background: #1E5ADC;
        border: 1px solid #3C39D7;
        color: #FFFFFF;
      }
    }

    @include e(qr-pic-wrapper) {
      width: 184px;
      height: 184px;
      box-shadow: 0px 6px 32px 0px rgba(0, 0, 0, 0.15);
      margin-bottom: 28px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: $--border-radius-base;
    }
    @include e(qr-pic) {
      width: 125px;
      height: 125px;
    }
    @include e(qr-name) {
      font-size: $--font-size-small;
      color: #a8b3c0;
    }

    @include e(link-title) {
      color: rgba(136, 151, 170, 0.7);
      margin-bottom: 10px;
    }
    @include e(link-address) {
      position: relative;
      font-size: 21px;
      color: $--color-primary;
      display: block;
      margin-bottom: 35px;

      &:after {
        position: absolute;
        content: "...........................";
        letter-spacing: 4px;
        bottom: -16px;
        left: 0;
      }
    }
  }
</style>