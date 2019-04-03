<template>

  <div class="fullpage-container" :class="{'animated fadeIn':activeIndex===2}">
    <div class="fullpage-container__logo" :class="{'animated bounceInLeft':activeIndex===2}">

    </div>
    <div class="fullpage-container__title" :class="{'animated bounceInRight':activeIndex===2}">

    </div>
    <div class="fullpage-container__list" :class="{'animated bounceInUp':activeIndex===2}">
      <div class="fullpage-container__list-item">
        <div class="fullpage-container__list-img qq"></div>
        <div class="fullpage-container__list-text">QQ支付</div>
      </div>
      <div class="fullpage-container__list-item">
        <div class="fullpage-container__list-img jd"></div>
        <div class="fullpage-container__list-text">京东支付</div>
      </div>
      <div class="fullpage-container__list-item">
        <div class="fullpage-container__list-img wx"></div>
        <div class="fullpage-container__list-text">微信支付</div>
      </div>
    </div>
    <div class="fullpage-container__list" :class="{'animated bounceInDown':activeIndex===2}">
      <div class="fullpage-container__list-item">
        <div class="fullpage-container__list-img zfb"></div>
        <div class="fullpage-container__list-text">支付宝支付</div>
      </div>
      <div class="fullpage-container__list-item">
        <div class="fullpage-container__list-img kj"></div>
        <div class="fullpage-container__list-text">快捷支付</div>
      </div>
      <div class="fullpage-container__list-item">
        <div class="fullpage-container__list-img yl"></div>
        <div class="fullpage-container__list-text">银联支付</div>
      </div>
    </div>
    <fullpage-button :type="2" :class="{'animated bounceInUp':activeIndex===2}">
      下载APP
    </fullpage-button>

  </div>
</template>

<script>

import fullpageButton from "../../components/fullpage-button";
import fullpageDown from "../../components/fullpage-down";

export default {
  props:['swiperPageIndex'],
  components: {
    fullpageButton,
    fullpageDown
  },
  computed:{
     activeIndex(){
      return this.swiperPageIndex;
    }
  }
};
</script>


<style lang="scss" scoped>
@include b(fullpage-container) {
  width: 100%;
  height: 100%;
  padding-top: 2%;
  @include utils-bg(url("./bg.png") no-repeat bottom, 100% 100%);
  img {
    width: 100%;
    height: 100%;
  }
  @include e(logo) {
    width: 194px;
    height: 31px;
    margin-left: 12px;
    @include utils-bg(url("./logo.png") no-repeat top, contain);
  }
  @include e(title) {
    margin-top: 8%;
    width: 100%;
    height: 92px;
    @include utils-bg(url("./title.png") no-repeat center, contain);
  }
  @include e(list){
    width: 90%;
    margin: 5% auto 0;
    display: flex;
  }
  @include e(list-item){
    width: 33.33%;
    height: 70px;
    text-align: center;
    font-size: 18px;
    color: #203c70;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  @include e(list-img){
    width: 100%;
    height: 33px;
    background-size: contain;
    /*margin-bottom: 10px;*/
    &.qq{
      @include utils-bg(url("./qq.png") no-repeat center);
    }
    &.jd{
      @include utils-bg(url("./jd.png") no-repeat center);
    }
    &.wx{
      @include utils-bg(url("./wx.png") no-repeat center);
    }
    &.zfb{
      @include utils-bg(url("./zfb.png") no-repeat center);
    }
    &.kj{
      @include utils-bg(url("./kj.png") no-repeat center);
      height: 23px;
    }
    &.yl{
      @include utils-bg(url("./yl.png") no-repeat center);
      height: 24px;
    }
  }
}
</style>
