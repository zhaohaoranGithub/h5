<template>
<div class="recharge-status">
  <div class="recharge-status__header">
    <div class="recharge-status__header-title">
      充值申请已提交
    </div>
    <div class="recharge-status__header-brief">
      请<span class="text-primary">30分钟</span>内完成支付
    </div>
    <div class="text-danger recharge-status__warning"> <van-icon name="info" class="recharge-status__warning-icon text-danger"/>  提醒您付款账户已更改，请不要保存旧账户。请检查充值，避免资金损失。</div>
  </div>
  <div class="recharge-status__info recharge-status__info-transfer" v-if="[consts.PAY_BANKCARD_ZHUANZ, consts.PAY_WEIXIN_ZHUANZ].indexOf(rechargeStatus.paymentId) !== -1">
    <div class="recharge-status__info-item">
      <div class="recharge-status__info-title">
        收款卡信息
      </div>
      <div class="recharge-status__info-detail">
        {{rechargeStatus.bankName}}
        <span class="recharge-status__info-clipboard-btn clipboard-btn" :data-clipboard-text="rechargeStatus.bankName" @click="clipboardHandle">复制</span>
      </div>
    </div>
    <div class="recharge-status__info-item">
      <div class="recharge-status__info-title">
        收款账户名
      </div>
      <div class="recharge-status__info-detail">
        {{rechargeStatus.merchantName}}
        <span class="recharge-status__info-clipboard-btn clipboard-btn" :data-clipboard-text="rechargeStatus.merchantName" @click="clipboardHandle">复制</span>
      </div>
    </div>
    <div class="recharge-status__info-item">
      <div class="recharge-status__info-title">
        收款账户
      </div>
      <div class="recharge-status__info-detail">
        {{rechargeStatus.merchantCode}}
        <span class="recharge-status__info-clipboard-btn clipboard-btn" :data-clipboard-text="rechargeStatus.merchantCode" @click="clipboardHandle">复制</span>
      </div>
    </div>
    <div class="recharge-status__info-item">
      <div class="recharge-status__info-title">
        充值金额
      </div>
      <div class="recharge-status__info-amount">
        ￥{{rechargeStatus.amount | currency}}
        <span class="recharge-status__info-clipboard-btn clipboard-btn" :data-clipboard-text="rechargeStatus.amount" @click="clipboardHandle">复制</span>
      </div>
    </div>
    <div class="recharge-status__info-item">
      <div class="recharge-status__info-title">
        附言
      </div>
      <div class="recharge-status__info-remark">
        {{rechargeStatus.keyword}}
        <span class="recharge-status__info-clipboard-btn clipboard-btn" :data-clipboard-text="rechargeStatus.keyword" @click="clipboardHandle">复制</span>
      </div>
    </div>
    <div class="text-danger recharge-status__warning"> <van-icon name="info" class="recharge-status__warning-icon text-danger"/>请务必带上附言，汇款金额必须与平台填写的一致。</div>
  </div>
  <div class="recharge-status__info recharge-status__info-ali" v-else-if="rechargeStatus.paymentId === consts.PAY_ZHIFUBAO_ZHUANZ">
     <div class="recharge-status__qrcode">
      <div class="recharge-status__qrcode-inner">
        <img class="recharge-status__qrcode-img" :src="rechargeStatus.merchantCode" />
      </div>
      <div class="recharge-status__qrcode-name">{{rechargeStatus.merchantName}}</div>
    </div>
    <div class="recharge-status__info-item">
      <div class="recharge-status__info-title">
        充值金额
      </div>
      <div class="recharge-status__info-amount">
        ￥{{rechargeStatus.amount | currency}}
        <span class="recharge-status__info-clipboard-btn clipboard-btn" :data-clipboard-text="rechargeStatus.amount" @click="clipboardHandle">复制</span>
      </div>
    </div>
    <div class="recharge-status__info-item">
      <div class="recharge-status__info-title">
        附言
      </div>
      <div class="recharge-status__info-remark">
        {{rechargeStatus.keyword}}
        <span class="recharge-status__info-clipboard-btn clipboard-btn" :data-clipboard-text="rechargeStatus.keyword"  @click="clipboardHandle">复制</span>
      </div>
    </div>
  </div>
  <div class="recharge-status__footer">
    <router-link :to="{path:'/'}">   
      <van-button
          block
          type="primary"
        >
          确定
        </van-button>
    </router-link>

      <span @click="warningStatus = true" class="recharge-status__footer-reset text-primary">撤销充值申请</span>
  </div>
  <reset-recharge-dialog :rechargeStatus="rechargeStatus" :warningStatus="warningStatus" @cancel="close"></reset-recharge-dialog>
