<template>
  <div class="invit-2-container" :class="{share:downloadFlag}">
    <div class="top">
      <img :src="require('../images/invit2-title.png')" class="title move-down  animations animations-1"
           :class="{jackInTheBox:activeFlag}" alt="">
    </div>
    <div class="text">
      <p class="tx-center  move-left  animations animations-2" :class="{lightSpeedIn:activeFlag}">我们抛弃笼统的代理数据分析模型</p>
      <p class="tx-center  move-left  animations animations-3" :class="{lightSpeedIn:activeFlag}">
        针对会员的行为动作/留存/转化/来源等方面</p>

      <p class="tx-center  move-left  animations animations-4" :class="{lightSpeedIn:activeFlag}">系统性进行数据统计分析</p>
    </div>
    <div class="phones">
      <img :src="require('../images/phone-1.png')" alt="" class="animations animations-5"
           :class="{slideInLeft:activeFlag}">
      <img :src="require('../images/phone-2.png')" alt="" class="animations animations-6"
           :class="{slideInRight:activeFlag}">
      <img :src="require('../images/phone-3.png')" alt="" class="animations animations-7"
           :class="{slideInDownCenter:activeFlag}">
      <img :src="require('../images/phone-4.png')" alt="" class="animations animations-8"
           :class="{lightSpeedInLeft:activeFlag}">
      <img :src="require('../images/phone-5.png')" alt="" class="animations animations-9"
           :class="{lightSpeedIn:activeFlag}">
    </div>
    <div class="btns">
      <el-button @click="downloadApp" class="animations animations-6 btn" :class="{lightSpeedIn:activeFlag}">
        下载APP
      </el-button>
      <p @click="iosGuide" class="tx-center move-down  animations animations-7" :class="{lightSpeedIn:activeFlag}">
        IOS安装指南</p>
    </div>
  </div>
</template>

<script>
  import {download} from '@/mixins/index'

  export default {
    name: "page-3",
    mixins: [download],
    data() {
      return {
        activeFlag: false
      }
    },
    props: {
      index: {
        type: Number
      },
      downloadFlag: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      index(newVal) {
        if (newVal == 2) {
          this.activeFlag = true
        } else {
          this.activeFlag = false
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .invit-2-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: url("../images/bg.png") no-repeat center center;
    background-size: 100% 100%;

    .top {
      width: 100%;
      height: auto;
      overflow: hidden;
      padding-top: .4rem;

      img {
        display: block;
        width: 2.69rem;
        margin: .33rem auto .28rem;
      }
    }

    .text {
      p {
        text-align: center;
        font-size: .14rem;
        line-height: .24rem;
        margin: 0;
      }
    }

    .phones {
      position: relative;
      margin-top: .25rem;
      height: 3.72rem;

      img {
        position: absolute;

        &:first-child {
          width: 1.61rem;
          left: .45rem;
          top: .3rem;
          z-index: 1;
        }

        &:nth-child(2) {
          width: 1.61rem;
          right: .45rem;
          top: .3rem;
          z-index: 2;
        }

        &:nth-child(3) {
          width: 1.9rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 3;
        }

        &:nth-child(4) {
          left: 50%;
          transform: translateX(-100%);
          bottom: .8rem;
          z-index: 4;
        }

        &:nth-child(5) {
          width: 1rem;
          right: 0;
          bottom: 0;
          z-index: 5;
        }
      }
    }

    .btns {
      display: none;
    }
  }

  .invit-2-container.share {
    .top {
      padding-top: .4rem;

      img {
        margin-bottom: .16rem;
      }
    }

    .phones {
      margin-top: 0;

      img {
        margin-top: .1rem;
      }
    }

    .btns {
      display: block;
      text-align: center;
      margin-top: 0;

      .btn {
        width: 2.48rem;
        height: .39rem;
        background-color: #1e5adc;
        color: #ffffff;
        border-radius: 4px;
        font-size: .15rem;
        box-shadow: 0 8px 18px 0 rgba(30, 90, 220, .32);
        border: none;
        outline: none;
      }

      p {
        width: 100%;
        font-size: .15rem;
        line-height: .15rem;;
        color: #1e5adc;
        text-decoration: underline;
        margin-top: .15rem;
      }
    }
  }
</style>