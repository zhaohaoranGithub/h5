<template>
    <div>
        <course-header>

            <div class="course-header__title">
                三. 单场投注
            </div>
            <step>
                <div class="step-main-cell" :class="[{'active':stepIndex>=0}]">1.选择盘口</div>
                <div class="step-main-cell" :class="[{'active':stepIndex>=1}]"><span class="step-main-cell__line"></span>2.输入金额</div>
                <div class="step-main-cell" :class="[{'active':stepIndex>=2}]"><span class="step-main-cell__line"></span>3.确认投注</div>
                <div class="step-main-cell" :class="[{'active':stepIndex>=3}]"><span class="step-main-cell__line"></span>4.投注完成</div>
            </step>
        </course-header>
        <course-container>
            <mobile-recharge-swiper :img-list='imgList' :swiperPaginationClassName="'swiper-pagination-alipay-3'"></mobile-recharge-swiper>
        </course-container>
    </div>
</template>


<script>
const imgList = [
  require("./step1.png"),
  require("./step2.png"),
  require("./step3.png"),
  require("./step4.png"),
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
