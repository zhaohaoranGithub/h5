<template>
  <div class="reg-after2-container invit-1-container">
    <div class="top">
      <img :src="require('../images/invit1-title.png')" alt="" class="animations animations-1"
           :class="{jackInTheBox:activeFlag}">
    </div>
    <div class="text">
      <p class="move-left  animations animations-2" :class="{lightSpeedIn:activeFlag}">我们提供科技十足的前沿产品</p>
      <p class="move-left  animations animations-3" :class="{lightSpeedIn:activeFlag}">周到细致的客户服务品质</p>
      <p class="move-left  animations animations-4" :class="{lightSpeedIn:activeFlag}">完善的技术保障及支持</p>
      <img class="scale-img  animations animations-5" :class="{imgScale:activeFlag}"
           :src="require('../images/zhang.png')" alt="">
    </div>
    <div class="content">
      <ul>
        <li class="fl move-left  ">
          <div class="icon animations animations-6" :class="{slideInDown:activeFlag}">
            <img :src="require('../images/heart.png')" alt="">
          </div>
          <div class="desc">
            <img :src="require('../images/invit1-txt-1.png')" class="animations animations-7"
                 :class="{slideInDown:activeFlag}" alt="">
            <i class="confirm animations animations-8" :class="{imgScale:activeFlag}"></i>
          </div>
          <i class="pre animations animations-10 animate-infinity dots animation-duration-7 "
             :class="{flash:activeFlag}"></i>
          <i class="animations animations-11 animate-infinity animation-duration-7 dots"
             :class="{flash:activeFlag}"></i>
        </li>
        <li class="fr move-left ">
          <div class="icon animations animations-9" :class="{slideInDown:activeFlag}">
            <img :src="require('../images/money.png')" alt=""></div>
          <div class="desc spe">
            <img :src="require('../images/invit1-txt-2.png')" class="animations animations-10"
                 :class="{slideInDown:activeFlag}" alt="">
            <i class="confirm  animations animations-11" :class="{imgScale:activeFlag}"></i>
          </div>
          <i class="pre animations animations-10 animate-infinity dots animation-duration-6 "
             :class="{flash:activeFlag}"></i>
          <i class="animations animations-10 animate-infinity animation-duration-6 dots"
             :class="{flash:activeFlag}"></i>
        </li>
        <li class="fl move-left  ">
          <div class="icon animations animations-12" :class="{slideInDown:activeFlag}">
            <img :src="require('../images/charts.png')" alt="">
          </div>
          <div class="desc">
            <img :src="require('../images/invit1-txt-3.png')" alt="" :class="{slideInDown:activeFlag}"
                 class="animations animations-13">
            <i class="confirm  animations animations-14" :class="{imgScale:activeFlag}"></i>
          </div>
          <i class="pre animations animations-13 animate-infinity dots animation-duration-6 "
             :class="{flash:activeFlag}"></i>
          <i class="animations animations-13 animate-infinity animation-duration-6 dots"
             :class="{flash:activeFlag}"></i>
        </li>
        <li class="fr move-left">
          <div class="icon  animations animations-15" :class="{slideInDown:activeFlag}">
            <img :src="require('../images/app.png')" alt="">
          </div>
          <div class="desc">
            <img :src="require('../images/invit1-txt-4.png')" alt="" class="animations animations-16"
                 :class="{slideInDown:activeFlag}">
            <i class="confirm  animations animations-17" :class="{imgScale:activeFlag}"></i>
          </div>
          <i class="pre animations animations-16 animate-infinity dots animation-duration-6 "
             :class="{flash:activeFlag}"></i>
          <i class="animations animations-16 animate-infinity animation-duration-6 dots"
             :class="{flash:activeFlag}"></i>
        </li>
      </ul>
      <div class="btns">
        <el-button @click="downloadApp" class="animations animations-18 btn" :class="{lightSpeedIn:activeFlag}">
          下载APP
        </el-button>
        <p @click="installGuide" class="animations animations-19" :class="{lightSpeedIn:activeFlag}">{{deviceType}}安装指南</p>
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
      }
    },
    data() {
      return {
        activeFlag: false,
      }
    },

    watch: {
      index(newVal) {
        if (newVal == 1) {
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
    background: url("../images/bg.png") no-repeat center center;
    background-size: 100% 100%;

    .top {
      width: 100%;
      height: auto;
      padding-top: .4rem;

      img {
        display: block;
        width: 3.19rem;
        margin: 0.37rem auto 0;
      }
    }

    .text {
      float: left;
      padding-top: .2rem;
      padding-right: 0.9rem;
      position: relative;

      img {
        display: block;
        width: 1.28rem;
        height: 1.09rem;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 1;
      }

      p {
        font-size: .14rem;
        line-height: .24rem;
        text-indent: .5rem;
        position: relative;
        z-index: 2;
        margin: 0;
      }
    }

    .content {
      width: 2.62rem;
      height: auto;
      margin: 1.3rem auto 0;

      li {
        height: .77rem;
        margin-bottom: .18rem;
        position: relative;

        i.dots {
          display: block;
          width: .04rem;
          height: .04rem;
          position: absolute;
          border-radius: 50%;
          left: .6rem;
          transform: translateX(-.02rem);
          top: .87rem;

        }

        i.pre.dots {
          top: .8rem;
        }

        .icon {
          width: 1.18rem;
          height: .77rem;
          border-radius: 9px;
          background-color: #2c58df;
          position: absolute;
          top: 0;
          left: 0;

          img {
            display: block;
            height: .77rem;
            margin: 0 auto;
          }


        }

        &:first-child {

          i.dots {
            background-color: #2c58df;
          }

        }

        &:nth-child(2) {

          i.dots {
            background-color: #7a9afb;
          }

        }

        &:nth-child(3) {

          i.dots {
            background-color: #ced9fc;
          }

        }

        &:nth-child(4) {

          i.dots {
            background-color: #ced9fc;
          }

        }

        &:last-child {
          .icon {
            &:before, &:after {
              display: none;
            }
          }
        }

        .desc {
          width: 1.45rem;
          height: .77rem;
          position: absolute;
          top: 0;
          right: -.37rem;

          i {
            display: block;
            width: .86rem;
            height: .61rem;
            background: url("../images/confirm.png") no-repeat center center;
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;
            z-index: 10;
            position: absolute;
            top: .27rem;
            right: 0;
          }

          img {
            width: 1.26rem;
            margin-top: .3rem;
          }
        }

        .desc.spe {
          img {
            margin-left: .25rem !important;
          }
        }
      }
    }

  }


  .reg-after2-container {
    .content {
      ul {
        height: 2.85rem;

        li {
          width: 1.18rem;
          height: 1.65rem;
          margin-bottom: 0;

          .icon {
            position: initial;
          }

          .desc {
            position: initial;
            margin-left: 0;

            i {
              top: .5rem;
              right: -.35rem;
            }

            img {
              margin-top: .25rem;
            }
          }

          .desc.spe {
            img {
              margin-left: 0.6rem;

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
        color: #1e5adc;
        text-decoration: underline;
        line-height: .15rem;
        margin-top: .15rem;
      }
    }
  }
</style>