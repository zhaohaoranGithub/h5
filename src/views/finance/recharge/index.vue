<template>
  <div class="recharge-wrap">
    <van-tabs v-model="type" color="#1e5adc" v-if="rechargeData && rechargeData.large && rechargeData.large.paymentList.length > 0" >
      <van-tab title="普通存款"></van-tab>
      <van-tab title="大额快速存款"></van-tab>
    </van-tabs>
    <div class="recharge">
      <recharge-swiper class="recharge__activity"></recharge-swiper>
      <div class="recharge-amount">
        <div class="recharge-amount__center-pack">
          <span class="recharge-amount__center-pack-title">中心钱包</span>
          <span class="recharge-amount__center-pack-amount">{{balance | currency}}元</span>
        </div>
        <div class="recharge-amount__title">充值的金额</div>
        <div class="recharge-amount__quick-amount">
          <div class="recharge-amount__button-group" v-if="rechargeList">
            <button
              :key="item"
              v-for="item in rechargeList.commonKeyAmount"
              class="recharge-amount__quick-button"
              @click="amount = item"
              :class="amount === item ? 'active' :''"
            >{{item}}{{type === 0 ? '元' : ''}}</button>
          </div>
          <div class="recharge-amount__amount-input">
            <input type="tel" v-model.number="amount" placeholder="请输入充值金额" pattern="[0-9]*" maxlength="11">
          </div>
          <div class="recharge-amount__confirm-button" @click="nextStep">
            <button>确定</button>
          </div>
        </div>
        <div v-if="rechargeStatus">
            <has-recharge-order-dialog
            :rechargeStatus="rechargeStatus"
            :warningStatus="warningStatus"
            @closeRechargeOrder="closeRechargeOrder"
            @showResetDialog="showResetDialog"
            > </has-recharge-order-dialog>
            <reset-recharge-dialog
            :rechargeStatus="rechargeStatus"
            :warningStatus="resetDialog"
            @cancel="closeResetDialog"
          ></reset-recharge-dialog>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import RechargeSwiper from "@/views/finance/recharge/recharge-swiper";
import ResetRechargeDialog from "@/views/finance/recharge/reset-recharge-dialog";
import HasRechargeOrderDialog from "@/views/finance/recharge/has-recharge-order";
import { getRechargeList, getRechargeStatus } from "@/services/api/finance";
import { factory, form, capitalOperation } from "@/build";
export default {
  name: "finance-recharge",
  mixins: [form, factory, capitalOperation],
  data() {
    return {
      rechargeData:undefined,
      amount: "",
      type: 0,
      rechargeStatus: null,
      warningStatus: false,
      resetDialog: false,
    };
  },
  components: { RechargeSwiper,HasRechargeOrderDialog,ResetRechargeDialog },
  computed: {
    rechargeList(){
      if(this.rechargeData){
        return Number(this.type) === 0 ? this.rechargeData.common : this.rechargeData.large
      }
    },
    maxAmount(){
      return this.rechargeList ? _.max(this.rechargeList.commonKeyAmount) : 0;
    },
    minAmount(){
      return this.rechargeList ? _.min(this.rechargeList.commonKeyAmount) : 0;
    },
    ...mapState({
      balance: state => state.user.balance
    })
  },
  watch: {
    type(val){
      if(val === 0){
        const randomAmountIndex=Math.floor(Math.random()*5+1);
        this.amount = this.rechargeList.commonKeyAmount[randomAmountIndex-1];
      }else{
        this.amount = '';
      }
    }
  },
  mounted() {
    this.bindGet(getRechargeList, "rechargeData", {
      action: "getRechargeList",
      format:(data) => {
        let randomNum=Math.floor(Math.random()*5);
        let randomAmountIndex=Math.floor(Math.random()*5+1);
        data.common.commonKeyAmount=_.map(data.common.commonKeyAmount,function(val){return val-randomNum});
        this.amount=data.common.commonKeyAmount[randomAmountIndex-1];
        return data
      },
    });
    this.bindGet(getRechargeStatus, "rechargeStatus", {
      action: "getStatus",
      afterSuccess: ([result, data]) => {
        if (result) {
          this.warningStatus =
            data &&
            [
              consts.PAY_UNION_SCAN_PAY,
              consts.PAY_WANGYIN,
              consts.PAY_QUICK_PAY,
              consts.PAY_ZHIFUBAO
            ].indexOf(data.paymentId) > -1
              ? true
              : false;
        }
      }
    });
    this.doAction({ type: "get", action: "getStatus" });
    this.doAction({ type: "get", action: "getRechargeList" });
  },
  methods: {
    closeRechargeOrder(){
      this.warningStatus = false;
    },
    formatAmount(amount){
      if(Number(amount) > 10000 && this.type === 1 && Number(amount)%10000 === 0){
        return Number(amount)/10000 + '万'
      }else{
        return amount
      }
    },
    showResetDialog() {
      this.warningStatus = false;
      this.resetDialog = true;
    },
    closeResetDialog() {
      this.resetDialog = false;
    },
    nextStep() {
      if (
        this.rechargeStatus &&
        [
          consts.PAY_UNION_SCAN_PAY,
          consts.PAY_WANGYIN,
          consts.PAY_QUICK_PAY,
          consts.PAY_ZHIFUBAO,
          consts.PAY_ZHIFUBAO_ZHUANZ
        ].indexOf(this.rechargeStatus.paymentId) > -1
      ) {
        this.warningStatus = true;
        return false;
      }
      if (this.checkAmount(this.amount)) {
        this.$router.push({ path: "/fund/recharge-type" ,query:{rechargeAmount:this.amount,type:this.type}});
      }
    },
    checkAmount(value) {
      const reg = /^\d+$/;
      if (value === "" || Number(value) <= 0) {
        this.$toast("请输入有效的充值金额");
        return false;
      } else if (!reg.test(value)) {
        this.$toast('充值金额应为正整数');
        return false;
      }
      return true;
    }
  }
};
</script>
<style lang="scss" scoped>
$--button-height: 44px;
$--button-width: 72px;
$--input-width: 306px;

