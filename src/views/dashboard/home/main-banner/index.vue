<template>
  <div class="main-banner">
    <van-swipe :autoplay="3000" indicator-color="white" v-if='imgList'>
      <van-swipe-item v-for='(item,index) in imgList' :key="index">
        <div tag="div" @click="openUrl(item.actionUrl)" class="main-banner__inner">
          <img :src="item.image" alt="" width="100%" height="100%">
        </div>
      </van-swipe-item>
    </van-swipe>
    <!-- <swiper :options="swiperOption" class="main-banner__swiper">
      <swiper-slide v-for='(item,index) in imgList' :key="index">
        <router-link tag="div" :to='item.actionUrl' class="main-banner__inner">
          <img :src="item.image" alt="" width="100%" height="100%">
        </router-link>

      </swiper-slide>

    </swiper>
    <div class="main-banner__pagination"></div> -->
  </div>
</template>

<script>
  import {getLogin} from "@/utils/auth";
  import {advertListApi} from "@/services/api/advert";
  import {getCommand} from "@/build";

  export default {
    name: "main-banner",

    mixins: [getCommand],

    data() {
      return {
        imgList: [],
        swiperOption: {
          autoplay: true,
          pagination: {
            el: ".main-banner__pagination",
            paginationType: "bullets"
          }
        }
      };
    },
    computed: {
    ...mapGetters(["isLogin"])
    },

    mounted() {

      this.bindGet(advertListApi, "swiperList", {
        sendingData: {
          position: consts.AD_HOME
        },
        afterSuccess: ([result, data]) => {
          if (result) {
            this.imgList = data;
          }
        }
      });

      this.getAll();
    },
    methods: {
      openUrl(url) {
        if (this.isLogin) {
          const {device_id, os_type, token, version, uid} = getLogin();
          let str = `${url}?token=${encodeURIComponent(token)}&uid=${encodeURIComponent(uid)}&os_type=${encodeURIComponent(os_type || 1)}&device_id=${encodeURIComponent(device_id)}&version=${encodeURIComponent(version)}`;
          window.open(str);
        } else {
          window.open(url);
        }
      }
    },
  };
</script>

<style lang="scss">
  .main-banner__pagination {
    position: absolute;
    bottom: 10px;
    z-index: 11;
    left: 50%;
    transform: translateX(-50%);
    .swiper-pagination-bullet {
      width: 6px;
      height: 6px;
      transition: opacity 0.2s;
      background-color: #ebedf0;
      margin-right: 6px;

    }
  }
</style>

<style lang="scss" scoped>
  @include b(main-banner) {
    margin-bottom: 15px;
    position: relative;
    height: 177px;
    overflow: hidden;
    @include e(swiper) {
      height: 177px;
      width: 100%;
    }
    @include e(pagination) {
    }
    @include e(inner) {
      height: 100%;
      width: 100%;
    }
  }
</style>
