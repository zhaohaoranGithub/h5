<template>
  <div class="register-container">
    <!--<img :src="require('../images/reg-title.png')" :class="{jackInTheBox:activeFlag}"-->
    <!--class="title  animations animations-1"-->
    <!--alt="贝博体育">-->
    
    <img :src="require('../images/top.png')" :class="{jackInTheBox:activeFlag}"
         class="people  animations animations-1" alt="贝博体育">
    <img :src="require('../images/word.png')" :class="{myLightSpeedIn:activeFlag}"
         class="word  animations animations-2" alt="贝博体育">
    <img :src="require('../images/back-num.png')" alt="" class="num  animations animations-3"
         :class="{_slideInLeft:activeFlag}">
    <img :src="require('../images/meixi.png')" alt="" class="meixi  animations animations-4"
         :class="{_slideInLeft:activeFlag}">
    <img :src="require('../images/b.png')" alt="" class="b  animations animations-5"
         :class="{_slideInLeft:activeFlag}">
    <div :class="{_slideInUp:activeFlag}" class="register-container__join  animations animations-6">
      <!--<h2 class=" animations animations-3" :class="{myLightSpeedIn:activeFlag}">立即加入</h2>-->
      <!--<el-alert class="alert"-->
      <!--title="恭喜您注册成功,3秒后跳转下载页！"-->
      <!--type="success"-->
      <!--v-if="registerSuc"-->
      <!--show-icon>-->
      <!--</el-alert>-->
      <!-- <el-form :hide-required-asterisk="true" :inline="true" :rules="rules" :model="formInline"
               class="demo-form-inline" :status-icon="true" :show-message="false"
               label-width="1.5rem" ref="form"
               @submit.native.prevent="confirm()">
        <el-form-item label="账号" prop="username">
          <el-input v-model="formInline.username" type="text" placeholder="6-16个字母数字组合,非数字开头" @focus="inputFocus"
                    @blur="inputBlur" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formInline.password" type="password" placeholder="8-20个字母及数字组合" @focus="inputFocus"
                    @blur="inputBlur" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="验证码" prop="code" v-if="isNeedImgCode" :error="formError">
          <el-input v-model="formInline.code" type="text" placeholder="请输入验证码" @focus="inputFocus"
                    @blur="inputBlur" auto-complete="off"></el-input>
          <img :src="codeSrc" alt="" @click="getCode">
        </el-form-item>

        <el-form-item style="margin-bottom: 1.5rem;">
          <el-button type="primary"  native-type="submit"  class="confirm" :loading="buttonLoading"
                     :class="{disable:buttonLoading}">登陆
          </el-button>

        </el-form-item>
      </el-form> -->

    </div>
  </div>
</template>

