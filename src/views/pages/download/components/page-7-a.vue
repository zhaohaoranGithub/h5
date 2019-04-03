<template>
  <div class="reg-after1-container" :class="{'not-download':!btns}">
    <p class="animations animations-1" :class="{myLightSpeedIn:activeFlag}">联系我们</p>
    <p class="animations animations-2" :class="{myLightSpeedIn:activeFlag}"><label>QQ</label>：73771</p>
    <p class="animations animations-3" :class="{myLightSpeedIn:activeFlag}"><label>微信</label>：xiaoyue19901993</p>
    <p class="animations animations-4" :class="{myLightSpeedIn:activeFlag}"><label>skype</label>：ballbet2018</p>
    <p class="animations animations-5" :class="{myLightSpeedIn:activeFlag}"><label>邮箱</label>：beibo8888@gmail.com</p>
    <div class="wechat animations animations-6" :class="{myLightSpeedIn:activeFlag}">
      <img :src="require('../intro-img/wechat.png')" alt="" @click="visible=true">
    </div>
    <div class="btns" v-if="btns">
      <el-button class="animations animations-7 btn" @click="downloadApp" :class="{myLightSpeedIn:activeFlag}">下载代理APP
      </el-button>
      <br>
      <el-button class="animations animations-8 install-guide" :class="{myLightSpeedIn:activeFlag}"
                 @click="installGuide"
                 type="text">
        {{deviceType}}安装指南
      </el-button>
    </div>
    <div class="check-img" :style="checkBox" @click="visible=false" v-show="visible&&activeFlag">
      <img :src="require('../intro-img/wechat.png')" alt="">
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
        visible: false
      }
    },
    computed: {
      checkBox() {
        return {height: window.innerHeight + 'px', width: window.innerWidth + 'px'}
      }
    },
    created() {
      this.activeFlag = true
    },
    methods: {
      close() {
        this.visible = false
      }
    },
    watch: {
      index(newVal) {
        if (newVal == this.activeIndex) {
          this.activeFlag = true
        } else {
          this.activeFlag = false
          this.visible = false
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
    background: url("../intro-img/bg-7.png") no-repeat center top #ffffff;
    background-size: 100% 257px;
    box-sizing: border-box;
    padding-top: 257px;

    p {
      margin: 0;
      font-size: 15px;
      line-height: 12.5px;
      margin-bottom: 10px;
      box-sizing: border-box;
      padding: 0 70px;
      font-family: 'PingFang SC', 'Microsoft YaHei';

      &:first-child {
        font-size: 26px;
        line-height: 26px;
        margin-top: 24px;
        margin-bottom: 35px;
      }

      label {
        display: inline-block;
        vertical-align: middle;
        width: 45px;
        word-spacing: 10px;
      }
    }

    .wechat {
      width: 82px;
      height: 82px;
      box-sizing: border-box;
      padding: 5px;
      background-color: #ebebeb;
      margin-left: 70px;
      margin-top: 18px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .btns {
      text-align: center;
      margin-top: 20px;

      .btn {
        width: 248px;
        height: 39px;
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
        margin-top: 15px;
      }
    }

    .check-img {
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, .7);
      z-index: 1000;

      img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }

  .not-download {
    p {
      margin-bottom: 12px;

      &:first-child {
        margin-bottom: 20px;
      }
    }
  }

  @media (max-width: 420px) {
    .reg-after1-container {
      p {
        margin-bottom: 10px;

        &:first-child {
          margin-top: 10px;
        }
      }
    }
  }

  //iphoneX、iphoneXs

  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    .reg-after1-container {
      p {
        margin-bottom: 12px;

        &:first-child {
          margin: 30px 0 20px;
        }
      }
    }
  }

  //iphone Xs Max
  @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
    p {
      margin-bottom: 12px;

      &:first-child {
        margin: 30px 0 20px;
      }
    }
  }
</style>