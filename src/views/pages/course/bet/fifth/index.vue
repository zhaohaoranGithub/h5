<template>
    <div>
        <course-header>
            <div class="course-header__title">
                五.投注记录
            </div>
            <step>
                <div class="step-main-cell" :class="[{'active':stepIndex>=0}]">1.点我的投注按钮</div>
                <div class="step-main-cell" :class="[{'active':stepIndex>=1}]"><span class="step-main-cell__line"></span>2.查看投注单状态</div>
                <div class="step-main-cell" :class="[{'active':stepIndex>=2}]"><span class="step-main-cell__line"></span>3.更多查看</div>
            </step>
        </course-header>
        <course-container>
            <mobile-recharge-swiper :img-list='imgList' :swiperPaginationClassName="'swiper-pagination-alipay-5'"></mobile-recharge-swiper>
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
