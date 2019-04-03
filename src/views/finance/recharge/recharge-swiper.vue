<template>
  <swiper class="recharge-swiper" :options="swiperOption">
    <swiper-slide :data-hash="index"  v-for="(info, index) in cSwiperList" :key="index">
      <div class="recharge-swiper__slide-bg" :style="info.image" ></div>
    </swiper-slide>
  </swiper>
</template>

<script>

  import {advertListApi} from '@/services/api/advert';

  import {getCommand, swiper} from '@/build';

  export default {
    name: "recharge-swiper",

    mixins: [getCommand, swiper],

    data() {
      return {
        defaultSwiper: [
          {
            imgPic: require('./bg.png')
          },
        ],
      };
    },

    mounted() {
      this.bindGet(advertListApi, 'swiperList', {
        sendingData: {
          position: consts.AD_FINANCE
        },
        ...this.defaultSwiperResponseFunc()
      });

      this.getAll();
    }
  };
</script>

<style lang="scss" scoped>
  @include b(recharge-swiper) {
    overflow: hidden;
    height: 145px;
    @include e(slide-bg) {
      height: 100%;
      width: 100%;
      border-radius: 12px;
      margin: auto;
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
    }
  }
</style>