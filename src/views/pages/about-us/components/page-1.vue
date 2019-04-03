<template>
  <div class="register-container">
    <div class="register-container__top">
      <img :src="require('../images/reg-title.png')" :class="{jackInTheBox:activeFlag}"
           class="title  animations animations-1"
           alt="贝博体育">
      <img :src="require('../images/people.png')" :class="{zoomInRight:activeFlag}"
           class="people  animations animations-2" alt="贝博体育">
    </div>
    <div class="register-container__join">
      <h2 class=" animations animations-3" :class="{lightSpeedIn:activeFlag}">立即加入</h2>
      <el-form :hide-required-asterisk="true" :inline="true" align="center" :rules="rules" :model="formInline"
               class="demo-form-inline" :status-icon="true" :show-message="false"
               label-width=".62rem" ref="form">
        <el-form-item label="账号" prop="username" :class="{lightSpeedIn:activeFlag}" class="animations animations-4">
          <el-input v-model="formInline.username" type="text" placeholder="6-18个字母及数字组合"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :class="{lightSpeedIn:activeFlag}" class="animations animations-5">
          <el-input v-model="formInline.password" type="password" placeholder="8-20个字母及数字组合"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code" :class="{lightSpeedIn:activeFlag}" class="animations animations-6">
          <el-input v-model="formInline.code" type="text" placeholder="请输入验证码"></el-input>
          <img :src="codeSrc" alt="" @click="getCode">
        </el-form-item>
        <el-form-item :class="{lightSpeedIn:activeFlag}" class="animations animations-7">
          <el-button type="primary" @click="onSubmit" class="confirm">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import consts from '../../../../consts/consts'
  import Fingerprint from '@/vendor/scripts/fingerprint';
  import {registerApi} from "../../../../services/api/register";

  const uuid = new Fingerprint().get()
  const nameValid = (rule, value, callback) => {
    if (!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/.test(value))) {
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
    name: "page-1",
    props: {
      index: {
        type: Number
      }
    },
    data() {
      return {
        uuid: '',
        codeSrc: '',
        activeFlag: false,
        formInline: {
          username: '',
          password: '',
          code: ''
        },
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
        }
      }
    },
    created() {
      this.uuid = new Fingerprint().get()
      this.codeSrc = `${consts.HOST_URL}/api/gl/image/code?uuid=${this.uuid}&t=${Date.now()}`
      this.activeFlag = true
    },
    mounted() {
    },
    methods: {
      onSubmit() {
        this.$refs.form.validate(valid => {
          if (valid) {
            registerApi({
              username: this.formInline.username,
              password: this.formInline.password,
              imgCode: this.formInline.code,
              uuid: this.uuid
            }).then(([result, data]) => {
              if (result) {
                this.$router.push({
                  path: '/download/download'
                })
              } else {
                this.$message({
                  message: data.message,
                  type: 'error'
                })
              }
            })
          }
        })
      },
      getCode() {
        this.codeSrc = `${consts.HOST_URL}/api/gl/image/code?uuid=${this.uuid}&t=${Date.now()}`
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
  @include b(register-container) {
    width: 100%;
    height: 100%;
    background: url("../images/bg.png") no-repeat center center;
    background-size: 100% 100%;
    color: #333333 !important;
    @include e(top) {
      width: 100%;
      height: auto;
      overflow: hidden;
      padding-top: .4rem;
      .title {
        display: block;
        width: 2.82rem;
        margin: .5rem auto 0;
      }
      .people {
        display: block;
        width: 100%;
        margin-top: .15rem;
      }
    }
    @include e(join) {
      width: 100%;
      height: 3.5rem;
      overflow: hidden;
      margin-top: .45rem;
      h2 {
        width: 100%;
        font-size: .18rem;
        line-height: 0.18rem;
        margin: 0 auto .3rem;
        text-align: center;
      }
    }
  }

  .register-container {
    .el-input /deep/ {
      height: .32rem;
      line-height: .32rem;

      input {
        width: 2.3rem;
        height: .32rem;
        line-height: .12rem;
        border: 1px solid rgba(0, 0, 0, .33);
        border-radius: 2px;
        margin-right: .4rem;
      }

      .el-input__icon {
        line-height: .32rem;
      }

      .el-input__suffix {
        right: .45rem;
      }
    }

    .el-form-item__content /deep/ {
      height: .32rem;
    }

    .el-form-item /deep/ {
      width: 100%;
      margin-bottom: .05rem;

      img {
        position: absolute;
        width: .5rem;
        height: .2rem;
        right: .45rem;
        top: .1rem;
      }

      label {
        color: #333333;
        font-size: .14rem;
      }

      .confirm {
        width: 2.48rem;
        height: .39rem;
        background-color: #1e5adc;
        color: #ffffff;
        border-radius: 4px;
        font-size: .15rem;
        box-shadow: 0 8px 18px 0 rgba(30, 90, 220, .32);
        border: none;
        outline: none;
        margin-top: .2rem;
      }
    }
  }


  .jackInTheBox {
    animation-name: jackInTheBox
  }

  .zoomInRight {
    animation-name: zoomInRight
  }

  .lightSpeedIn {
    animation-name: lightSpeedIn
  }
</style>
