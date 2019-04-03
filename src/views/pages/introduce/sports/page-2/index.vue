<template>

  <div class="fullpage-container" :class="{'animated fadeIn':activeIndex===1}">
    <div class="fullpage-container__header" :class="{'animated bounceInLeft ':activeIndex===1}">
      <img src="./logo.png" alt="">
    </div>
    <div class="fullpage-container__title" :class="{'animated bounceInRight ':activeIndex===1}"></div>
    <div class="fullpage-container__left" :class="{'animated bounceInLeft ':activeIndex===1}">

    </div>
    <div class="fullpage-container__right" :class="{'animated bounceInRight ':activeIndex===1}">

    </div>
      <fullpage-button :type="2" :class="{'animated bounceInUp':activeIndex===1}">
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
  height: 100%;
  overflow: hidden;
  @include utils-bg(url("./bg.png") no-repeat bottom, 100% 100%);
  img {
    width: 100%;
    height: 100%;
  }

  @include e(header) {
    width: 193.5px;
    height: 31px;
    padding-top: 2%;
    margin-left: 12px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  @include e(title){
    width: 100%;
    height: 97.5px;
    margin-top: 5%;
    @include utils-bg(url("./title.png") no-repeat center, contain);
  }
   @include e(left){
    width: 200px;
    height: 212.5px;
    position: absolute;
    left: 0;
    top: 30%;
     @include utils-bg(url("./pic-left.png") no-repeat top,contain);
  }
  @include e(right) {
    width: 222.6px;
    height: 218px;
    right: 0;
    top: 30%;
    position: absolute;
    @include utils-bg(url("./pic-right.png") no-repeat top, contain);
  }


}
</style>
