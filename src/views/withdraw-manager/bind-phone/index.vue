<template>
  <div class="phone-container">
    <div class="phone-container__tips">为了保证您的账号和资金安全，请绑定常用手机号</div>
    <van-cell-group>
      <van-field clearable v-model='form.mobile' placeholder="请输入手机号">
        <template slot="left-icon">
          <div class="phone-container__title">手机号</div>
        </template>
        <template slot="left-icon">
          <tel-area></tel-area>
        </template>
      </van-field>
    </van-cell-group>
    <van-cell-group>
      <van-field clearable v-model='form.code' placeholder="请输入手机验证码">
        <template slot="left-icon">
          <div class="phone-container__title">验证码</div>
        </template>
        <template slot="icon">
          <span class="phone-container__code" @click="send">{{codeBtnText}}</span>
        </template>
      </van-field>
    </van-cell-group>
    <van-row type="flex" justify="center" class="account-button">
      <van-button :disabled="disabled"  type="primary" block shadow  native-type="submit" @click="submit">确定</van-button>
    </van-row>

    <!-- </form> -->
  </div>

</template>

<script>

  import {factory,form, getCode} from '@/build';
  import {
    bindUserMobile as saveApi,
    getValidateCode as codeApi
  } from "@/services/api/user";
  import types from "@/store/mutation-types";
  import TelArea from "@/views/login-manager/global-phone/area-code";
  export default {
    name: "bind-phone",

    mixins: [form, getCode,factory],
    components: {
      TelArea
    },
    data() {
      return {
        disabled: true,
        codeApi,
        form:{
          mobile: undefined,
          code: undefined,
          type: consts.CODE_MOBILE_BIND,
          telArea: ''
        },

      };
    },
    computed: {
      ...mapGetters(["telArea"])
    },
    methods:{
      send() {
        if(factory.getValidator('mobile')(this.form.mobile)){
          this.sendCode(this.form.mobile);
          this.disabled = false;
        }

      },
      submit(){
        if(!factory.getValidator('mobile')(this.form.mobile)){
          return;
        }else if(_.isEmpty(this.form.code)||_.isUndefined(this.form.code)){
          this.$toast('请输入验证码');
          return;
        }else{
          if (factory.getValidator('mobilecode')(this.form.code)) {
            this.doSave({action: 'saveForm'});
          }
        }
      }
    },
    mounted() {
      this.form.telArea = this.telArea.substr(1);
      this.bindSave(saveApi, 'saveForm', 'form', {
        beforeSend: (data) => {
          return data;
        },
        callback: ([result, data]) => {
          if (!result) {
            this.$toast(data.message);
          } else {
            this.$toast('手机绑定成功');
            this.$store.dispatch(types.OAUTH);
            this.$store.dispatch(types.GET_SECURITY);
            this.$router.go(-1);
            // this.$router.push({
            //   name: 'withdrawManager'
            // });
          }
        }
      });
    }
  };
</script>


<style lang="scss" scoped>
  @include b(phone-container) {
    padding: 10px 20px;
    @include e(tips) {
      padding: 0px 10px;
      height: 30px;
      line-height: 30px;
      color: #b3b3b3;
    };
    .van-cell-group {
      display: flex;
      align-items: center;
    }
    .van-cell__value--alone {
      padding-left: 0;
    }
    @include e(title) {
      width: 48px;
    }
    @include e(code) {
      color: #1e5adc;
    }
    @include b(account-button) {
      margin-top: 20px;
    }

  }
</style>

