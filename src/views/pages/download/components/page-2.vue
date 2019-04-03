<template>
  <div class="intro-1-container">
    <div class="top ">
      <img :src="require('../images/title.png')" class="animations animations-1"
           :class="{jackInTheBox:activeFlag}" alt="">
    </div>
    <div class="content">
      <img :src="require('../images/people-1.png')" class="people-1 animations animations-2"
           :class="{mySlideInDown:activeFlag}" alt="">
      <img :src="require('../images/people-2.png')" class="people-2 animations animations-3"
           :class="{mySlideInLeft:activeFlag}" alt="">
      <img :src="require('../images/people-3.png')" class="people-3 animations animations-4"
           :class="{mySlideInRight:activeFlag}" alt="">
      <img :src="require('../images/people-4.png')" class="people-4 animations animations-5"
           :class="{mySlideInUp:activeFlag}" alt="">
      <div v-for="(item,index) in percents" class="percents animations" :class="getClass(index)">
        <p class="num"><span>{{item.per}}</span>%</p>
        <p class="txt">{{item.txt}}</p>
      </div>
      <img :src="require('../images/ball-1.png')" class="animations animations-5 ball-1" alt=""
           :class="{myLightSpeedInLeft:activeFlag}">
      <img :src="require('../images/ball-2.png')" class="animations animations-5 ball-2" alt=""
           :class="{myLightSpeedInRight:activeFlag}">
    </div>
  </div>
</template>

<script>
  export default {
    name: "page-2",
    data() {
      return {
        activeFlag: false,
        percents: [{
          per: 0.6,
          txt: '贝博体育',
          class: 'animations-6'
        }, {
          per: '1.0',
          txt: 'AG/eBET真人'
        }, {
          per: 1.2,
          txt: 'PT电子'
        }, {
          per: 1.2,
          txt: 'AG捕鱼王'
        }]
      }
    },
    props: {
      index: {
        type: Number
      }
    },
    methods: {
      getClass(index) {
        return `animations-${index + 6} ${this.activeFlag ? 'myZoomIn' : ''}`
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
  .intro-1-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: url("../images/bg.png") no-repeat center center;
    background-size: 100% 100%;

    .top {
      width: 100%;
      height: auto;
      padding-top: 40px;
    }
  }


  .intro-1-container .top img {
    display: block;
    width: 263px;
    margin: 2px auto 0;
  }


  .intro-1-container .content {
    width: 100%;
    height: 520px;
    margin-top: 43px;
    position: relative;

    img {
      position: absolute;
    }

    .people-1 {
      top: 22px;
      left: 55%;
      transform: translateX(-50%);
    }

    .people-2 {
      top: 105px;
      left: 55%;
      transform: translateX(-90%);
    }

    .people-3 {
      top: 105px;
      right: 55%;
      transform: translateX(100%);
    }

    .people-4 {
      top: 250px;
      right: 55%;
      transform: translateX(100%);
    }

    .ball-1 {
      width: 58px;
      position: absolute;
      top: 0;
      left: 0;
      transform: translateX(-50%);
    }

    .ball-2 {
      position: absolute;
      bottom: 0;
      right: 0;
      transform: translateX(-50%);
    }

    .percents {
      position: absolute;

      p {
        margin: 0;
        text-align: center;
      }

      .num {
        line-height: 35px;
        color: #b29363;
      }

      .txt {
        line-height: 17px;
        background-color: #000;
        padding: 0 15px;
        border-radius: 8.5px;
        color: #ffffff;
        font-size: 12px;
      }

      &:nth-child(5) {
        top: 0;
        left: 80px;

        .num {
          span {
            font-size: 43px;
            line-height: 35px;
          }
        }
      }

      &:nth-child(6), &:nth-child(7) {
        .num {
          span {
            font-size: 37px;
            line-height: 35px;
          }
        }
      }

      &:nth-child(6) {
        top: 37px;
        right: 44px;
      }

      &:nth-child(7) {
        top: 160px;
        left: 10px;
      }


      &:nth-child(8) {
        top: 234px;
        right: 10px;

        .num {
          span {
            font-size: 28px;
            line-height: 35px;
          }
        }
      }

      &:nth-child(9) {
        bottom: 20px;
        right: 54px;

        .num {
          span {
            font-size: 37px;
            line-height: 35px;
          }
        }
      }
    }
  }

  @media (max-width: 375px) {
    .intro-1-container .content {
      margin-top: 20px;
    }
  }
</style>