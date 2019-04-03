<template>
  <div class="sponsor-news">
    <sponsor-title>新闻报道</sponsor-title>
    <div class="sponsor-news-main">
      <div class="sponsor-news-main__inner">
        <swiper :options="swiperOption">
          <!-- 幻灯内容 -->
          <swiper-slide v-for='(item,index) in imgList' :key="index">
            <div class="sponsor-news-main-cell">
              <img :src="item.src" alt="" @click="$imageViewer">
              <div class="sponsor-news-main-cell__brief">{{item.title}}</div>
            </div>
          </swiper-slide>
          <!-- 以下控件元素均为可选 -->

        </swiper>
      </div>

      <div class="sponsor-news-main__button sponsor-news-main__button--prev"></div>
      <div class="sponsor-news-main__button sponsor-news-main__button--next"></div>

    </div>
  </div>
</template>


<script>
const imgList = [
  {
    src: require("./pic-1.png"),
    title: "第11轮 巴列卡诺 2-3 巴塞罗那"
  },
  {
    src: require("./pic-2.png"),
    title: "第12轮 塞尔塔 2-4 皇家马德里"
  },
  {
    src: require("./pic-3.png"),
    title: "第13轮 埃瓦尔 3-0 皇家马德里"
  },
  {
    src: require("./pic-4.png"),
    title: "第14轮 赫罗纳 1-1 马德里竞技"
  },
  {
    src: require("./pic-5.png"),
    title: "第15轮 韦斯卡 0-1 皇马"
  },
  {
    src: require("./pic-6.png"),
    title: "第15轮 西班牙人0-4 巴萨罗那"
  }
];
import sponsorTitle from "../components/sponsor-title";
export default {
  data() {
    return {
      imgList,
      swiperOption: {
        slidesPerView: 2,
        spaceBetween: 16,
        loop: true,
        autoplay: {
          delay: 10000,
          disableOnInteraction: false
        },
        navigation: {
          nextEl: ".sponsor-news-main__button--next",
          prevEl: ".sponsor-news-main__button--prev"
        }
      }
    };
  },
  components: { sponsorTitle }
};
</script>

<style lang="scss" scoped>
@include b(sponsor-news) {
  @include b(sponsor-news-main) {
    height: 147px;
    position: relative;
    margin: 13px 22px 11px 22px;
    @include e(inner) {
      @include main-center(250px);
    }
    @include e(button) {
      width: 23px;
      height: 23px;
      position: absolute;
      top: 50%;
      margin-top: -12px;
      z-index: 11;
      outline: none;
      @include m(prev) {
        @include utils-bg(url("left-button.png") no-repeat top, contain);
        left: 0;
      }
      @include m(next) {
        @include utils-bg(url("right-button.png") no-repeat top, contain);
        right: 0;
      }
    }
    @include b(sponsor-news-main-cell) {
      width: 127px;
      img {
        width: 117px;
        height: 117px;
      }
      @include e(brief) {
        font-size: 10px;
        font-family: "Adobe Heiti Std R";
        font-weight: normal;
        color: rgba(11, 42, 75, 1);
      }
    }
  }
}
</style>
