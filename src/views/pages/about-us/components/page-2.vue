<template>
  <div class="invit-1-container">
    <div class="top">
      <img :src="require('../images/invit1-title.png')" class="animations animations-1"
           :class="{jackInTheBox:activeFlag}" alt="">
    </div>
    <div class="text">
      <p class=" animations animations-2" :class="{lightSpeedIn:activeFlag}">我们提供科技十足的前沿产品</p>
      <p class=" animations animations-3" :class="{lightSpeedIn:activeFlag}">周到细致的客户服务品质</p>
      <p class=" animations animations-4" :class="{lightSpeedIn:activeFlag}">完善的技术保障及支持</p>
      <img class=" animations animations-5" :src="require('../images/zhang.png')" alt="" :class="{imgScale:activeFlag}">
    </div>
    <div class="content">
      <ul>
        <li>
          <div class="icon i1 animations animations-5" :class="{slideInDown:activeFlag}">
            <img :src="require('../images/heart.png')" alt="" class="">
          </div>
          <i class="pre animations animations-10 animate-infinity dots animation-duration-6 "
             :class="{flash:activeFlag}"></i>
          <i class="animations animations-11 animate-infinity animation-duration-6 dots"
             :class="{flash:activeFlag}"></i>
          <div class="desc">
            <img :src="require('../images/invit1-txt-1.png')" class=" animations animations-5" alt=""
                 :class="{slideInRight:activeFlag}">
            <i class="confirm animations animations-7" :class="{imgScale:activeFlag}"></i>
          </div>
        </li>
        <li>
          <div class="icon   i2 animations animations-8 " :class="{slideInDown:activeFlag}">
            <img :src="require('../images/money.png')" alt="" class="">
          </div>
          <i class="pre animate-infinity animation-duration-6 animations animations-13 dots"
             :class="{flash:activeFlag}"></i>
          <i class="animations animations-14 animate-infinity animation-duration-6 dots"
             :class="{flash:activeFlag}"></i>
          <div class="desc spc">
            <img :src="require('../images/invit1-txt-2.png')" alt="" class="animations animations-8"
                 :class="{slideInRight:activeFlag}">
            <i class="confirm animations animations-10" :class="{imgScale:activeFlag}"></i>
          </div>
        </li>
        <li>
          <div class="icon i3 animations animations-11" :class="{slideInDown:activeFlag}">
            <img :src="require('../images/charts.png')" alt="" class="">
          </div>
          <i class="pre animations animations-16 animate-infinity animation-duration-6 dots"
             :class="{flash:activeFlag}"></i>
          <i class="animations animations-17 animate-infinity animation-duration-6 dots"
             :class="{flash:activeFlag}"></i>
          <div class="desc">
            <img :src="require('../images/invit1-txt-3.png')" alt="" class="animations animations-11"
                 :class="{slideInRight:activeFlag}">
            <i class="confirm animations animations-13" :class="{imgScale:activeFlag}"></i>
          </div>
        </li>
        <li>
          <div class="icon  no-dots animations animations-14" :class="{slideInDown:activeFlag}">
            <img :src="require('../images/app.png')" alt="" class="">
          </div>
          <div class="desc">
            <img :src="require('../images/invit1-txt-4.png')" alt="" class="animations animations-14"
                 :class="{slideInRight:activeFlag}">
            <i class="confirm animations animations-16" :class="{imgScale:activeFlag}"></i>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "page-2",
    data() {
      return {
        activeFlag: false
      }
    },
    props: {
      index: {
        type: Number
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

        .desc.spc i {
          top: .14rem;
        }
      }
    }
  }
</style>