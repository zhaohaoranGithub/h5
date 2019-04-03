<template>
    <course-container>
        <step>
            <div class="step-main-cell" :class="[{'active':stepIndex>=0}]">1.打开提现界面</div>
            <div class="step-main-cell" :class="[{'active':stepIndex>=1}]">
                <span class="step-main-cell__line"></span>2.选择提现银行卡</div>
            <div class="step-main-cell" :class="[{'active':stepIndex>=2}]">
                <span class="step-main-cell__line"></span>3.等待审核</div>
        </step>
        <mobile-swiper :img-list='imgList' ref='swiper'></mobile-swiper>
        <div class="course-container__article">
            <main-container-content>
                <div class="main-container-content__text">
                    1. 第一次提现时，请先绑定银行卡，绑定提款的步骤：
                    <span class="red">
                        登录贝博 — 个人资料 — 绑定银行卡
                    </span>
                </div>
                <div class="main-container-content__text">
                    2.绑定完成后在提款处申请提款
                </div>
            </main-container-content>

        </div>
    </course-container>
</template>

<script>
const imgList = [
  require("./withdraw_1.png"),
  require("./withdraw_2.png"),
  require("./withdraw_3.png")
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
