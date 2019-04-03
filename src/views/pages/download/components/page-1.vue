<template>
  <div class="register-container">
    <!--<img :src="require('../images/reg-title.png')" :class="{jackInTheBox:activeFlag}"-->
    <!--class="title  animations animations-1"-->
    <!--alt="贝博体育">-->
    <img :src="require('../images/top.png')" :class="{jackInTheBox:activeFlag}" class="people  animations animations-1" alt="贝博体育">
    <img :src="require('../images/word.png')" :class="{myLightSpeedIn:activeFlag}" class="word  animations animations-2" alt="贝博体育">
    <img :src="require('../images/back-num.png')" alt="" class="num  animations animations-3" :class="{_slideInLeft:activeFlag}">
    <img :src="require('../images/meixi.png')" alt="" class="meixi  animations animations-4" :class="{_slideInLeft:activeFlag}">
    <img :src="require('../images/b.png')" alt="" class="b  animations animations-5" :class="{_slideInLeft:activeFlag}">
    <div :class="{_slideInUp:activeFlag}" class="register-container__join  animations animations-6">
    
      <form>
        <p>
          <label for="account" class="tx-right">账号</label><input id="account" class="border-box" name="account" v-model="formInline.username" type="text" placeholder="6-18个字母及数字组合" />
        </p>
        <p>
          <label for="password" class="tx-right">密码</label><input id="password" class="border-box" name="password" v-model="formInline.password" type="password" placeholder="8-20个字母及数字组合" />
        </p>
        <p>
          <label for="code" class="tx-right">验证码</label><input id="code" class="border-box" name="code" placeholder="输入图形验证码" v-model="formInline.imgCode" />
          <img class="code" :src="codeSrc" @click="getCode">
        </p>
        <p class="tips">注册即代表阅读并同意使用条款</p>
        <p>
          <button class="blue confirm" type="button" @click="onSubmit" :disabled="buttonLoading">{{buttonLoading? '申请中...':'确定'}}
          </button>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import Fingerprint from "@/vendor/scripts/fingerprint";
