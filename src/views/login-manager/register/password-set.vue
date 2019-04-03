<template>
  <div class="main-container">

    <div class="main-container__main">
      <div class="main-container__form-title">设置密码</div>
      <van-cell-group>
        <password-input v-model='form.password' placeholder="请输入密码"></password-input>
      </van-cell-group>
      <van-cell-group>
        <password-input v-model='form.ValidaPassword' placeholder="请确认您的密码"></password-input>
      </van-cell-group>
      <van-row type="flex" justify="center" class="account-button">
        <van-button type="primary" block shadow native-type="submit" @click="register">完成</van-button>
      </van-row>
    </div>
  </div>
</template>


<script>
import { factory, form } from "@/build";
export default {
  name: "set-pass",
  mixins: [factory, form],
  data() {
    return {
      form: {
        username: "",
        imgCode: "",
        password: "",
        ValidaPassword: "",
        uuid: ""
      }
    };
  },
  created() {
    const { username, imgCode, uuid } = this.$route.query;
    this.form["username"] = username;
    this.form["imgCode"] = imgCode;
    this.form["uuid"] = uuid;
  },
  methods: {
    register() {
      if (factory.getValidator("password")(this.form["password"])) {
        if (this.form["password"] !== this.form["ValidaPassword"]) {
          this.$notify("两次密码输入不一致!");
        } else {
          this.doSave({ action: "saveForm" });
        }
      }
    }
  },
  mounted() {
    this.bindSave(types.REGISTER, "saveForm", "form", {
      beforeSend: data => {
        return data;
      },
      callback: ([result, data]) => {
        if (!result) {
          this.$notify(data.message);
          this.$router.push("/register/account");
        } else {
          this.$router.push({ name: "registerAccountSetnickname",query:{username:this.$route.query.username} });
        }
      }
    });
  }
};
</script>


<style lang="scss" scoped>
@include b(main-container) {
  @include e(main) {
    padding: $--main-login-form-padding;
  }
  @include e(form-title) {
    color: #000000;
    font-size: 18px;
    font-weight: 500;
    font-family: $--main-font-family--Medium;
    margin-bottom: 25px;
    margin-top: 36px;
  }
}
</style>
