<template>
  <div class="main-container">
   <div class="main-container__main">
      <!-- <template v-if="currentStep === 0">
        <el-form class="main-container-main__form" :model="form" :rules="rules" ref="form" :disabled="loading"
                 @submit.native.prevent="doSave({action: 'checkMobile', form: 'form'})"
        >
          <el-form-item class="main-container-main__item" prop="mobile" ref="mobile" :error="codeOps.codeError">
            <el-input class="main-container-main__input" v-model="form.mobile"  placeholder="请输入手机号码" auto-complete="off">
              <template slot="prepend">
                <svg-icon icon-class="mobile"></svg-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item class="main-container-main__item" prop="code" :error="formError">
            <el-input placeholder="请输入手机验证码" auto-complete="off" v-model="form.code">
              <template slot="prepend">
                <svg-icon icon-class="login-security"></svg-icon>
              </template>
              <template slot="append">
                <el-button size="medium" @click="sendCode({formItem: 'mobile'})" type="dark" :disabled="sendingCode">
                  {{codeBtnText}}
                </el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item class="main-container-main__item" prop="agreement">
            <el-checkbox label="我同意网站各项政策、条款及开户协议" v-model="form.agreement"></el-checkbox>
          </el-form-item>
          <div class="main-container-main__item">
            <el-button type="primary" native-type="submit" :loading="loading" block>下一步</el-button>
          </div>
        </el-form>

        <el-row class="main-container__links" type="flex" justify="space-between">
          <router-link :to="{name: 'registerAccount'}" class="main-container__link">
            <svg-icon icon-class="arrow-right" type="primary" :stroke="true" :reverse="true"></svg-icon>
            账户名注册
          </router-link>
          <router-link :to="{name: 'login'}" class="main-container__link">
            去登录
            <svg-icon icon-class="arrow-right" type="primary" :stroke="true"></svg-icon>
          </router-link>
        </el-row>
      </template>
      <template v-else-if="currentStep === 1">
        <el-form class="main-container-main__form" :model="form" :rules="rules" ref="form" :disabled="loading"
                 @submit.native.prevent="doSave({action: 'register', form: 'form'})"
        >
          <el-form-item class="main-container-main__item" prop="password" :error="formError">
            <password-input v-model="form.password" placeholder="请设置登录密码" auto-complete="off"></password-input>
          </el-form-item>

          <div class="main-container-main__item">
            <el-button type="primary" native-type="submit" :loading="loading" block>确定</el-button>
          </div>
        </el-form>
      </template>
      <nickname-set v-else-if="currentStep === 2"></nickname-set> -->
    </div>
    <!-- <div class="main-container__footer">
      <customer-service class="main-container__footer-custom">
        <svg-icon icon-class="login-customer-service" type="primary" size="partial"></svg-icon>7*24小时在线客服
      </customer-service>
    </div>  -->
  </div>
</template>

<script>
  import {factory, form, getCode} from '@/build';


  import {
    getMobileRegisterCodeApi as codeApi,
    mobileRegisterCodeCheckApi as checkApi
  } from "@/services/api/user";

  export default {
    name: "register-modal",

    mixins: [factory, form, getCode],

    components: {
    },

    data() {
      return {
        codeApi,
        currentStep: 0, //0手机号注册  2设置登陆密码 3注册完成
        form: {
          mobile: '',
          code: '',
          password: '',
          agreement: false
        },
        rules: {
          mobile: factory.getRule('mobile'),
          code: [
            {required: true,message: '请输入验证码',trigger: 'blur'}
          ],
          password: factory.getRule('password'),
          agreement: [
            {
              validator: (rule, value, callback) => {
                if (value === false) {
                  callback(new Error('请先同意网站各项政策、条款及开户协议'));
                } else {
                  callback();
                }
              }
            }
          ]
        },
        formError: '',
      };
    },

    methods: {
    },

    mounted() {
      //step1 验证验证码
      this.bindSave(checkApi, 'checkMobile', 'form', {
        beforeSend: (data) => {
          this.formError = '';

          return data;
        },
        callback: ([result, data]) => {
          if (!result) {
            this.formError = data.message;
          } else {
            this.formError = '';
            this.currentStep = 1;
          }
        }
      });

      //step2

      this.bindSave(types.REGISTER_MOBILE, 'register', 'form', {
        beforeSend: (data) => {
          this.formError = '';

          return data;
        },
        callback: ([result, data]) => {
          if (!result) {
            this.formError = data.message;
          } else {
            this.formError = '';
            this.currentStep = 2;
          }
        }
      });
    }
  };
</script>