@include b(recharge-wrap){
   background: $--background-color-base;
   position: absolute;
   top: 44px;
   bottom:0;
   left:0;
   right: 0;
   margin: auto;
}
@include b(recharge-tip){
  background: $--background-color-base;
  padding: 0px 16px 12px 16px;
}
@include b(recharge) {
  background: $--background-color-base;
  padding: 12px 16px;
  @include b(recharge-amount) {
    background: $--color-white;
    padding: 19px;
    border-radius: 12px;
    @include e(center-pack) {
      font-size: $--font-size-base;
      @include e(center-pack-title) {
        color: $--color-text-secondary;
        margin-right: 10px;
      }
      @include e(center-pack-amount) {
        font-size: $--font-size-base;
        color: $--color-black;
      }
    }
    @include e(title) {
      font-weight: bold;
      font-size: $--font-size-x-large;
      padding: 11px 0;
    }
    @include e(quick-amount) {
      @include e(button-group) {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        @include e(quick-button) {
          width: $--button-width;
          height: $--button-height;
          border-radius: 3px;
          background-color: rgba(255, 255, 255, 1);
          box-shadow: 0px 5px 8px 0px rgba(71, 71, 71, 0.1);
          border: 1px solid rgba(240, 240, 240, 1);
          text-align: center;
          line-height: $--button-height;
          font-size: 13px;
          color: $--color-gray-4;
          margin-bottom: 10px;
          &.active {
            background-color: rgba(30, 90, 220, 1);
            box-shadow: 0px 2px 7px 0px rgba(22, 32, 106, 0.35);
            color: $--color-white;
            border: none;
          }
        }
      }
    }
    @include e(amount-input) {
      input {
        width: 93%;
        height: $--button-height;
        line-height: $--button-height;
        padding-left: 20px;
        border-radius: 5px;
        background-color: rgba(245, 246, 247, 1);
        border: none;
        font-size: 24px;
        &::placeholder{
          font-size:14px;
          transform: translate(0, -3px);
          vertical-align: middle;
        }
        /*&::-webkit-input-placeholder{
          font-size:14px;
          transform: translate(0, -5px);
        }
        &:-moz-placeholder{
          font-size:14px;
          transform: translate(0, -5px);
        }
        &::-moz-placeholder{
          font-size:14px;
          transform: translate(0, -5px);
        }
        &::-ms-input-placeholder{
          font-size:14px;
          transform: translate(0, -5px);
        }*/
      }
    }
    @include e(confirm-button) {
      button {
        width: $--input-width;
        height: 50px;
        border-radius: 5px;
        background-color: rgba(30, 90, 220, 1);
        text-align: center;
        box-shadow: 0px 4px 10px 0px rgba(30, 90, 220, 0.5);
        border: none;
        color: $--color-white;
        font-size: $--font-size-x-large;
        text-align: center;
        line-height: 50px;
        margin-top: 20px;
      }
    }
  }

}
</style>