<script>
  import Fingerprint from '@/vendor/scripts/fingerprint';
  import {registerApi} from "@/services/api/register";
  import {loginApi} from '@/services/api/user'

  const uuid = new Fingerprint().get()
  const nameValid = (rule, value, callback) => {
    if (!(/^[a-zA-Z][a-zA-Z\d]{5,18}$/.test(value))) {
      callback(new Error('用户名必须是字母和数字的组合'));
    } else {
      callback();
    }
  }
  const passValid = (rule, value, callback) => {
    if (!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/.test(value))) {
      callback(new Error('密码必须是字母和数字的组合'));
    } else {
      callback();
    }
  }
  export default {
    name: "page-login",
    props: {
      index: {
        type: Number
      },
      inputCursor: '',
      height: 0
    },
    data() {
      return {
        uuid: '',
        codeSrc: '',
        activeFlag: false,
        dialogVisible: false,
        registerSuc: false,
        formInline: {
          username: '',
          password: '',
          code: ''
        },
        buttonLoading: false,
        rules: {
          username: [{required: true, trigger: 'blur', message: '请输入账户名'}, {
            min: 6,
            max: 16,
            message: '用户名长度必须在6到16个字符之间',
            trigger: 'blur'
          }, {validator: nameValid, trigger: 'blur'}],
          password: [{required: true, trigger: 'blur', message: '请输入密码'}, {
            min: 8,
            max: 20,
            message: '密码长度必须在8到20个字符之间',
            trigger: 'blur'
          }, {validator: passValid, trigger: 'blur'}],
          code: [{required: true, trigger: 'blur', message: '请输入验证码'}],
        },
        isNeedImgCode: false,
      }
    },
    created() {
      this.uuid = new Fingerprint().get()
      this.codeSrc = `/api/gl/image/code?uuid=${this.uuid}&t=${Date.now()}`
      this.activeFlag = true
    },
    mounted() {

    },
    methods: {

      confirm() {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.isNeedImgCode = false;
            this.buttonLoading = true;
            loginApi({
              username: this.formInline.username,
              password: this.formInline.password,
              imgCode: this.formInline.code,
              uuid: this.uuid
            }).then(([result, data]) => {
              this.buttonLoading = false;
              this.registerSuc = true;
              this.formInline.code = '';
              this.getCode()
              if (result) {
                let leftSecond = 5;
                this.$message({
                  type: 'success',
                  message: `恭喜您登陆成功,${leftSecond}秒后跳转下载页！`,
                  duration: leftSecond * 1000
                });
                setTimeout(() => {
                  this.$router.push({
                    path: '/download',
                    query:{
                      hasLogin: true,
                    }
                  })
                }, leftSecond * 1000)
                /*this.$alert('注册成功', '提示', {
                  confirmButtonText: '确定',
                  center: true,
                  callback: action => {
                    this.$message({
                      type: 'info',
                      message: `恭喜您注册成功,3秒后跳转下载页！`,
                      duration: 3000
                    });
                    setTimeout(() => {
                      this.$router.push({
                        path: '/download'
                      })
                    }, 3000)

                    // this.$message({
                    //   type: 'info',
                    //   message: `action: ${ action }`
                    // });
                  }
                });*/
              } else {
                if (data.code === 200025) {
                  this.isNeedImgCode = true;
                  this.buttonLoading = false;
                }
                if (this.isNeedImgCode) {
                  // this.$refs.validateImg.change();
                  this.getCode();
                }
                let errMsg = '';
                if (data.message === '验证码错误') {
                  errMsg = '验证码错误,请重新输入'
                } else {
                  errMsg = data.message;
                }
                this.getCode();
                this.formError = errMsg;
                this.$message({
                  message: errMsg,
                  type: 'error',
                })
              }

            })
          }
        })
      },
      getCode() {
        this.codeSrc = `/api/gl/image/code?uuid=${this.uuid}&t=${Date.now()}`
      },
      inputFocus() {
        this.$emit('input-focus')
      },
      inputBlur() {
        this.$emit('input-blur')
      }
    },
    computed: {
      WH: () => window.screen.availHeight + 'px'
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
      overflow: hidden;
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: rgba(0, 0, 29, .6);
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
        vertical-align: middle;
        color: #c5c5c5;
        width: 232px;
        font-size: 11px;
        margin: 0;
        line-height: 11px;
        margin-right: 18px;
        padding-left: 1.5rem;
        // text-align: center;
      }
    }
  }

  .register-container {
    .demo-form-inline {
      padding:0  42px;
      width: 100%;
      margin: 0 auto;
      
    }

    .el-form-item /deep/ {
      width: 100%;
      height: 38px;

      label {
        height: 38px;
        line-height: 38px;

      }
      .el-form-item__content{
        width: calc(100% - 132px);
      }
    }

    .el-form-item__content /deep/ {
      height: 33px;
      line-height: 33px;
    }

    .el-input /deep/ {
      // width: 250px;
      height: 38px;
      line-height: 38px;
      color: #ffffff;

      input {
        // width: 232px;
        height: 38px;
        line-height: 38px;
        padding-left: 10px;
        border: 1px solid rgba(0, 0, 0, .33);
        border-radius: 2px;
        margin-right: 40px;
      }

      ::-webkit-input-placeholder {
        font-size: 12px;
      }

      :-moz-placeholder {
        font-size: 12px;
      }

      ::-moz-placeholder {
        font-size: 12px;
      }

      /*::input-placeholder{*/
      /*font-size: 10px;*/
      /*}*/

      .el-input__icon {
        line-height: 32px;
      }

      .el-input__suffix {
        right: 20px;
      }
    }


    .el-form-item /deep/ {
      // width: 100%;
      margin-bottom: 12px;

      img {
        position: absolute;
        width: 70px;
        height: 34px;
        right: 1px;
        top: 2px;
        /*background-color: black;*/
      }

      label {
        color: #ffffff;
        font-size: 14px;
      }

      .confirm {
        width: 222px;
        //  width: calc(100% - 82px);
        height: 34px;
        background: linear-gradient(to right, #1336ce, #0e5eff);
        color: #ffffff;
        border-radius: 15px;
        font-size: 14px;
        border: none;
        outline: none;
        margin-top: 24px;
        line-height: 34px;
        padding: 0;
        margin-left: 62px;
        margin-right: 18px;
      }
    }

    .el-button.is-loading:before {
      background-color: transparent;
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
</style>