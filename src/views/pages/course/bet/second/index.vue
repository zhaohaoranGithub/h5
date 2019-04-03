<template>
    <div>
        <course-header>
            
            <div class="course-header__title">
                二. 投注准备
            </div>
            <step>
                <ul class="step-main-ul">
                    <li class="step-main-ul__item" :class="[{'is-active':stepIndex>=0}]">主流盘口</li>
                    <li class="step-main-ul__item" :class="[{'is-active':stepIndex>=1}]">排序方式</li>
                    <li class="step-main-ul__item" :class="[{'is-active':stepIndex>=2}]">过滤条件</li>
                </ul>
            </step>
        </course-header>
        <course-container>
            <mobile-recharge-swiper :img-list='imgList' :swiperPaginationClassName="'swiper-pagination-alipay-2'"></mobile-recharge-swiper>
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
