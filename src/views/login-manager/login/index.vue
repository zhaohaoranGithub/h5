<template>
  <div class="main-container login-container">

    <div class="main-container__main">
       <div class="main-container__logo"></div>
      <mobile-login v-if="currentLoginType === 'mobile'"></mobile-login>

      <account-login v-else-if="currentLoginType === 'account'"></account-login>

      <!-- <el-row class="main-container__links" type="flex" justify="space-between">
        <router-link :to="{name: 'forget-password'}" class="main-container__link">
          <svg-icon icon-class="arrow-right" type="primary" :stroke="true" :reverse="true"></svg-icon>
          忘记密码？
        </router-link>
        <router-link :to="{name: 'register'}" class="main-container__link">
          去注册
          <svg-icon icon-class="arrow-right" type="primary" :stroke="true"></svg-icon>
        </router-link>
      </el-row> -->
      <van-row class="account-login-brief" type="flex" justify="space-between">
        <van-col span="12" @click.native="change('mobile')" v-if="currentLoginType!='mobile'">
          手机号快捷登录
        </van-col>
        <van-col :span="currentLoginType=='mobile'?24:12" @click.native="change('account')" v-else>
          账号密码登录
        </van-col>
        <van-col span="12" v-if="currentLoginType!='mobile'">
          <router-link tag="span" :to="{name: 'registerAccount'}">还没账号,立即注册</router-link></van-col>
      </van-row>
    </div>

  </div>
</template>

<script>
import MobileLogin from "./mobile-login";
import AccountLogin from "./account-login";
import CustomerService from "@/components/customer-service/index";
import { logout} from '@/utils/auth';

export default {
  name: "login-view",

  components: {
    CustomerService,
    MobileLogin,
    AccountLogin
  },
  computed: {
    ...mapGetters(["getMobileLogin"])
  },
  methods: {
    change(name) {
      this.currentLoginType = name;
      if (name == 'account') {
        this.$store.commit(types.SET_MOBILELOGIN, false);
      }
    },
  },
  data() {
    return {
      currentLoginType: "account"
    };
  },
  mounted(){
    this.currentLoginType = this.getMobileLogin === true ? 'mobile' : 'account';
    logout();//android手机无法及时清除token,导致登陆后cookie中的失效token还在生效
  }
};
</script>
<style lang="scss" scoped>

.login-customer-service__size {
  width: 18px;
  height: 18px;
}
@include b(main-container) {
  @include e(logo) {
    width: 244px;
    height: 34px;
    @include utils-bg(url("./logo.png") no-repeat top, contain);
    margin-bottom: 40px;
  }
  padding-top: 41px;
  @include e(main) {
    padding: $--main-login-form-padding;
    @include b(account-login-brief) {
      margin-top: 25px;
      align-items: center;
      opacity: 0.8;
      color: rgba(76, 76, 76, 1);
      font-size: 14px;
      font-family: "PingFangSC-Regular";
      .van-col {
        &:nth-child(2) {
          text-align: right;
        }
      }
    }
  }
}
</style>

