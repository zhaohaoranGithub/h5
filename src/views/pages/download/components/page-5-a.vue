<template>
  <div class="reg-after1-container">
    <div class="top">
      <img :src="require('../intro-img/reg-title.png')" class="animations animations-1" alt=""
           :class="{jackInTheBox:activeFlag}">
    </div>
    <div class="phones">
      <img :src="require('../intro-img/phone-11.png')" class="animations animations-2" alt=""
           :class="{zoomInDown:activeFlag}">
      <img :src="require('../intro-img/phone-12.png')" class="animations animations-3" alt=""
           :class="{zoomInDown:activeFlag}">
      <img :src="require('../intro-img/phone-13.png')" class="animations animations-4" alt=""
           :class="{zoomInDown:activeFlag}">
    </div>
    <div class="btns">
      <el-button class="animations animations-5 btn" @click="downloadApp" :class="{lightSpeedIn:activeFlag}">下载代理APP
      </el-button>
      <br>
      <el-button  @click="installGuide" class="animations animations-6 install-guide" :class="{lightSpeedIn:activeFlag}" type="text">{{deviceType}}安装指南
      </el-button>
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
    created() {
      this.activeFlag = true
    },
    watch: {
      index(newVal) {
        if (newVal == 0) {
          this.activeFlag = true
        } else {
          this.activeFlag = false
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .reg-after1-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: url("../intro-img/after1-bg.png") no-repeat center center;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .reg-after1-container .top {
    width: 100%;
    height: auto;
    padding-top: .4rem;
  }

  .reg-after1-container .top img {
    display: block;
    width: 2.8rem;
    margin: 0.47rem auto;
  }

  .reg-after1-container .phones {
    position: relative;
    height: 3.7rem;

    img {
      /*margin: .24rem auto .3rem;*/
      position: absolute;

      &:first-child {
        top: 0;
        left: 0;
        width: 1.93rem;
      }

      &:nth-child(2) {
        top: 0;
        right: 0;
        width: 2.07rem;
      }

      &:nth-child(3) {
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 3.03rem;
      }
    }
  }

  .btns {
    text-align: center;

    .btn {
      width: 2.48rem;
      height: .36rem;
      background: linear-gradient(to right, #1336ce, #0e5eff);
      color: #ffffff;
      border-radius: .18rem;
      font-size: .15rem;
      box-shadow: 0 8px 18px 0 rgba(30, 90, 220, .32);
      border: none;
      outline: none;
    }

    .install-guide {
      font-size: .15rem;
      color: #000000;
      text-shadow: 4px 3px 3px rgba(0, 0, 0, .34);
      height: .15rem;
      line-height: .15rem;
      padding: 0;
      text-decoration: underline;
      margin-top: .12rem;
    }
  }
</style>