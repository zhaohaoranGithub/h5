<template>
  <div class="main-container">
    <div class="main-container__main">
      <div class="main-container-main__title">
        输入您的用户名> 接受验证码> 修改密码
      </div>
      <!-- step1 -->
      <template v-if='currentStep===0'>
        <van-cell-group>
          <van-field clearable v-model='form.username' placeholder="请输入您的用户名或者手机号">
            <template slot="left-icon">
              <svg-icon icon-class="user" type='info' size='small'></svg-icon>
            </template>
          </van-field>
        </van-cell-group>
        <van-cell-group>
          <van-field clearable v-model='form.code' placeholder="请输入图形验证码">
            <template slot="left-icon">
              <svg-icon icon-class="login-security" type='info' size='small'></svg-icon>
            </template>
            <template slot='icon'>
              <validate-img ref="validateImg" />
            </template>

          </van-field>
        </van-cell-group>
        <van-row type="flex" justify="center" class="main-container-main__button">
          <van-button type="primary" block shadow native-type="submit" @click="confirmUsername">下一步</van-button>
        </van-row>
      </template>
      <!-- sept2 -->
      <template v-else-if="currentStep === 1">
        <van-radio-group v-model="selectForm.type" label-position='right'>
          <van-cell-group>
            <van-cell clickable v-if="!!userData.telephone">
              <van-radio name="mobile" isCustom>
                <div class="main-container-main__radio-title">将验证码发送到绑定的手机号码</div>
                <div class="main-container-main__radio-brief">{{userData.telephone}}</div>
              </van-radio>
            </van-cell>
            <van-cell clickable v-if="!!userData.email">
              <van-radio name="email" is-custom>
                <div class="main-container-main__radio-title">将验证码发送到绑定的电子邮箱</div>
                <div class="main-container-main__radio-brief">{{userData.email}}</div>
              </van-radio>
            </van-cell>
          </van-cell-group>
        </van-radio-group>

        <van-row type="flex" justify="center" class="main-container-main__button">
          <van-button type="primary" block shadow native-type="submit" @click="confirmFindWay('selectForm')">下一步</van-button>
        </van-row>
      </template>
      <!-- step 3 -->
      <template v-else>
        <div class="main-container__tips">
          <div class="main-container__tips-l">验证码已经发送到您的{{selectForm.type === 'mobile' ? '手机号' : '电子邮箱'}}
            <span v-if="selectForm.type === 'mobile'">{{userData.telephone}}</span>
            <span v-else-if="selectForm.type === 'email'">
              {{userData.email}}
            </span>
          </div>

        </div>
        <van-field clearable v-model='submitForm.code' placeholder="请输入收到的验证码">
          <template slot="left-icon">
            <svg-icon icon-class="login-security" type='info' size='small'></svg-icon>
          </template>
          <template slot="icon">
            <span @click="sendCode()" :class="{'active':codeBtnText==='重新发送'}">{{codeBtnText}}</span>
          </template>
        </van-field>
        <password-input v-model="submitForm.password" placeholder="8〜20个字母及数字组成" auto-complete="off"></password-input>
        <password-input v-model="submitForm.newPwd" placeholder="确认新密码" auto-complete="off"></password-input>
        <van-row type="flex" justify="center" class="main-container-main__button">
          <van-button type="primary" block shadow native-type="submit" @click="submit">确认</van-button>
        </van-row>
      </template>
    </div>

    <van-dialog v-model="warningStatus" message-align='center' closed>
      <warning-dialog>
        <template slot='brief'>
          您还没有绑定手机和电子邮箱？<br/>请立即联系在线客服
        </template>
        <template slot="button">
          <span @click="$global.bus.$emit('open')">联系在线客服</span>
        </template>
      </warning-dialog>
    </van-dialog>

  </div>
</template>

<script type="text/jsx">
import { factory, form, getCode } from "@/build";

import {
  getUserForgetInfoApi as infoApi,
  getUserForgetCodeApi as codeApi,
  userForgetResetPasswordApi as saveApi
} from "@/services/api/user";

export default {
  name: "forget-password",

  mixins: [form, getCode, factory],

  data() {
    return {
      codeApi,
      sendingData: "selectForm",
      warningStatus: false,
      currentStep: 0,

      //step-1
      form: {
        username: "",
        code: ""
      },

      userData: {},

      //step-2
      selectForm: {
        type: "",
        imgCode: "",
        username: ""
      },

      //step-3
      submitForm: {
        username: "username",
        code: "",
        password: "",
        newPwd: "",
        imgCode: "",
        type: ""
      }
    };
  },
  methods: {
    confirmFindWay() {
      this.selectForm.imgCode = this.form.code;
      this.selectForm.username = this.form.username;

      this.sendCode();
      this.currentStep++;
    },

    //第一步
    confirmUsername() {
      if (
        factory.getValidator("usernameOrMobile")(this.form["username"]) &&
        factory.getValidator("imgcode")(this.form["code"])
      ) {
        this.doSave({ action: "confirmUsername" });
      }
    },
    //完成
    submit() {
      if (_.isEmpty(this.submitForm["code"])) {
        this.$toast("请输入验证码!");
        return;
      }
      if (factory.getValidator("password")(this.submitForm["password"])) {
        if (this.submitForm["newPwd"] !== this.submitForm["password"]) {
          this.$toast("两次密码输入不一致!");
          return;
        }
        this.doSave({ action: "submit" });
      }
    }
  },

  mounted() {
    this.bindSave(infoApi, "confirmUsername", "form", {
      beforeSend: data => {
        return data;
      },
      callback: ([result, data]) => {
        if (!result) {
          this.$toast(data.message);
          this.$refs.validateImg.change();
        } else {
          this.userData = data;
          if (data.telephone) {
            this.selectForm.type = "mobile";
          } else if (data.email) {
            this.selectForm.type = "email";
          }

          //有无找回方式
          if (this.selectForm.type) {
            this.currentStep++;
          } else {
            this.warningStatus = true;
          }
        }
      }
    });

    this.bindSave(saveApi, "submit", "submitForm", {
      beforeSend: data => {
        this.submitForm.username = this.form.username;
        this.submitForm.imgCode = this.form.code;
        this.submitForm.type = this.selectForm.type;

        return data;
      },
      callback: ([result, data]) => {
        if (!result) {
          this.$toast(data.message);
        } else {
          this.$toast("新密码设置成功!");
          this.$router.push({ name: "login" });
        }
      }
    });
    this.$global.bus.$on('backEvent', () => {
      if(this.currentStep){
        this.currentStep -=1;
      }else{
        this.$router.push('/login')
      }
    });
  }
};
</script>


<style lang="scss" scoped>
@include b(main-container) {
  padding-top: 31px;
  @include e(tips) {
    height: 37px;
    background: #f3f3f2;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  @include e(tips-l) {
    padding-left: 8px;
    color: #666666;
    font-size: 12px;
    font-family: $--main-font-family--Regular;
    span {
      color: #2157e5;
    }
  }
  @include e(main) {
    padding: $--main-login-form-padding;
    @include b(main-container-main) {
      @include e(button) {
        margin-top: 30px;
      }
      @include e(title) {
        font-family: $--main-font-family--Regular;
        font-size: 12px;
        color: #4c4c4c;
        margin-bottom: 20px;
      }
      @include e(radio-brief) {
        font-family: $--main-font-family--Medium;
        font-size: $--font-size--medium;
        color: $--main-color;
        margin-top: 5px;
      }
      @include e(radio-title) {
        font-family: $--main-font-family--Regular;
        font-size: $--font-size--normal;
        color: #666666;
      }
    }
  }
}
</style>
