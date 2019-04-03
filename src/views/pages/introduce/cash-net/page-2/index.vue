<template>
  <div class="fullpage-container" :class="{'animated fadeIn':activeIndex===1}">
    <div class="fullpage-container__title" :class="{'animated bounceInLeft':activeIndex===1}"></div>
    <div class="fullpage-container__des" :class="{'animated bounceInRight':activeIndex===1}"></div>
    <div class="fullpage-container__girl" :class="{'animated fadeIn':activeIndex===1}"></div>
    <div class="fullpage-container__ag" :class="{'animated bounceInDown':activeIndex===1}"></div>
    <div class="fullpage-container__pt" :class="{'animated bounceInDown':activeIndex===1}"></div>
    <div class="fullpage-container__zr" :class="{'animated bounceInLeft':activeIndex===1}"></div>
    <div class="fullpage-container__lb" :class="{'animated bounceInRight':activeIndex===1}"></div>
    <div class="fullpage-container__bb" :class="{'animated bounceInRight':activeIndex===1}"></div>

    <fullpage-button :type="1" :class="{'animated bounceInUp':activeIndex===1}">
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
    @include e(title){
      width: 100%;
      height: 28px;
      @include utils-bg(url("./title.png") no-repeat center, contain);
      margin-top: 10%;
    }
    @include e(des){
      width: 100%;
      height: 188px;
      @include utils-bg(url("./des.png") no-repeat center, contain);
      margin-top: 3%;
    }
    @include e(girl){
      position: absolute;
      width: 100%;
      height: 100%;
      @include utils-bg(url("./girl.png") no-repeat center, cover);
      top: 0;
      left: 0;
    }
    @include e(ag){
      width: 89.5px;
      height: 72.5px;
      position: absolute;
      @include utils-bg(url("./ag.png") no-repeat center, cover);
      top: 38%;
      left: 12%;
    }
    @include e(pt){
      width: 77px;
      height: 59.5px;
      position: absolute;
      @include utils-bg(url("./pt.png") no-repeat center, cover);
      top: 42%;
      right: 10%;
    }
    @include e(zr){
      width: 76.5px;
      height: 58px;
      position: absolute;
      @include utils-bg(url("./zr.png") no-repeat center, cover);
      top: 60%;
      left: 13%;
    }
    @include e(lb){
      width: 76px;
      height: 48px;
      position: absolute;
      @include utils-bg(url("./lb.png") no-repeat center, cover);
      top: 59%;
      right: 21%;
    }
    @include e(bb){
      width: 81px;
      height: 58px;
      position: absolute;
      @include utils-bg(url("./bb.png") no-repeat center, cover);
      bottom: 20%;
      right: 0%;
    }
    @media screen and (max-device-height: 667px) {
      @include e(title) {
        margin-top: 5%;
      }
      @include e(des){
        margin-top: 2%;
      }
    }
  }
</style>
