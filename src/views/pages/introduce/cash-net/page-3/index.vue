<template>
  <div class="fullpage-container" :class="{'animated fadeIn':activeIndex===2}">
    <div class="fullpage-container__title" :class="{'animated bounceInLeft':activeIndex===2}"></div>
    <div class="fullpage-container__des" :class="{'animated bounceInRight':activeIndex===2}"></div>
    <div class="fullpage-container__payment" :class="{'animated bounceInDown':activeIndex===2}"></div>
    <div class="fullpage-container__money" :class="{'animated fadeInLeftBig delay-3':activeIndex===2}"></div>
    <div class="fullpage-container__money-big" :class="{'animated fadeInLeftBig':activeIndex===2}"></div>
    <fullpage-button :type="1" :class="{'animated bounceInUp':activeIndex===2}">
      下载APP
    </fullpage-button>

  </div>
</template>


<script>

import fullpageButton from "../../components/fullpage-button";

import fullpageDown from "../../components/fullpage-down";

export default {
  props:['swiperPageIndex'],
  components: { fullpageDown, fullpageButton },
   computed:{
     activeIndex(){
      return this.swiperPageIndex;
    }
  }
};
</script>


<style lang="scss" scoped>
@include b(fullpage-container) {
  height: 100%;
  @include utils-bg(url("./bg.png") no-repeat top, cover);
  overflow: hidden;
  @include e(title) {
    width: 100%;
    height: 27.5px;
    @include utils-bg(url("./title.png") no-repeat center, contain);
    margin-top: 10%;
  }

  @include e(des){
    width: 100%;
    height: 146.5px;
    @include utils-bg(url("./des.png") no-repeat center, contain);
    margin-top: 5%;
  }

  @include e(payment){
    width: 100%;
    height: 194.5px;
    @include utils-bg(url("./payment.png") no-repeat center, contain);
    margin-top: 5%;
  }

  @include e(money){
    position: absolute;
    width: 100%;
    height: 100%;
    @include utils-bg(url("./money.png") no-repeat center, cover);
    left: 0;
    top: 0;
  }

  @include e(money-big){
    position: absolute;
    width: 100%;
    height: 100%;
    @include utils-bg(url("./money-big.png") no-repeat center, cover);
    left: 0;
    top: 0;
  }

  @media screen and (max-device-height: 667px) {
    @include e(title) {
      margin-top: 5%;
    }
    @include e(des){
      margin-top: 2%;
    }
    @include e(payment){
      margin-top: 2%;
    }
  }
  @media screen and (max-width: 360px) {
    
  }
  .delay-3{
    animation-delay: 0.3s;
  }
}
</style>
