<template>
    <div>
        <course-header>
            
            <div class="course-header__title">
                四.串关投注
            </div>
            <step>
                <div class="step-main-cell" :class="[{'active':stepIndex>=0}]">1.进入投注单</div>
                <div class="step-main-cell" :class="[{'active':stepIndex>=1}]"><span class="step-main-cell__line"></span>2.添加其他投注选项</div>
                <div class="step-main-cell" :class="[{'active':stepIndex>=2}]"><span class="step-main-cell__line"></span>3.选择串关玩法</div>
            </step>
        </course-header>
        <course-container>
            <mobile-recharge-swiper :img-list='imgList' :swiperPaginationClassName="'swiper-pagination-alipay-4'"></mobile-recharge-swiper>
        </course-container>
    </div>
</template>


<script>
const imgList = [
  require("./step1.png"),
  require("./step2.png"),
  require("./step3.png")
];
export default {
  data() {
    return {
      imgList,
      stepIndex: 0
    };
  }
};
</script>


<style lang="scss">
</style>