</div>
</template>
<script>
  import {doRechargeCancel,getRechargeStatus} from '@/services/api/finance';
  import {form} from '@/build';
  import resetRechargeDialog from "@/views/finance/recharge/reset-recharge-dialog";
import { setTimeout } from 'timers';
export default {
  name:"recharge-status",
  components:{
    resetRechargeDialog
  },
  mixins: [form],
  data(){
    return {
      warningStatus:false,
      timer: undefined,
      rechargeStatus:{paymentId:1},
    }
  },
  computed: {
    postscript() {
      // return this.rechargeStatus.keyword.split('||')[1] || '';
      return this.rechargeStatus.keyword || '';
    },
  },
  methods: {
    close(){
      this.warningStatus=false;
    },
    clipboardHandle(){
      this.$toast.success('复制成功');
    },
  },
  mounted() {
    this.timer = setInterval(() => {
      this.doGet({ action: "getStatus" });
    }, 3000);

    this.bindGet(getRechargeStatus, 'rechargeStatus', {
      action: 'getStatus',
      format: data => {
        localStorage.setItem("rechargeStatus",JSON.stringify(data))
        if(data === null){
          this.$router.push({path:"/"})
        }
        return data;
      }
    });
    this.doAction({type:'get',action:"getStatus"})
  },

  beforeDestroy() {
    clearInterval(this.timer);
  }
}
</script>
<style lang="scss" scoped>


@include b(recharge-status){
  background:$--background-color-base;
  padding: 12px 16px;
  @include e(footer){
    padding: 20px 0;
    text-align: center;
    @include e(footer-reset){
      font-size: 18px;
      line-height: 42px;
    }
  }
  @include e(header){
    padding: 24px 18px;
    background: $--color-white;
    border-radius: 8px;
    @include e(header-title){
      font-size: $--font-size-x-large;
      color: $--color-black;
      font-weight: bold;
    }
    @include e(header-brief){
      font-size: $--font-size-base;
      color: $--color-text-secondary;
      margin-top: 11px;
    }
  }
  @include e(warning){
    padding-top: 22px;
    @include e(warning-icon){
      font-size: $--font-size-base;
      vertical-align: middle;
    }
  }
  @include e(info){
    padding: 18px;
    background: $--color-white;
    border-radius: 8px;
    margin-top: 12px;
    @include e(info-item){
      padding-bottom: 10px;
    }
    @include e(info-title){
      font-size: $--font-size-base;
      color: $--color-text-secondary;
    }
    @include e(info-detail){
      font-size: $--font-size-base;
      color: $--color-black;
      font-weight: bold;
      line-height: 28px;
    }
    @include e(info-amount){
      font-size: 28px;
      color: $--color-primary;
      font-weight: bold;
    }
    @include e(info-remark){
      font-size: 28px;
      color: $--color-black;
      font-weight: bold;
    }
    @include e(info-clipboard-btn){
      display: inline-block;
      width: 88px;
      height: 28px;
      text-align: center;
      line-height: 28px;
      border-radius: 5px;
      background-color: $--color-primary;
      color: $--color-white;
      font-size: $--font-size-base;
      float: right;
    }
    @include e(qrcode) {
      text-align: center;
    }
     @include e(qrcode-inner) {
      display: inline-block;
      padding: 14px;
      margin-bottom: 22px;
      box-shadow:0px 13px 18px 0px rgba(0,0,0,0.05);
      border-radius: $--border-radius-medium;
    }
    @include e(qrcode-img) {
      width: 143px;
      height: 143px;
      text-align: center;
    }
    @include e(qrcode-name) {
      font-weight: bold;
    }
  }
}
</style>


