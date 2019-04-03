<template>
  <div class="main-container">
    <div class="main-container__banner">

    </div>
    <div class="main-container__main">
      <template>
        <van-cell-group>
          <van-field clearable v-model='form.username' placeholder="用户名为6-16个字母和数字的组合">
            <template slot="left-icon">
              <svg-icon icon-class="user" type='info' size='small'></svg-icon>
            </template>
          </van-field>
        </van-cell-group>
        <van-cell-group>
          <password-input v-model='form.password' placeholder="请输入密码"></password-input>
        </van-cell-group>
        <van-cell-group>
          <van-field v-model='form.imgCode' clearable placeholder="输入图形验证码">
            <template slot="left-icon">
              <svg-icon icon-class="login-security" type='info' size='small'></svg-icon>
            </template>
            <template slot='icon'>
              <validate-img ref="validateImg" />
            </template>

          </van-field>
        </van-cell-group>

        <van-row type="flex" justify="center" class="account-button">
          <van-button type="primary" block shadow native-type="submit" @click="register()">下一步</van-button>
        </van-row>
        <van-row type="flex" justify="end" class="account-footer">
          <router-link :to='{name:"login"}'> 已有账号，登录</router-link>
        </van-row>
      </template>
    </div>

  </div>
</template>

<script>
import { factory, form } from "@/build";
import Fingerprint from "@/vendor/scripts/fingerprint";
import TelArea from "@/views/login-manager/global-phone/area-code";
import PasswordInput from "@/components/password-input/index";
import { userLoginSecurity } from "@/services/api/user";
export default {
  name: "register-modal",

  mixins: [factory, form],

  components: {
    PasswordInput,
  },

  data() {
    return {
      form: {
        username: "",
        imgCode: "",
        password: "",
        uuid: new Fingerprint().get()
      }
    };
  },
  methods: {
    register() {
      if (
        factory.getValidator("username")(this.form["username"]) &&
        factory.getValidator("password")(this.form["password"]) &&
        factory.getValidator("imgcode")(this.form["imgCode"])
      ) {
        this.doSave({ action: "saveForm" });
      }
    },
  },
  mounted() {
    this.bindSave(types.REGISTER, "saveForm", "form", {
      beforeSend: data => {
        return data;
      },
      callback: ([result, data]) => {
        if (!result) {
          this.$refs.validateImg.change();
          this.$notify(data.message);
        } else {
          this.$router.push({
            name: "registerAccountSetnickname",
            query: { username: this.form["username"] }
          });
        }
      }
    });
  }
};
</script>


<style lang="scss" scoped>
@include b(main-container) {
  @include e(banner) {
    height: 127px;
    margin-bottom: 26px;
    @include utils-bg(url("./bg.png") no-repeat, 100% 100%);
  }
  @include e(main) {
    padding: $--main-login-form-padding;
  }
  @include b(account-footer) {
    margin-top: 10px;
    color: #1e5adc;
    font-size: 14px;
    font-family: "PingFangSC-Regular";
    font-weight: 400;
  }
}
</style>
