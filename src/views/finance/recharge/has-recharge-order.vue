<template>
    <van-dialog v-model="warningStatus" message-align="center" :before-close="cancel" closed>
      <warning-dialog type="warn">
        <template slot="brief">
          <div class="recharge-info">
            <div class="text-danger">您有一笔充值申请未完成，请在30分钟内完成支付</div>
            <div class="recharge-info__type recharge-info__info">充值方式：{{paymentName}}</div>
            <div class="recharge-info__amount recharge-info__info">充值金额：
              <span class="text-primary">{{rechargeStatus.amount | currency}}</span>
            </div>
            <div class="recharge-info__time recharge-info__info">充值时间：{{rechargeStatus.createDate | toTime}}</div>
          </div>
        </template>
        <template slot="button">
          <span @click="showResetDialog">撤销申请</span>
        </template>
      </warning-dialog>
    </van-dialog>
</template>
<script>
export default {
  name:"has-recharge-order-dialog",
  props:["warningStatus","rechargeStatus"],
  data(){
    return {
    }
  },
  computed:{
    paymentName() {
      return this.rechargeStatus === null ? "" : _.find(consts.PAYMENT_LIST, { value: this.rechargeStatus.paymentId }).title;
    },
  },
  methods:{
    cancel(){
      this.$emit("closeRechargeOrder")
    },
    showResetDialog() {
      this.$emit("closeRechargeOrder")
      this.$emit("showResetDialog")
    },
  }
}
</script>
<style lang="scss" scoped>
 
@include b(recharge-info) {
  padding: 20px;
  text-align: left;
  @include e(info) {
    line-height: 28px;
  }
}
@include b(footer-button){
  padding: 20px 0;
  @include e(btn){
    display: inline-block;      
    width: 114px;
    height: 40px;
    border-radius: 5px;
    background-color: $--color-primary;
    text-align: center;
    line-height: 40px;
    color: #fff;
  }
  @include e(close-btn){
    background: #fff;
    border: 1px solid $--color-primary;
    color: $--color-primary;
  }
}
</style>

