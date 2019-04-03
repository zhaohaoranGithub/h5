<template>
  <div class="fullpage-container__button">

    <van-button :loading="type==1?cashLoading:sportLoading"
                :class="[{disable:type==1?cashLoading:sportLoading},{black:type===1}]" class="app-download" @click="downloadApp(type)" type="primary">
      <slot></slot>
    </van-button>
    <router-link tag="div" :to='{name:"iosInstallHelp"}' v-if="deviceType === 'IOS'" class="install-help" :class="{black:type===1}">
      IOS安装教程
    </router-link>
    <fullpage-down></fullpage-down>
  </div>
</template>

<script>
import fullpageDown from "./fullpage-down";
import { download } from "@/mixins/index";
export default {
  name: "fullpage-button",
  mixins: [download],
  props: {
    // 下载App类型 1 现金网 2体育App
    type: {
      type: Number,
      default: 1
    }
  },
  components: {
    fullpageDown,
  },
};
</script>


<style lang="scss" scoped>
.fullpage-container__button .btns {
  width: 100%;
  height: auto;
  overflow: hidden;
}

.fullpage-container__button .btns p {
  width: 100%;
  font-size: 15px;
  color: #1e5adc;
  text-decoration: underline;
  line-height: 20px;
  text-align: center;
}

/* 蓝色按钮 */
button.blue {
  display: block;
  width: 244px;
  height: 39px;
  background: linear-gradient(to left, #1336ce, #0e5eff);
  color: #ffffff;
  border-radius: 20px;
  font-size: 15px;
  margin: 0 auto 12px;
  /*box-shadow: 0 5px 35px 0 rgba(30, 90, 220, .7);*/
  border: none;
  outline: none;
}

@include b(fullpage-container) {
  @include e(button) {
    position: absolute;
    bottom: 0px;
    width: 100%;
    z-index: 111;
    display: flex;
    justify-content: center;
    flex-flow: column;
    align-items: center;

    @include b(install-help) {
      font-size: 15px;
      font-family: "MicrosoftYaHeiUI";
      font-weight: 400;
      text-decoration: underline;
      color: rgba(30, 90, 220, 1);
      line-height: 15px;
      -webkit-text-stroke: 1px undefined;
      text-stroke: 1px undefined;
      margin-top: 5px;
      &.black{
        color: #110d0a;
        text-shadow: -1px -1px 0 #fff,
        1px -1px 0 #fff,
        -1px 1px 0 #fff,
        1px 1px 0 #fff;
      }
    }
  }
}

@include b(app-download) {
  @include main-center(244px);
  height: 40px;
  line-height: 15px;
  background: #1336ce;
  box-shadow: 0px 8px 18px 0px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  font-size: 15px;
  font-family: "Microsoft YaHei";
  font-weight: 400;
  color: white;
  text-align: center;
  cursor: pointer;
  &.black{
    border: none;
    border-radius: 20px;
    background: #30281a;
    box-shadow: 0px 8px 18px 0px rgba(0, 0, 0, 0.5);
    border-bottom: 2px solid #72622c;
  }
}
</style>
