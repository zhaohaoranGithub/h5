<template>
  <div class="invit-3-container" :class="{'not-download':!btns}">
    <div class="top">
      <img :src="require('../intro-img/invit3-title.png')" class="title animations animations-1" alt=""
           :class="{jackInTheBox:activeFlag}">
    </div>
    <div class="text">
      <p class="animations animations-2" :class="{myLightSpeedIn:activeFlag}">结合 总输赢返佣模式/</p>
      <p class="animations animations-3" :class="{myLightSpeedIn:activeFlag}">信誉模式/多层佣金计算模式</p>
      <p class="animations animations-4" :class="{myLightSpeedIn:activeFlag}">共享事业，共同成功！</p>
    </div>
    <!--<div class="middle">-->
    <!--<img :src="require('../intro-img/invit3-title-s.png')" class="title animations animations-4"-->
    <!--:class="{slideInDown:activeFlag}" alt="">-->
    <!--</div>-->
    <div class="charts">
      <div class="outter animations animations-5" :class="{widthRight:activeFlag}">
        <img :src="require('../intro-img/line-trend.png')" alt="" :style="{width:WH}">
      </div>
      <img :src="require('../intro-img/tower.png')" alt="" class="tower animations animations-6"
           :class="{slideInDownCenter:activeFlag}">
      <img class="money m2 animations animations-10 animations-time-1_2 big" :class="{myZoomInDown:activeFlag}"
           :src="require('../intro-img/big8.png')"/>
      <p class="proxy p1  animations animations-11" :class="{myZoomInRight: activeFlag}">
        <img :src="require('../intro-img/pointer.png')"/>
        <span>一级代理</span>
      </p>
      <img class="money m2 animations animations-11 animations-time-1_2 mid" :class="{myZoomInDown:activeFlag}"
           :src="require('../intro-img/mid-8.png')"/>
      <p class="proxy p2 animations animations-13" :class="{myZoomInLeft: activeFlag}">
        <span>二级代理</span>
        <img :src="require('../intro-img/pointer.png')"/>
      </p>
      <img class="money m2 animations animations-12 animations-time-1_2 small" :class="{myZoomInDown:activeFlag}"
           :src="require('../intro-img/small-8.png')"/>
      <p class="proxy p3 animations animations-15" :class="{myZoomInRight: activeFlag}">
        <img :src="require('../intro-img/pointer.png')"/>
        <span>三级代理</span>
      </p>
      <img :src="require('../intro-img/ware.png')" alt="" class="ware animations animations-15"
           :class="{fadeIn: activeFlag}">
    </div>
    <div class="btns" v-if="btns">
      <el-button @click="downloadApp" class="animations animations-15 btn" :class="{myLightSpeedIn:activeFlag}">
        下载代理APP
      </el-button>
      <br>
      <el-button @click="installGuide" class="animations animations-16 install-guide"
                 :class="{myLightSpeedIn:activeFlag}"
                 type="text">{{deviceType}}安装指南
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
    props: {
      index: {
        type: Number
      },
      activeIndex: {
        type: Number
      },
      downloadFlag: {
        type: Boolean,
        default: false
      },
      btns: {
        type: Boolean,
        default: true
      }
    },
    created() {
      if (this.activeIndex == 0) this.activeFlag = true
    },
    computed: {
      WH() {
        return window.innerWidth + 'px'
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
  .invit-3-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: url("../intro-img/bg.png") no-repeat center center;
    background-size: 100% 100%;

    .top {
      width: 100%;
      height: auto;
      overflow: hidden;
      padding-top: 40px;

      img {
        display: block;
        width: 290px;
        margin: 30px auto;
      }
    }

    .text {
      margin-bottom: 20px;

      p {
        text-align: center;
        font-size: 14px;
        line-height: 25px;
        margin: 0;
      }
    }

    .charts {
      margin-top: 30px;
      position: relative;
      height: 325px;

      .outter {
        width: 100%;
        overflow: hidden;
      }

      .money {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        z-index: 10;
      }

      .money.big {
        width: 185px;
        top: 90px;
      }

      .money.mid {
        width: 112px;
        top: 190px;
      }

      .money.small {
        width: 49px;
        top: 245px;
      }

      .m1 {
        top: 90px;

      }

      .m2 {
        top: 180px;
        font-size: 28px;
        color: #fff;
      }

      .m3 {
        top: 240px;
        font-size: 24px;
        color: #fff;
      }

      .tower {
        width: 260px;
        position: absolute;
        top: 117px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 9;
      }

      .proxy {
        position: absolute;
        line-height: 12px;
        margin: 0;

        img {
          width: 30px;
        }

        span {
          font-size: 12px;
          color: #999999;
        }
      }

      .p1 {
        top: 145px;
        right: 5px;
      }

      .p3 {
        top: 265px;
        right: 70px;
      }

      .p2 {
        top: 200px;
        left: 20px;

        img {
          transform: rotateY(180deg);
          margin-left: 15px;
        }
      }

      .ware {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
      }
    }

    .btns {
      text-align: center;
      display: block;
      margin-top: 5px;

      .btn {
        width: 248px;
        height: 38px;
        background: linear-gradient(to right, #1336ce, #0e5eff);
        color: #ffffff;
        border-radius: 18px;
        font-size: 15px;
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


  .invit-3-container.not-download {


    .text {
      margin-top: 35px;
    }

    .charts {
      margin-top: 29px;
    }


  }

  @media (max-width: 375px) {
    .invit-3-container.not-download {

      .text {
        margin-top: 0;
      }

      .top {
        img {
          margin: 15px auto;
        }
      }

      .charts {
        margin-top: 15px;
      }
    }
  }
</style>