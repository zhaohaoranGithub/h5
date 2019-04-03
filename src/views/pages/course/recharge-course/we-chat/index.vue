<template>
  <div class="recharge">
    <course-header>
      <div class="course-header__title">三.微信转账</div>
      <step>
        <div class="step-main-cell" :class="[{'active':stepIndex>=0}]">1.选择存款金额</div>
        <div class="step-main-cell" :class="[{'active':stepIndex>=1}]">
          <span class="step-main-cell__line"></span>2.确认充值金额</div>
        <div class="step-main-cell" :class="[{'active':stepIndex>=2}]">
          <span class="step-main-cell__line"></span>3.充值确认</div>
      </step>
  </course-header>

    <course-container>
      <mobile-recharge-swiper :img-list='imgList' :swiperPaginationClassName="'swiper-pagination-we-chat'"></mobile-recharge-swiper>
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
  },
};
</script>


