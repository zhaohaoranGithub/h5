<template>

  <div class="main-container">
    <div class="main-container__top">
      <div class="main-container__top-inner">
        <img src="./success.png" alt="" class="main-container__success">
        <div class="main-container__brief">恭喜您注册成功</div>
      </div>

    </div>
    <div class="main-container__bottom">
      <div class="main-container__bottom-inner">
        <avatar-select></avatar-select>
        <div class="main-container__brief">选择完善头像</div>
        <div class="main-container__nick-name">昵称</div>
        <van-cell-group>
          <van-field input-align='center' :placeholder="nickName" v-model.trim="nickName" @blur="check()"
                     class="main-container__form" style="color:#B4BDCA;font-size:14px;font-family:PingFangSC-Regular;"/>
        </van-cell-group>
      </div>
    </div>
    <div class="main-container__footer">
      <van-button type="primary" block shadow native-type="submit" @click="submit">确定</van-button>
    </div>
  </div>

</template>

<script>
  const Faker = require("@/vendor/scripts/faker");

  import {
    nicknameCheckApi as checkApi,
    nicknameApi as saveApi
  } from "@/services/api/user";

  import {factory, form} from "@/build";

  export default {
    name: "set-nickname",
    mixins: [form],

    data() {
      return {
        form: {
          nickName: this.$route.query.username
        },
        nickNameCheck: false,
        isSubmit: false,
        canClick: true,
      };
    },
    computed: {
      nickName() {
        const nickName = this.form.nickName;
        return nickName.substr(0, nickName.length - 4) + "****";
      }
    },
    methods: {
      submit() {
        if (this.canClick) {
          this.canClick = false;
          if (this.nickNameCheck) {
            this.doSave({action: "saveForm"});
          } else {
            this.isSubmit = true;
            this.doSave({action: "check"});
          }
        }
      },
      check() {
        if (factory.getValidator("nickName")(this.form["nickName"])) {
          this.doSave({action: "check"});
        }
      }
    },

    mounted() {
      this.bindSave(checkApi, "check", "form", {
        beforeSend: data => {
          return data;
        },
        callback: ([result, data]) => {
          this.canClick = true;
          if (!result) {
            this.$notify(data.message);
          } else {
            this.nickNameCheck = true;
            if (this.isSubmit) {
              this.submit();
            }
          }
        },
        afterFail:() => {
          this.canClick = true;
        }
      });
      this.bindSave(saveApi, "saveForm", "form", {
        beforeSend: data => {
          return data;
        },
        callback: ([result, data]) => {
          this.canClick = true;
          if (!result) {
            this.$notify(data.message);
          } else {
            this.$notify({
              message: "注册成功",
              type: "success"
            });
            this.$store.dispatch(types.OAUTH);
            this.$router.replace(this.$route.query.redirect || {name: "home"});
          }
        },
        afterFail:() => {
          this.canClick = true;
        }
      });
    },

    beforeDestroy() {
      this.$store.dispatch(types.OAUTH);
    }
  };
</script>

<style lang="scss" scoped>
  @include b(main-container) {
    padding-top: 27px;
    @include e(top) {
      padding: 0 26px;
    }
    @include e(bottom) {
      padding: 33px 46px 0px 46px;
    }
    @include e(bottom-inner) {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-flow: column;
      padding-bottom: 30px;
    }
    @include e(success) {
      width: 72px;
      height: 72px;
    }
    @include e(form) {
      width: 283px;
    }
    @include e(footer) {
      @include main-center(290px);
      padding-bottom: 27px;
    }
    @include e(nick-name) {
      color: black;
      font-size: 14px;
      font-family: "PingFangSC-Regular";
      font-weight: 400;
    }
    @include e(top-inner) {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-flow: column;
      border-bottom: 2px dashed #e8eaec;
    }
    @include e(brief) {
      font-size: 24px;
      color: #425062;
      margin-top: 22px;
      font-family: $--main-font-family--Medium;
      margin-bottom: 30px;
    }
  }
</style>
