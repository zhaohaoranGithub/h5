<template>
  <div class="global-bank-change">
    <div class="global-bank-change__row">
      <div class="global-bank-change__cell">换卡支付方式</div>
      <div class="global-bank-change__cell global-bank-change__cell--main">{{iBankInfo.payment}}</div>
      <div class="global-bank-change__cell"></div>
    </div>
    <div class="global-bank-change__row global-bank-change__row--primary">
      <div class="global-bank-change__cell">新收款银行卡</div>
      <div class="global-bank-change__cell global-bank-change__cell--main">{{iBankInfo.newBankName}}</div>
      <div class="global-bank-change__cell">收款人姓名：{{iBankInfo.newUsername}}</div>
    </div>
    <div class="global-bank-change__row">
      <div class="global-bank-change__cell">原收款银行卡</div>
      <div class="global-bank-change__cell global-bank-change__cell--main">{{iBankInfo.bankName}}</div>
      <div class="global-bank-change__cell">原收款人姓名：{{iBankInfo.username}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "global-activity-bank-change",

    props: {
      bankInfo: {
        type: String,
        required: true,
      }
    },

    computed: {
      iBankInfo() {
        return JSON.parse(this.bankInfo);
      }
    },
  };
</script>

<style lang="scss" scoped>
  $--width: 764px !default;
  @include b(global-bank-change) {
    width: $--width;
    margin: 0 auto;
    border-radius: $--border-radius-small;
    background-color: #f8f8f8;
    display: flex;
    flex-flow: column;
    padding: 30px 150px;
    box-sizing: border-box;
    overflow-y: hidden;
    @include e(row) {
      display: flex;
      align-items: center;
      margin-bottom: 30px;

      &:last-of-type {
        margin-bottom: 0;
      }

      @include m(primary) {
        @include e(cell) {
          color: $--color-primary;
        }
      }
    }
    @include e(cell) {
      color: #2c2c2c;
      font-weight: bold;
      flex: 1 0 0;

      @include m(main) {
        font-size: 24px;
      }

    }
  }

</style>