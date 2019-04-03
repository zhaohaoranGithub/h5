<template>
  <div class="fullpage-container" :class="{'animated fadeIn':activeIndex===0}">
    <div class="fullpage-container__title" :class="{'animated bounceInLeft':activeIndex===0}"></div>
    <div class="fullpage-container__des" :class="{'animated bounceInRight':activeIndex===0}"></div>
    <div class="fullpage-container__iron-man" :class="{'animated slideInDown':activeIndex===0}"></div>
    <div class="fullpage-container__captain" :class="{'animated zoomIn':activeIndex===0}"></div>
    <div class="fullpage-container__girl" :class="{'animated fadeInRight':activeIndex===0}"></div>
    <div class="fullpage-container__poker" :class="{'animated bounceIn':activeIndex===0}"></div>
    <div class="fullpage-container__table" :class="{'animated fadeIn':activeIndex===0}"></div>
    <fullpage-button :type="1" :class="{'animated bounceInUp':activeIndex===0}">
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
  },
};
</script>


<style lang="scss" scoped>
@include b(fullpage-container) {
  width: 100%;
  height: 100%;
  @include utils-bg(url("./bg.png") no-repeat top, 100% 100%);
  overflow: hidden;

  @include e(title){
    width: 100%;
    height: 38px;
    @include utils-bg(url('./title.png') center no-repeat, contain);
    margin-top: 5%;
  }

  @include e(des){
    width: 100%;
    height: 49px;
    @include utils-bg(url('./des.png') center no-repeat, contain);
    margin-top: 1%;
  }

  @include e(iron-man){
    position: absolute;
    width: 100%;
    height: 100%;
    @include utils-bg(url('./iron-man.png') center no-repeat, cover);
    top: 5%;
    left: 0;
  }

  @include e(captain){
    position: absolute;
    width: 250px;
    height: 344.5px;
    @include utils-bg(url('./captain.png') center no-repeat, contain);
    left: -20px;
    bottom: 14%;
    z-index: 3;
  }

  @include e(girl){
    position: absolute;
    width: 138px;
    height: 320px;
    @include utils-bg(url('./girl.png') center no-repeat, contain);
    top: 25%;
    right: 10%;
    z-index: 1;
  }

  @include e(poker){
    position: absolute;
    width: 100%;
    height: 359.5px;
    @include utils-bg(url('./poker.png') center no-repeat, cover);
    left: 0;
    bottom: 0;
    z-index: 3;
  }

  @include e(table){
    position: absolute;
    width: 100%;
    height: 178px;
    @include utils-bg(url('./table.png') center no-repeat, 100% 100%);
    left: 0;
    bottom: 0;
    z-index: 2;
  }

   @media screen and (max-device-height: 667px) {
     @include e(iron-man){
       margin-top: 10px;
     }
     @include e(captain){
      /*transform: scale(0.9,0.9);*/
       left: -5%;
       bottom: 10%;
     }
     @include e(girl){
       right: 12%;
       top: 23%;
     }
   }
  @media screen and (max-device-height: 640px) {
    @include e(iron-man){
      margin-top: 8%;
    }
    @include e(captain){
      /*transform: scale(0.8,0.8);*/
      left: -6%;
      bottom: 8%;
    }
    @include e(girl){
      transform: scale(0.8,0.8);
      right: 13%;
      top: 20%;
    }
  }
}
</style>
