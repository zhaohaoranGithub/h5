<template>
  <div class="download-container" :style="{height:WH}">
    <!--<EHeader></EHeader>-->
    <!-- <side-top :isDownload='show'></side-top> -->
    <div class="top">
      <!--<img src="./images/reg-title.png" class="animations animations-1" :class="{jackInTheBox:activeFlag}" alt="">-->
    </div>
    <img :src="require('./images/top.png')" :class="{jackInTheBox:activeFlag}"
         class="people  animations animations-1" alt="贝博体育">
    <img :src="require('./images/word.png')" :class="{myLightSpeedIn:activeFlag}"
         class="word  animations animations-2" alt="贝博体育">
    <div class="phones">
      <img src="./images/phone-1.png" class="animations animations-2" :class="{_slideInLeft:activeFlag}" alt="">
      <img src="./images/phone-2.png" class="animations animations-2" :class="{_slideInRight:activeFlag}" alt="">
    </div>
    <div class="btns">
      <button type="primary" @click="downloadApp(1)" :loading="cashLoading" class="blue animations animations-3"
              :class="{disable:cashLoading,myFlipInX:activeFlag}">下载贝博娱乐
      </button>
      <button type="primary" @click="downloadApp(2)" :loading="sportLoading" class="blue animations animations-4"
              :class="{disable:sportLoading,myFlipInX:activeFlag}">下载体育APP
      </button>
      <router-link tag="p" :to='{"name":"iosInstallHelp"}' class="animations animations-5"
                   :class="{myFlipInX:activeFlag}" v-if="deviceType=='IOS'">{{deviceType}}安装指南
      </router-link>
    </div>
    <!--<EFooter></EFooter>-->
    <open-brower-tip v-if="showOpenBrowserTip" @close="showOpenBrowserTip = !showOpenBrowserTip"></open-brower-tip>
  </div>
</template>

<script>
  import {download} from '@/mixins/index';
  import EHeader from './components/EHeader';
  import EFooter from './components/EFooter';
  import sideTop from './components/side-top/index';
  import openBrowerTip from '@/components/open-browser-tip';

  export default {
    name: "index",
    components: {EHeader, EFooter, sideTop, openBrowerTip},
    mixins: [download],
    computed: {
      WH: () => window.innerHeight + 'px'
    },
    data() {
      return {
        activeFlag: false,
        showOpenBrowserTip:_.isOpenByBrowser(),
      };
    },
    created() {
      this.activeFlag = true;
      this.$global.bus.$on('openByBrowser',() => {
        this.showOpenBrowserTip = true;
      });
    }
  };
</script>

<style scoped lang="scss">
  .download-container {
    width: 100%;
    height: 100%;
    background: url("images/bg.png") no-repeat center center;
    background-size: 100% 100%;
    overflow: hidden;
  }

  .download-container .top {
    width: 100%;
    height: auto;
  }

  .download-container .top img {
    display: block;
    width: 300px;
    margin: 50px auto 0;
  }

  .people {
    display: block;
    width: 195px;
    margin: 30px auto 0;
  }

  .word {
    display: block;
    width: 310px;
    margin: 20px auto 0;
  }

  .download-container .phones {
    width: 100%;
    height: 255px;
    position: relative;
  }

  .download-container .phones img {
    display: block;
    position: absolute;
    top: 5%;

    &:first-child {
      width: 115px;
      z-index: 40;
      left: 100px;
    }

    &:last-child {
      width: 185px;
      z-index: 20;
      right: 30px;
    }
  }

  .download-container .btns {
    width: 100%;
    height: auto;
    overflow: hidden;
  }

  .download-container .btns p {
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

  .flipInX {
    animation-name: flipInX;
  }

  .jackInTheBox {
    animation-name: jackInTheBox;
  }

  .rotateIn {
    animation-name: rotateIn;
  }

  @media (max-width: 375px) {
    .download-container {
      .phones {
        height: 240px;

        img {
          top: 5%;
        }
      }

      .btns {
        p {
          margin-top: 0;
          line-height: 24px;
        }
      }
    }
  }

  //iphoneX、iphoneXs

  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    .download-container {
      .phones {
        width: 100%;
        height: 295px;
        position: relative;

        img {
          display: block;
          position: absolute;
          top: 30px;

          &:first-child {
            width: 115px;
            z-index: 40;
            left: 100px;
          }

          &:last-child {
            width: 185px;
            z-index: 20;
            right: 30px;
          }
        }
      }

      .btns {
        width: 100%;
        height: auto;
        overflow: hidden;

        p {
          width: 100%;
          font-size: 15px;
          color: #1e5adc;
          text-decoration: underline;
          line-height: 20px;
          text-align: center;
        }
      }
    }
  }

  //iphone Xs Max
  @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
    .download-container {
      .phones {
        width: 100%;
        height: 295px;
        position: relative;

        img {
          display: block;
          position: absolute;
          top: 30px;

          &:first-child {
            width: 115px;
            z-index: 40;
            left: 100px;
          }

          &:last-child {
            width: 185px;
            z-index: 20;
            right: 30px;
          }
        }
      }

      .btns {
        width: 100%;
        height: auto;
        overflow: hidden;

        p {
          width: 100%;
          font-size: 15px;
          color: #1e5adc;
          text-decoration: underline;
          line-height: 20px;
          text-align: center;
        }
      }
    }
  }
</style>
