<template>
  <div class="account-login">
    <form @submit.native.prevent="doSave({action: 'saveForm',})">
      <van-cell-group>
        <van-field clearable v-model='form.username' placeholder="请输入用户名">
          <template slot="left-icon">
            <svg-icon icon-class="user" type='info' size='small'></svg-icon>
          </template>

        </van-field>
      </van-cell-group>
      <password-input v-model="form.password" placeholder="请输入密码" auto-complete="off"
                      :isLook="isLook"
                      :all-clean="passWordClean"></password-input>
      <van-cell-group v-if="isNeedImgCode">
        <van-field v-model='form.imgCode' placeholder="请输入验证码">
          <template slot="left-icon">
            <svg-icon icon-class="login-security" type='info' size='small'></svg-icon>
          </template>
          <template slot='icon'>
            <validate-img ref="validateImg" />
          </template>

        </van-field>
      </van-cell-group>
    </form>

    <van-row class="account-login-brief" type="flex" justify="space-between">
      <van-col span="12">
        <van-checkbox v-model="checked" checked-color='#1E5ADC'>记住密码</van-checkbox>
      </van-col>
      <van-col span="12">
        <router-link :to='{name:"forget-password"}' tag="span">
          忘记密码?
        </router-link>
      </van-col>
    </van-row>
    <van-row type="flex" justify="center" class="account-login-button">
      <van-button type="primary" block shadow :loading="loading" native-type="submit" @click="login">登录</van-button>
    </van-row>

  </div>
</template>

<script>
import { factory, form } from "@/build";
import { remPassWord, removeRemPassWord } from "@/utils/auth";
export default {
  name: "account-login",

  mixins: [form, factory],

  data() {
    return {
      form: {
        username: "",
        password: "",
        imgCode: ""
      },
      checked: false,

      isSending: false,

      security: false,
      isNeedImgCode: false,

      isLook:
        JSON.parse(localStorage.getItem("rempassWord")) !== null &&
        Object.keys(JSON.parse(localStorage.getItem("rempassWord"))).length
          ? false
          : true,
      passWordClean:false,
    };
  },
  watch: {
    'form.username'(val) {
      if(val === ''){
        this.form["password"] = '';
      }
    }
  },
  methods: {
    login() {
      if (
        factory.getValidator("usernameLogin")(this.form.username) &&
        factory.getValidator("password")(this.form.password)
      ) {
        if (this.isNeedImgCode) {
          if (_.isEmpty(this.form["imgCode"])) {
            this.$notify("请输入验证码");
            return;
          }
        }
        this.doSave({ action: "saveForm" });
      }
    }
  },
  mounted() {
    if (JSON.parse(localStorage.getItem("rempassWord"))) {
      const { username, password, checked } = JSON.parse(
        localStorage.getItem("rempassWord")
      );

      if (!checked) {
        this.form["username"] = username;
      } else {
        this.form["username"] = username;
        this.form["password"] = password;
        this.checked = checked;
        this.passWordClean = checked;
      }
    }
    this.bindSave(types.LOGIN, "saveForm", "form", {
      beforeSend: data => {
        return data;
      },
      callback: ({ result, data }) => {
        if (!result) {
          this.$notify(data.message);
          if (data.code === code.IMG_CODE_ERROR) {
            this.isNeedImgCode = true;
            this.loading = false;
            this.form.imgCode = "";
          }
          if (this.isNeedImgCode) {
            this.$refs.validateImg.change();
          }
        } else {
          remPassWord(Object.assign(this.form, { checked: this.checked }));
          this.$router.push(
            this.$route.query.redirect || {
              name: "home"
            }
          );
        }
      }
    });
  }
};
</script>

<style lang="scss" scoped>
@include b(account-login-brief) {
  margin-top: 25px;
  align-items: center;
  opacity: 0.8;
  color: rgba(76, 76, 76, 1);
  font-size: 14px;
  font-family: "PingFangSC-Regular";
  .van-col {
    &:last-child {
      text-align: right;
    }
  }
}
@include b(account-login-button) {
  margin-top: 41px;
}
</style>
