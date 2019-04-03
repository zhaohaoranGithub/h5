<template>
  <div class="warning-container">
    <div class="warning-container__box">
      <div class="warning-img"></div>
      <div class="warning-title">您暂时还不可提现</div>
      <div class="warning-text">还需要完成<span class="red">￥{{leftAmount | currency}}元</span>的投注</div>
    </div>
    <van-row type="flex" justify="center" class="account-button">
      <van-button type="primary" block shadow  native-type="submit" @click="$router.push({path: '/'})">返回首页</van-button>
    </van-row>
  </div>
</template>

<script>
  export default {
    name: "withdraw-warning",
    computed: {
      ...mapState({
        user: state => state.user
      }),
      leftAmount() {
        return this.$route.query.leftAmount;
      }
      // ...mapGetters({
      //   withdrawInfo: 'withdrawInfo'
      // })
    },
  };
</script>

<style lang="scss" scoped>
  @include b(warning-container) {
    padding: 10px 15px;
    min-height: calc(100vh - 65px);
    background-color: #f5f6f7;
    @include e(box) {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: #ffffff;
      border-radius: 6px;
      padding: 25px 0;
      .warning-img {
        width: 140px;
        height: 140px;
        @include utils-bg(url("../../../assets/error.png") no-repeat top, contain);
      }
      .warning-title {
        margin-top: 20px;
        font-size: 18px;
        font-weight: bold;
      }
      .warning-text {
        font-size: 14px;
        margin-top: 5px;
        color: #afafaf;
        .red {
          color: red;
        }
      }
    }
  }
</style>
