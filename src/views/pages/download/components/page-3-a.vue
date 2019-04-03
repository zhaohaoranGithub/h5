<template>
  <div class="invit-2-container" :class="{'not-download':!btns}">
    <div class="top">
      <img :src="require('../intro-img/invit2-title.png')" class="title move-down  animations animations-1"
           :class="{jackInTheBox:activeFlag}" alt="">
    </div>
    <div class="text">
      <p class="tx-center  move-left  animations animations-2" :class="{myLightSpeedIn:activeFlag}">全球顶尖研发团队</p>
      <p class="tx-center  move-left  animations animations-3" :class="{myLightSpeedIn:activeFlag}">大数据智能风控系统</p>
      <p class="tx-center  move-left  animations animations-4" :class="{myLightSpeedIn:activeFlag}">系统化分析架构</p>
      <p class="tx-center  move-left  animations animations-5" :class="{myLightSpeedIn:activeFlag}">3A3R模型运营分析体系</p>
    </div>
    <div class="phones">
      <img :src="require('../intro-img/phone-1.png')" alt="" class="animations animations-6"
           :class="{'mySlideInLeft-a':activeFlag}">
      <img :src="require('../intro-img/phone-2.png')" alt="" class="animations animations-7"
           :class="{'mySlideInRight-a':activeFlag}">
      <img :src="require('../intro-img/phone-3.png')" alt="" class="animations animations-8"
           :class="{slideInDownCenter:activeFlag}">
      <img :src="require('../intro-img/phone-4.png')" alt="" class="animations animations-9"
           :class="{'myLightSpeedInLeft-a':activeFlag}">
      <img :src="require('../intro-img/phone-5.png')" alt="" class="animations animations-10"
           :class="{myLightSpeedIn:activeFlag}">
    </div>
    <div class="btns" v-if="btns">
      <el-button @click="downloadApp" class="animations animations-11 btn" :class="{myLightSpeedIn:activeFlag}">
        下载APP
      </el-button>
      <br>
      <el-button @click="installGuide" class="animations animations-12 install-guide"
                 :class="{myLightSpeedIn:activeFlag}"
                 type="text">
        {{deviceType}}安装指南
      </el-button>
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
    created() {
      if (this.activeIndex == 0) this.activeFlag = true
    },
    props: {
      index: {
        type: Number
      },
      activeIndex: {
        type: Number
      },
      btns: {
        type: Boolean,
        default: true
      }
    },
    watch: {
      index(newVal) {
        if (newVal == this.activeIndex) {
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
    background: url("../intro-img/bg.png") no-repeat center center;
    background-size: 100% 100%;

    .top {
      width: 100%;
      height: auto;
      padding-top: 40px;

      img {
        display: block;
        width: 269px;
        margin: 33px auto 28px;
      }
    }

    .text {
      p {
        text-align: center;
        font-size: 14px;
        line-height: 24px;
        margin: 0;
      }
    }

    .phones {
      position: relative;
      margin-top: 25px;
      height: 372px;

      img {
        position: absolute;

        &:first-child {
          width: 160px;
          left: 31px;
          top: 20px;
          z-index: 1;
        }

        &:nth-child(2) {
          width: 160px;
          right: 34px;
          top: 20px;
          z-index: 2;
        }

        &:nth-child(3) {
          width: 175px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 3;
        }

        &:nth-child(4) {
          width: 200px;
          left: 0;
          bottom: 80px;
          z-index: 4;
        }

        &:nth-child(5) {
          width: 148px;
          right: -15px;
          bottom: 80px;
          z-index: 5;
        }
      }
    }

    .btns {
      display: none;
    }
  }

  .invit-2-container.not-download {
    .top {
      padding-top: 40px;

      img {
        margin-bottom: 32px;
      }
    }

    .phones {
      margin-top: 0;

      img {
        margin-top: 10px;
      }
    }

    .btns {
      text-align: center;
      display: block;

      .btn {
        width: 248px;
        height: 38px;
        background: linear-gradient(to right, #1336ce, #0e5eff);
        color: #ffffff;
        border-radius: 18px;
        font-size: 15px;
        box-shadow: 0 8px 18px 0 rgba(30, 90, 220, .32);
        border: none;
        outline: none;
      }

      .install-guide {
        font-size: 15px;
        color: #000000;
        text-shadow: 4px 3px 3px rgba(0, 0, 0, .34);
        height: 15px;
        line-height: 15px;
        padding: 0;
        text-decoration: underline;
        margin-top: 12px;
      }
    }
  }

  @media (max-width: 375px) {
    .invit-2-container.not-download {
      .top {
        img {
          margin: 15px auto;
        }
      }

      .phones {
        margin-top: -15px;
      }
    }
  }

  //iphoneX、iphoneXs

  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    .invit-2-container.not-download {
      .top {
        img {
          margin: 33px auto 28px;
        }
      }

      .phones {
        margin-top: 25px;
      }
    }
  }

  //iphone Xs Max
  @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
    .invit-2-container.not-download {
      .top {
        img {
          margin: 33px auto 28px;
        }
      }

      .phones {
        margin-top: 25px;
      }
    }
  }
</style>