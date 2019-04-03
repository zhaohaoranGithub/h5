<template>
    <div>
        <course-header>
            <div class="course-header__biref">
                投注前，请先确保您已成功登陆账号。
            </div>
            <div class="course-header__title">
                一. 比赛入口
            </div>
            <step>
                <ul class="step-main-ul">
                    <li class="step-main-ul__item" :class="[{'is-active':stepIndex>=0}]">滚球</li>
                    <li class="step-main-ul__item" :class="[{'is-active':stepIndex>=1}]">即将开始/今日/早盘</li>
                    <li class="step-main-ul__item" :class="[{'is-active':stepIndex>=2}]">赛事</li>
                </ul>
                
            </step>
        </course-header>
        <course-container>
            <mobile-recharge-swiper :img-list='imgList' :swiperPaginationClassName="'swiper-pagination-alipay-1'"></mobile-recharge-swiper>
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


<style lang="scss">
</style>
