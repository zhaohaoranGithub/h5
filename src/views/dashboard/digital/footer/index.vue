<template>
  <div class="digital-footer">
    <div class="digital-footer__main">
      <div class="digital-footer__main-l">
        <div class="digital-footer__brief-icon"></div>
        <div class="digital-footer__brief-text">PT钱包</div>
        <div class="digital-footer__money">￥{{pTbalance}}</div>
      </div>
      <router-link tag="div" :to='{name:"fund-transfer"}' class="digital-footer__button">转账</router-link>
    </div>
  </div>
</template>


<script>
export default {
  name: "digital-nav-footer",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      channelWallet: state => state.balance.channelWallet
    }),
    pTbalance() {
      return _.find(this.channelWallet, { channelId: consts.PT }).balance;
    }
  }
};
</script>


<style lang="scss" scoped>
@include b(digital-footer) {
  width: 100%;
  height: 49px;
  position: fixed;
  bottom: 0;
  left: 0;
  background: white;
  box-shadow: 0px 0px 0px 0px rgba(204, 204, 204, 1);
  @include e(main) {
    padding: 0 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }
  @include e(main-l) {
    width: 60%;
    display: flex;
    align-items: center;
  }
  @include e(brief-icon) {
    width: 24px;
    height: 19px;
    @include utils-bg(url(./icon.png) no-repeat no-repeat, contain);
  }
  @include e(brief-text) {
    color: #333333;
    font-size: 15px;
    font-family: $--main-font-family;
    margin-left: 4px;
    margin-right: 12px;
  }

  @include e(money) {
    color: #e5142e;
    font-size: 12px;
    font-family: Helvetica;
  }

  @include e(button) {
    width: 48px;
    height: 28px;
    text-align: center;
    line-height: 28px;
    border-radius: 5px;
    background: $--main-color;
    font-family: $--main-font-family--Regular;
    font-size: 13px;
    color: white;
  }
}
</style>
