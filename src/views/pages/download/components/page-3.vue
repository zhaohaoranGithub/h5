<template>
  <div class="intro-2-container">
    <div class="top">
      <img :src="require('../images/intro2-title.png')" :class="{jackInTheBox:activeFlag}"
           class=" animations animations-1" alt="">
    </div>
    <!--<p class="animations animations-2" :class="{myLightSpeedIn:activeFlag}">原生体育APP</p>-->
    <!--<p class="animations animations-3" :class="{myLightSpeedIn:activeFlag}">给你带来更流畅的体验</p>-->
    <!--<p class="animations animations-4" :class="{myLightSpeedIn:activeFlag}">专业的设计</p>-->
    <!--<p class="animations animations-5" :class="{myLightSpeedIn:activeFlag}">为你创造更大的价值</p>-->
    <div class="blue-back   animations animations-2" :class="{_slideInLeft:activeFlag}">
      <p class="animations animations-3" :class="{myLightSpeedIn:activeFlag}">简化操作</p>
      <p class="animations animations-4" :class="{myLightSpeedIn:activeFlag}">支持动画/视频直播</p>
      <p class="animations animations-5" :class="{myLightSpeedIn:activeFlag}">个性化推荐/收藏</p>
      <p class="animations animations-6" :class="{myLightSpeedIn:activeFlag}">100+需求优化</p>
      <p class="animations animations-7" :class="{myLightSpeedIn:activeFlag}">只为专注手机投注</p>
    </div>
    <img :src="require('../images/phone.png')" alt="" class="phone  animations animations-2"
         :class="{_slideInRight:activeFlag}">
    <img :src="require('../images/neima.png')" alt="" class=" neima animations animations-2"
         :class="{_slideInLeft:activeFlag}">

  </div>
</template>

<script>
  export default {
    name: "page-3",
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
  .intro-2-container {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    position: relative;
    overflow: hidden;
  }

  .intro-2-container .top {
    width: 100%;
    height: auto;
    padding-top: 45px;
  }

  .intro-2-container .top img {
    display: block;
    width: 300px;
    margin: 20px auto 0;
  }

  .phone {
    width: 183px;
    position: absolute;
    bottom: -38px;
    right: 0;
    z-index: 50;
  }

  .neima {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 200px;
    z-index: 60;
  }

  .blue-back {
    width: 100%;
    position: absolute;
    top: 100px;
    left: 0;
    z-index: 20;
    background: url("../images/blue-back.png") no-repeat center center;
    background-size: 100% 100%;
    padding: 50px 0 120px;

    p {
      margin: 0;
      font-size: 15px;
      color: #ffffff;
      line-height: 40px;

      &:first-child {
        text-indent: 33px;
      }

      &:nth-child(2) {
        text-indent: 34px;
      }

      &:nth-child(3) {
        text-indent: 35px;
      }

      &:nth-child(4) {
        text-indent: 36px;
      }

      &:nth-child(5) {
        text-indent: 37px;
      }
    }
  }


  @media (min-width: 375px) and (max-width: 420px) {
    .blue-back {
      padding: 30px 0 100px;

      p {
        line-height: 35px;
      }
    }
    .neima {
      width: 240px;
      bottom: -70px;
    }
    .phone {
      width: 200px;
      bottom: -150px;
    }
  }

  @media (max-width: 375px) {
    .blue-back {
      padding: 30px 0 100px;

      p {
        line-height: 30px;
      }
    }
    .phone {
      bottom: -150px;
    }
    .neima {
      bottom: -70px;
    }
  }
</style>