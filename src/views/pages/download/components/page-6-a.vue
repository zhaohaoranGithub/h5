<template>
  <div class="reg-after2-container invit-1-container" :class="{'not-download':!btns}">
    <div class="top">
      <img :src="require('../intro-img/invit1-title.png')" alt="" class="animations animations-1"
           :class="{jackInTheBox:activeFlag}">
    </div>
    <div class="text">
      <p class="animations animations-2" :class="{myLightSpeedIn:activeFlag}">原生APP，拥有PC全部功能</p>
      <p class="animations animations-3" :class="{myLightSpeedIn:activeFlag}">快速出款</p>
      <p class="animations animations-4" :class="{myLightSpeedIn:activeFlag}">7X24小时专属服务</p>
      <!--<img class="scale-img  animations animations-5" :class="{imgScale:activeFlag}"-->
      <!--:src="require('../intro-img/zhang.png')" alt="">-->
    </div>
    <div class="content">
      <ul>
        <li class="fl icon animations animations-5" :class="{myPulse:activeFlag}">
          <img :src="require('../intro-img/pic-1.png')" alt="">
        </li>
        <li class="fr icon animations animations-6" :class="{myPulse:activeFlag}">
          <img :src="require('../intro-img/pic-2.png')" alt="">
        </li>
        <li class="fl icon animations animations-7" :class="{myPulse:activeFlag}">
          <img :src="require('../intro-img/pic-3.png')" alt="">
        </li>
        <li class="fr icon animations animations-8" :class="{myPulse:activeFlag}">
          <img :src="require('../intro-img/pic-4.png')" alt="">
        </li>
      </ul>
      <div class="btns" v-if="btns">
        <button @click="downloadApp" class="animations animations-9 btn" :class="{myLightSpeedIn:activeFlag}">
          下载APP
        </button>
        <button @click="installGuide" class="animations animations-10 install-guide"
                :class="{myLightSpeedIn:activeFlag}" type="text">{{deviceType}}安装指南
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import {download} from '@/mixins/index'

  export default {
    name: "page-5",
    mixins: [download],
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
    data() {
      return {
        activeFlag: false,
      }
    },
    created() {
      if (this.activeIndex == 0) this.activeFlag = true
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
  .invit-1-container {
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
        width: 319px;
        margin: 37px auto 0;
      }
    }

    .text {
      text-align: center;
      padding: 20px 0;
      position: relative;

      p {
        font-size: 14px;
        line-height: 24px;
        position: relative;
        z-index: 2;
        margin: 0;
        color: #333333;
      }
    }

    .content {
      width: 262px;
      height: auto;
      margin: 0 auto;

      ul {
        list-style: none;
        padding: 0;

        li {
          height: 77px;
          margin-bottom: 18px;
          position: relative;

          img {
            width: 100%;
          }
        }
      }
    }

  }


  .reg-after2-container {
    .content {
      ul {
        height: 285px;

        li {
          width: 118px;
          height: 165px;
          margin-bottom: 0;

          .icon {
            position: initial;
          }

          .desc {
            position: initial;
            margin-left: 0;

            i {
              top: 50px;
              right: -35px;
            }

            img {
              margin-top: 25px;
            }
          }

          .desc.spe {
            img {
              margin-left: 60px;

            }
          }
        }

        li.fl {
          float: left;
        }

        li.fr {
          float: right;
        }
      }
    }

    .btns {
      text-align: center;

      .btn {
        width: 248px;
        height: 36px;
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

  .not-download {
    .text {
      padding: 50px 0 27px;
    }

    ul {
      li {
        height: 165px;
      }
    }
  }

  @media (max-width: 375px) {
    .reg-after2-container.not-download {
      .top {
        img {
          margin: 15px auto;
        }
      }

      .text {
        padding: 10px 0;
      }
    }
  }

  //iphoneX、iphoneXs

  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    .reg-after2-container.not-download {
      .top {
        img {
          margin: 37px auto 0;
        }
      }

      .text {
        padding: 50px 0 27px;
      }
    }
  }

  //iphone Xs Max
  @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
    .reg-after2-container.not-download {
      .top {
        img {
          margin: 37px auto 0;
        }
      }

      .text {
        padding: 50px 0 27px;
      }
    }
  }
</style>
