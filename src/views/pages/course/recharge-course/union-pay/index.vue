<template>
  <div class="recharge">
     <course-header>
      <div class="course-header__biref">
        存款前，请先确保您已经成功注册贝博会员。
      </div>
      <div class="course-header__title">
        一.银联充值
      </div>
      <step>
        <div class="step-main-cell" :class="[{'active':stepIndex>=0}]">1. 选择存款金额</div>
        <div class="step-main-cell" :class="[{'active':stepIndex>=1}]">
          <span class="step-main-cell__line"></span>2. 选择银联支付 </div>
        <div class="step-main-cell" :class="[{'active':stepIndex>=2}]">
          <span class="step-main-cell__line"></span>3. 选择付款银行 </div>
      </step>
</course-header>

    <course-container>
      <mobile-recharge-swiper :img-list='imgList' :swiperPaginationClassName="'swiper-pagination-union'"></mobile-recharge-swiper>
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

