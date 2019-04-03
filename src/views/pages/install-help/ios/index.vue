<template>
    <swiper :options="swiperOptionCash">
        <!--<div class="page-inner">-->
        <!--<div class="page-inner__logo">-->
        <!--<img src="./logo.png" alt="">-->
        <!--</div>-->
        <!--<div class="page-inner__brief">-->
        <!--丰富全面的游戏产品<br>安全快捷的资金管理-->
        <!--</div>-->
        <!--<div class="page-inner__button">-->
        <!--<div class="page-inner__download">-->
        <!--下载APP-->
        <!--</div>-->
        <!--<div class="page-inner__install-help">-->
        <!--IOS安装指南-->
        <!--</div>-->
        <!--<div class="page-inner__down">-->
        <!--<img src="./down.png" alt="">-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <swiper-slide>
            <div class="page">
                <div class="page-inner-step">
                    <div class="page-inner-step__header">
                        <div class="page-inner-step__left">1</div>
                        <div class="page-inner-step__text">下载应用程序</div>
                    </div>

                </div>

                <div class="page-inner-step">
                    <div class="page-inner-step__header">
                        <div class="page-inner-step__left">2</div>
                        <div class="page-inner-step__text">应用程序自动安装</div>
                    </div>
                    <div class="page-inner-step__img page-inner-step__img--2">
                        <img src="./step2.png" alt="">
                    </div>
                </div>
                <div class="page-inner-step">
                    <div class="page-inner-step__header">
                        <div class="page-inner-step__left">3</div>
                        <div class="page-inner-step__text">关闭弹窗,进入“设置”</div>
                    </div>
                    <div class="page-inner-step__img page-inner-step__img--3">
                        <img src="./step3.png" alt="">
                    </div>
                </div>
            </div>
        </swiper-slide>
        <swiper-slide>
            <div class="page">
                <div class="page-inner-step">
                    <div class="page-inner-step__header">
                        <div class="page-inner-step__left">4</div>
                        <div class="page-inner-step__text">进入“通用”</div>
                    </div>
                    <div class="page-inner-step__img">
                        <img src="./step4.png" alt="">
                    </div>
                </div>
                <div class="page-inner-step">
                    <div class="page-inner-step__header">
                        <div class="page-inner-step__left">5</div>
                        <div class="page-inner-step__text">进入设备管理</div>
                    </div>
                    <div class="page-inner-step__img">
                        <img src="./step5.png" alt="">
                    </div>
                </div>
                <div class="page-inner-step">
                    <div class="page-inner-step__header">
                        <div class="page-inner-step__left">6</div>
                        <div class="page-inner-step__text">找到所对应的企业级应用，选择“信任”</div>
                    </div>
                    <div class="page-inner-step__img">
                        <img src="./step6.png" alt="">
                    </div>
                </div>
            </div>
        </swiper-slide>
        <swiper-slide>
            <div class="page">
                <div class="page-inner-step">
                    <div class="page-inner-step__header">
                        <div class="page-inner-step__left">7</div>
                        <div class="page-inner-step__text">点击弹窗的弹框中的“信任”，大功告成！</div>
                    </div>
                    <div class="page-inner-step__img">
                        <img src="./step7.png" alt="">
                    </div>
                </div>
            </div>
        </swiper-slide>
    </swiper>
</template>

<script>
import swiper from "@/mixins/swiper";
export default {
  name: "ios-download",
  mixins: [swiper]
};
</script>


<style lang="scss" scoped>
$--font-family: "微软雅黑";
$--font-size: 15px;
$--main-color: #1e5adc;
@include b(page) {
  @include utils-bg(url("./bg.png") no-repeat top, cover);
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

  @include b(page-inner) {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    @include e(logo) {
      width: 160px;
      height: 70px;
      margin-top: 130px;
    }
    @include e(brief) {
      font-family: $--font-family;
      color: $--main-color;
      font-size: $--font-size;
      margin-top: 53px;
      width: 180px;
      height: 51px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      &:before {
        content: "";
        position: absolute;
        width: 13px;
        height: 13px;
        display: block;
        left: 0;
        top: 0;
        @include utils-bg(url("./left-top.png") no-repeat top, cover);
      }
      &:after {
        content: "";
        position: absolute;
        width: 13px;
        height: 13px;
        display: block;
        right: 0;
        bottom: 0;
        @include utils-bg(url("./right-bottom.png") no-repeat top, cover);
      }
    }

    @include e(down) {
      margin-top: 12px;
      width: 35px;
      height: 38px;
    }
    @include e(button) {
      padding-top: 95px;
      display: flex;
      justify-content: center;
      flex-flow: column;
      align-items: center;
      @include e(download) {
        width: 248px;
        height: 39px;
        background: $--main-color;
        border-radius: 6px;
        text-align: center;
        font-family: $--font-family;
        cursor: pointer;
        line-height: 39px;
        color: white;
        font-size: $--font-size;
      }
      @include e(install-help) {
        color: $--main-color;
        font-size: $--font-size;
        font-family: $--font-family;
        margin-top: 19px;
      }
    }
  }
  img {
    width: 100%;
    height: 100%;
  }
  @include b(page-inner-step) {
    padding-top: 13px;
    padding-left: 28px;
    @include e(header) {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    @include e(left) {
      width: 39px;
      height: 39px;
      line-height: 39px;
      text-align: center;
      background: $--main-color;
      border-radius: 100%;
      color: white;
      font-size: 30px;
      box-shadow: 4px 4px 6px 1px rgba(30, 90, 220, 0.45);
    }
    @include e(text) {
      margin-left: 15px;
      font-size: $--font-size;
      font-family: $--font-family;
      color: #000;
    }
    @include e(img) {
      padding-left: 39px;
      padding-top: 5px;
      max-width: 232px;
      @include m(2) {
        height: 305px;
      }
    }
  }
}
</style>
