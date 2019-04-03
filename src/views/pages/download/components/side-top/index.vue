<template>
    <div class="sider-top" :class="{'transition is-show ':show,'important-show':isDownload}" :style="{'background':!isDownload?'rgba(255,255,255,.75)':''}">
        <div class="sider-top__inner">
            <div class="closed" @click="closed" v-if='!isDownload'>
                <i class="icon"></i>
            </div>
            <div class="sider-top-logo" v-if='isDownload'>
                <div class="closed" @click="closed">
                    <i class="icon"></i>
                </div>
                <div class="sider-top-logo__l">
                </div>

                <div class="sider-top-logo__r" v-if="!hasLogin">
                    <div class="sider-top-logo__title">还没有贝博账号?</div>
                    <div class="sider-top-logo__brief">仅需3步,轻松注册</div>
                </div>
                <div class="sider-top-logo__r" v-else >
                    <div class="sider-top-logo__title">贝博H5即将上线</div>
                    <div class="sider-top-logo__brief">敬请期待</div>
                </div>
            </div>

            <!-- <router-link tag="div" :to='{path:"/login"}' class="sider-top__button" v-if='!isDownload && !hasLogin'>
                <span>已注册账号?去登陆</span> &gt;
            </router-link>
            <router-link tag="div" :to='{path:"/register"}' class="sider-top__button--reg" v-else-if="!hasLogin">
                前去注册
            </router-link> -->
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      timer: null,
      hasLogin: false,
    };
  },
  props: {
    isDownload: {
      default: false,
      type: Boolean
    },

  },
  methods: {
    closed() {
      this.show = false;
      this.$parent.show = false;
    }
  },
  mounted() {
    if (!this.isDownload) {
      this.timer = setTimeout(() => {
        this.show = true;
      }, 3000);
    }
    if(location.href.indexOf('hasLogin=true')>0){
      this.hasLogin = true;
    }else{
      this.hasLogin = false;
    }
  },
  destroyed() {
    clearTimeout(this.timer);
  }
};
</script>


<style lang="scss" scoped>
$--font-family: "MicrosoftYaHei";
.sider-top {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
  background: white;
  z-index: 111;
  
  opacity: 0;
  &.transition{
      transition: all 0.3s;
  }
  &.is-show {
    opacity: 1;
  }
  &.important-show {
    height: 55px;
    opacity: 1;
    transition: none;
  }
  .sider-top__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    padding: 0px 25px;
    .closed {
      .icon {
        width: 12px;
        height: 12px;
        display: inline-block;
        @include utils-bg(url("./close.png") no-repeat top, contain);
      }
    }
    .sider-top-logo {
      display: flex;
      justify-content: center;
      align-items: center;

      .sider-top-logo__l {
        width: 38px;
        height: 38px;
        margin: 0 12px 0 20px;

        @include utils-bg(url("./logo.png") no-repeat top, contain);
        &.is-sports {
          @include utils-bg(url("./sport-logo.png") no-repeat top, contain);
          margin-left: 0;
        }
      }
      .sider-top-logo__r {
        .sider-top-logo__title {
          font-size: 13px;
          font-family: $--font-family;
          font-weight: 400;
          color: #333333;
        }
        .sider-top-logo__brief {
          font-size: 11px;
          font-family: $--font-family;
          font-weight: 400;
          color: #999999;
        }
      }
    }

    .sider-top__button {
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.5);
      font-family: $--font-family;

      span {
        text-decoration: underline;
      }
      vertical-align: middle;
    }
    .sider-top__button--reg {
      width: 74px;
      height: 25px;
      background: rgba(14, 94, 255, 1);
      border-radius: 23px;
      font-size: 12px;
      font-weight: 400;
      color: white;
      font-family: $--font-family;
      text-align: center;
      line-height: 25px;
    }
  }
}
</style>
