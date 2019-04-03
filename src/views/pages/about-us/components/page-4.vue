<template>
  <div class="invit-3-container" :class="{share:downloadFlag}">
    <div class="top">
      <img :src="require('../images/invit3-title.png')" class="title animations animations-1" alt=""
           :class="{jackInTheBox:activeFlag}">
    </div>
    <div class="text">
      <p class="animations animations-2" :class="{lightSpeedIn:activeFlag}">我们提供不同的佣金形式选择</p>
      <p class="animations animations-3" :class="{lightSpeedIn:activeFlag}">以最大的资金支持代理推广获利</p>
    </div>
    <div class="middle">
      <img :src="require('../images/invit3-title-s.png')" class="title animations animations-4"
           :class="{slideInDown:activeFlag}" alt="">
    </div>
    <div class="charts">
      <div class="outter animations animations-5" :class="{widthRight:activeFlag}">
        <img :src="require('../images/line-trend.png')" alt="" :style="{width:WH}">
      </div>
      <img :src="require('../images/tower.png')" alt="" class="tower animations animations-6"
           :class="{slideInDownCenter:activeFlag}">
      <span class="money m1 animations animations-10" :class="{zoomInDown:activeFlag}">¥8888888</span>
      <p class="proxy p1  animations animations-11" :class="{zoomInRight: activeFlag}">
        <img :src="require('../images/pointer.png')"/>
        <span>一级代理</span>
      </p>
      <span class="money m2 animations animations-12" :class="{zoomInDown:activeFlag}">¥88888</span>
      <p class="proxy p2 animations animations-13" :class="{zoomInLeft: activeFlag}">
        <span>二级代理</span>
        <img :src="require('../images/pointer.png')"/>
      </p>
      <span class="money m3 animations animations-14" :class="{zoomInDown:activeFlag}">¥888</span>
      <p class="proxy p3 animations animations-15" :class="{zoomInRight: activeFlag}">
        <img :src="require('../images/pointer.png')"/>
        <span>三级代理</span>
      </p>
      <img :src="require('../images/ware.png')" alt="" class="ware animations animations-15"
           :class="{fadeIn: activeFlag}">
    </div>
    <div class="btns">
      <button @click="downloadApp" class="animations animations-16 btn" :class="{lightSpeedIn:activeFlag}">
        下载APP
      </button>
      <p @click="installGuide" class="animations animations-17" :class="{lightSpeedIn:activeFlag}">{{deviceType}}安装指南</p>
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
    computed: {
      WH() {
        return window.innerWidth + 'px'
      }
    },
    watch: {
      index(newVal) {
        if (newVal == 3) {
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
    background: url("../images/bg.png") no-repeat center center;
    background-size: 100% 100%;

    .top {
      width: 100%;
      height: auto;
      overflow: hidden;
      padding-top: .4rem;

      img {
        display: block;
        width: 2.9rem;
        margin: 0.3rem auto;
      }
    }

    .text {
      margin-bottom: .2rem;

      p {
        text-align: center;
        font-size: 0.14rem;
        line-height: .24rem;
        margin: 0;
      }
    }

    .middle {
      img {
        display: block;
        margin: 0 auto;
        width: 2.3rem;
      }
    }

    .charts {
      margin-top: .3rem;
      position: relative;
      height: 3.25rem;

      .outter {
        width: 100%;
        overflow: hidden;
      }

      .money {
        font-size: .35rem;
        color: #a31f65;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        z-index: 10;
      }

      .m1 {
        top: .9rem;

      }

      .m2 {
        top: 1.8rem;
        font-size: .28rem;
        color: #fff;
      }

      .m3 {
        top: 2.4rem;
        font-size: .24rem;
        color: #fff;
      }

      .tower {
        width: 2.6rem;
        position: absolute;
        top: 1.2rem;
        left: 50%;
        transform: translateX(-50%);
        z-index: 9;
      }

      .proxy {
        position: absolute;
        line-height: .12rem;
        margin: 0;

        img {
          width: .3rem;
        }

        span {
          font-size: .12rem;
          color: #999999;
        }
      }

      .p1 {
        top: 1.45rem;
        right: .05rem;
      }

      .p3 {
        top: 2.65rem;
        right: .7rem;
      }

      .p2 {
        top: 2rem;
        left: .2rem;

        img {
          transform: rotateY(180deg);
          margin-left: .15rem;
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
      display: none;
    }
  }


  .invit-3-container.share {
    .charts {
      margin-top: .2rem;
    }

    .btns {
      display: block;
      text-align: center;
      margin-top: .1rem;

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