import { registerApi } from "@/services/api/user";
import { factory, form } from "@/build";
const uuid = new Fingerprint().get();
export default {
  name: "page-1",
  data() {
    return {
     
      codeSrc: "",
      activeFlag: false,
      formInline: {
        username: "",
        password: "",
        imgCode: "",
         uuid: "",
      },
      buttonLoading: false
    };
  },
  props: {
    index: {
      type: Number
    },
    inputCursor: "",
    height: 0
  },
  mixins: [factory, form],

  created() {
    this.uuid = new Fingerprint().get();
    this.codeSrc = `/api/gl/image/code?uuid=${this.formInline.uuid}&t=${Date.now()}`;
    this.activeFlag = true;
  },

  methods: {
    onSubmit() {
      if (
        factory.getValidator("username")(this.formInline.username) &&
        factory.getValidator("password")(this.formInline.password) &&
        this.checkCode()
      ) {
        this.doSave({ action: "saveForm" });
      }
    },
    getCode() {
      this.codeSrc = `/api/gl/image/code?uuid=${this.uuid}&t=${Date.now()}`;
    },
    checkCode() {
      if (!this.formInline.imgCode) {
        this.$toast("请输入验证码");
        return false;
      } else if (this.formInline.imgCode.length != 4) {
        this.$toast("验证码格式不正确");
        return false;
      } else {
        return true;
      }
    }
  },
  mounted() {
    this.bindSave(registerApi, "saveForm", "formInline", {
      beforeSend: data => {
        // this.formError = "";

        return data;
      },
      callback: ([result, data]) => {
        if (!result) {
          this.$toast("验证码错误,请重新输入");
          this.getCode();
        } else {
          let leftSecond = 3;

          this.$toast.success(`恭喜您注册成功,${leftSecond}秒后跳转下载页！`);
          setTimeout(() => {
            this.$router.push({
              path: "/download"
            });
          }, leftSecond * 1000);
        }
      }
    });
  },
  computed: {
    WH: () => window.screen.availHeight + "px"
  },
  watch: {
    index(newVal) {
      if (newVal == 0) {
        this.activeFlag = true;
      } else {
        this.activeFlag = false;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.alert {
  margin-top: 5px;
}

@include b(register-container) {
  width: 100%;
  height: 100%;
  background: url("../images/bg.png") no-repeat center center;
  background-size: 100% 100%;
  color: #333333 !important;
  overflow: hidden;
  position: relative;
  .people {
    display: block;
    width: 195px;
    margin: 50px auto 0;
  }
  .word {
    display: block;
    width: 310px;
    margin: 20px auto 0;
  }
  .num {
    position: absolute;
    width: 290px;
    right: 0;
    bottom: 0;
  }
  .meixi {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 188px;
  }
  .b {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
  }
  @include e(join) {
    width: 100%;
    height: 270px;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 29, 0.6);
    color: #ffffff;
    padding-top: 15px;
    box-sizing: border-box;
    z-index: 100;
    h2 {
      width: 100%;
      font-size: 18px;
      line-height: 18px;
      margin: 0 auto 30px;
      text-align: center;
    }
    .tips {
      display: block;
      color: #c5c5c5;
      width: 100%;
      font-size: 11px;
      margin: 0;
      line-height: 11px;
      text-align: center;
      padding-left: 64px;
    }
    form {
      width: 100%;
      height: auto;
      text-align: center;

      p {
        width: 100%;
        height: auto;
        line-height: 36px;
        margin-bottom: 12px;
        position: relative;
        padding-right: 62px;
        box-sizing: border-box;

        img {
          display: block;
          width: 70px;
          height: 36px;
          position: absolute;
          right: 64px;
          top: 1px;
        }

        &:last-child {
          padding: 0;
        }
      }

      label,
      input {
        display: inline-block;
      }

      label {
        width: 62px;
        font-size: 14px;
        margin-right: 15px;
        text-align: right;
      }

      input {
        width: 220px;
        line-height: 36px;
        border: 1px solid #a4a6a6;
        border-radius: 2px;
        padding: 0;
        padding-left: 10px;
        color: black;
        &::placeholder {
          font-size: 14px;
          color: #c5c5c5;
        }
      }

      button {
        width: 232px;
        height: 34px;
        background: linear-gradient(90deg, #1336ce, #0e5eff);
        color: #fff;
        border-radius: 15px;
        font-size: 14px;
        border: none;
        outline: none;
        line-height: 34px;
        padding: 0;
        margin: 0;
      }
    }
  }
}

@media (min-width: 375px) and (max-width: 420px) {
  .register-container {
    .num {
      width: 280px;
      height: 420px;
    }

    .meixi {
      width: 170px;
      left: 30px;
    }

    .b {
      width: 80px;
      height: 420px;
    }
  }
}

@media (max-width: 375px) {
  .register-container {
    .num {
      width: 260px;
      height: 330px;
    }

    .meixi {
      width: 140px;
      left: 30px;
    }

    .b {
      width: 80px;
      height: 330px;
    }

    .el-input {
      line-height: 38px;
    }

    .register-container__join {
      height: 260px;

      .el-form-item {
        .confirm {
          margin-top: 12px;
        }
      }
    }
  }
}

//iphoneX、iphoneXs

@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
  .register-container {
    .num {
      position: absolute;
      width: 290px;
      right: 0;
      bottom: 0;
      height: 420px;
    }

    .meixi {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 175px;
    }

    .b {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 60px;
      height: 420px;
    }
  }
}

//iphoneX max
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
  .register-container {
    .num {
      position: absolute;
      width: 290px;
      right: 0;
      bottom: 0;
      height: 420px;
    }

    .meixi {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 175px;
    }

    .b {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 60px;
      height: 420px;
    }
  }
}

#account.error,
#password.error,
#code.error {
  border-color: #d20d25;
}

.error-content {
  display: block;
  padding: 0 10px;
  background: #fff;
  box-shadow: 0 7px 20px 0 rgba(0, 0, 0, 0.18);
  color: #d20d25;
  font-size: 12px;
  position: absolute;
  top: -20px;
  right: 70px;
  border-radius: 2px;
  z-index: 1;
  line-height: 24px;
}

.error-content:before {
  content: "";
  position: absolute;
  bottom: -10px;
  right: 10px;
  width: 0;
  height: 0;
  border-width: 5px;
  border-style: solid;
  border-color: #fff transparent transparent transparent;
}
</style>
