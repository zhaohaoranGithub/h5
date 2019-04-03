<template>
  <div class="mobile-swiper" :class="`mobile-swiper_${_uid}`">
    <div class="mobile-swiper__mask"></div>
    <div class="mobile-swiper__inner">
      <swiper class="mobile-swiper__swiper" :options="options" ref="mainSwiper">
        <swiper-slide class="mobile-swiper__slide" :data-hash="index" v-for="(pic, index) in list" :key="index">
          <img class="mobile-swiper__pic" :src="pic"/>
        </swiper-slide>
        <div v-transfer-dom="`.mobile-swiper_${_uid}`" class="mobile-swiper__pagination mobile-swiper-pagination swiper-pagination swiper-pagination-white" slot="pagination"></div>
      </swiper>
    </div>
    <div class="mobile-swiper__shell"></div>
  </div>
</template>

<script>
  export default {
    name: "index",
    props: ['list', 'options'],
  };
</script>

<style lang="scss">
  $--inner-width: 292px !default;
  $--inner-height: 627px !default;

  @include b(mobile-swiper) {
    position: relative;
    width: 339px;
    height: 661px;

    @include e(inner) {
      position: relative;
      top: 18px;
      width: $--inner-width;
      height: $--inner-height;
      margin: 0 auto;
      box-shadow: 0px 10px 100px 0px rgba(0,0,0,.24);
    }

    @include e(shell) {
      position: absolute;
      height: 661px;
      width: 339px;
      @include utils-bg(url(./iphone.png) no-repeat);
      top: 0;
      left: 0;
      z-index: 5;
    }

    @include e(mask) {
      position: absolute;
      width: $--inner-width + 4;
      height: $--inner-height + 4;
      background:linear-gradient(180deg,rgba(30,90,220,1) 0%,rgba(58,136,184,1) 100%);
      top: 18px;
      left: 50%;
      transform: translateX(-50%);
    }

    @include e(slide) {
      width: $--inner-width;
      height: $--inner-height;
      overflow: hidden;
    }
    @include e(pic) {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      background-size: contain;
      width: 294px;
      height: 646px;
    }

    @include e(pagination) {
      bottom: -40px;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  @include b(mobile-swiper-pagination) {
    .swiper-pagination-bullet {
      width: 6px;
      height: 6px;
      background-color: #a8b3c0;
      transition: all 0.3s ease;
      margin: 0 5px;
      opacity: 1;
      outline: none;

      &.swiper-pagination-bullet-active {
        width: 20px;
        border-radius: 20px;
        background-color: #1e5adc;
      }
    }
  }

</style>