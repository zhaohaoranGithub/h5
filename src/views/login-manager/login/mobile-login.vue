<template>
  <div class="mobile-login">
    <!-- <form @submit.native.prevent="doSave({action: 'saveForm',})"> -->
    <van-cell-group>
      <van-field clearable type='tel' v-model='form.mobile' placeholder="请输入手机号">
        <template slot="left-icon">
          <svg-icon icon-class="login-phone" type='info' size='small'></svg-icon>
        </template>
        <template slot="left-icon">
          <tel-area></tel-area>
        </template>
      </van-field>
    </van-cell-group>
    <van-cell-group>
      <van-field clearable v-model='form.code' placeholder="请输入手机验证码">
        <template slot="left-icon">
          <svg-icon icon-class="login-security" type='info' size='small'></svg-icon>
        </template>
        <template slot="icon">
          <span @click="sendCode(form.mobile,true)">{{codeBtnText}}</span>
        </template>
      </van-field>
    </van-cell-group>
    <van-row type="flex" justify="center" class="account-login-button">
      <van-button type="primary" block shadow native-type="submit" @click="login">登录</van-button>
    </van-row>

    <!-- </form> -->
  </div>

</template>

<script>
import { factory, form, getCode } from "@/build";

import { getMobileLoginCodeApi as codeApi } from "@/services/api/user";
import TelArea from "@/views/login-manager/global-phone/area-code";
export default {
  name: "mobile-login",

  mixins: [form, getCode, factory],
  components: {
    TelArea
  },

  data() {
    return {
      codeApi,
      form: {
        mobile: "",
        code: "",
        telArea: "",
      }
    };
  },

  computed: {
    ...mapGetters(["telArea"])
  },
  methods: {
    login() {
      if (
        factory.getValidator("mobile")(this.form.mobile) &&
        factory.getValidator("mobilecode")(this.form["code"])
      ) {
        this.doSave({ action: "saveForm" });
      }
    }
  },
  mounted() {
    this.form.telArea = this.telArea.substr(1);
    this.bindSave(types.MOBILE_LOGIN, "saveForm", "form", {
      beforeSend: data => {
        return data;
      },
      callback: ({ result, data }) => {
        if (!result) {
          this.$toast(data.message);
        } else {
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
@include b(account-login-button) {
  margin-top: 41px;
}
</style>

