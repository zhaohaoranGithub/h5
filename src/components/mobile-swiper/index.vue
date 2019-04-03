<template>
    <div class="mobile-warpper">
        <div class="mobile-warpper__inner">
            <swiper :options="swiperOption" ref='mobileSwiper'>
                <swiper-slide v-for='(item,index) in imgList' :key="index">
                    <img :src="item" alt="" width="100%" height="100%">
                </swiper-slide>
            </swiper>
        </div>
        <div class="swiper-pagination mobile-swiper-pagination"></div>
    </div>
</template>

<script>
export default {
  name:'mobile-swiper',
  props:{
    imgList:{
      type:Array,
      default(){return []},
    },
  },
  data() {
    const vm = this;
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
          type: "bullets",
          progressbarOpposite: true, //使进度条分页器与Swiper的direction参数相反
          bulletElement: "li", //设定分页器指示器（小点）的HTML标签。
          dynamicMainBullets: 2, //动态分页器的主指示点的数量
          hideOnClick: true, //默认分页器会一直显示。这个选项设置为true时点击Swiper会隐藏/显示分页器。
          clickable: true //此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换。
        },
        on: {
          slideChangeTransitionEnd() {
          
            vm.$parent.$parent.stepIndex = this.activeIndex;
          }
        }
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.mobileSwiper.swiper;
    }
  }
};
</script>

<style lang="scss">
.swiper-pagination{
  &.mobile-swiper-pagination {
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%);
  margin: 0 auto;
  li.swiper-pagination-bullet {
    width: 8px;
    height: 8px;
    margin-right: 7px;
    &.swiper-pagination-bullet-active {
      background: #1e5adc;
    }
  }
}
}

</style>

<style lang="scss" scoped>

.mobile-warpper {
  position: relative;
  width: 284px;
  height: 571px;
  margin: 0 auto;
  background: url("./mobile-bg.png") no-repeat center center;
  background-size: cover;
  .mobile-warpper__inner {
    position: relative;
    top: 18px;
    width: 240px;
    height: 527px;
    margin: 0 auto;
  }
}
</style>
