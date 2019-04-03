<template>

  <div class="fullpage-container">
    <div class="fullpage-container__main-pic" :class="{'animated fadeIn':activeIndex===0}">
      <div class="fullpage-container__inner" :class="{'animated bounceIn':activeIndex===0}">

      </div>
      <div class="fullpage-container__content" :class="{'animated bounceInDown':activeIndex===0}">
        <div>原生体育APP</div>
        <div>给您带来更流畅的体验</div>
        <div>专业的设计为您创造更大的价值</div>
      </div>
      <fullpage-button :type="2" :class="{'animated bounceInUp':activeIndex===0}">
        下载APP
      </fullpage-button>
    </div>
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
  },
};
</script>


<style lang="scss" scoped>
@include b(fullpage-container) {
  img {
    width: 100%;
    height: 100%;
  }
  @include e(main-pic) {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    @include utils-bg(url("./main-bg.png") no-repeat top, 100% 100%);
  }

  @include e(inner) {
    /*position: absolute;*/
    /*width: 100%;*/
    height: 65%;
    max-height: 400px;
    /*top: 0;*/
    /*left: 0;*/
    /*z-index: 2;*/
    @include utils-bg(url('./inner-bg.png') no-repeat top, 100% 100%);
  }

  @include e(content){
    text-align: center;
    font-size: 15px;
    color: #2E5CD4;
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 122px;
    div{
      line-height: 25px;
    }
  }
  @media screen and (max-width: 360px){
    @include e(content) {
      display: none;
    }
    @include e(inner) {
      height: 400px;
    }
  }
}
</style>
