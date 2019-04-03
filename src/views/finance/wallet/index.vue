<template>
  <div class="wallet">
    <div class="wallet__main">
      <div class="wallet-top">
        <div class="wallet-top__left">
          <div class="wallet-top__brief">中心钱包</div>
          <div class="wallet-top__money">￥
            <span>{{balance}}元</span>
            <i @click="updateAllBalance" :class="{'animate':refresh}"></i>
          </div>
        </div>
        <div class="wallet-top__right" @click="onRecycle">
          一键回收
        </div>
      </div>
      <van-row type='flex' justify="space-between" class="wallet-handle">
        <van-col span='10' class="wallet-handle__button" @click.native='$router.push({name:"recharge"})'>充值</van-col>
        <van-col span='10' class="wallet-handle__button" @click.native='telephone!=="" ? toWithdraw() : dialogShow=true'>提现</van-col>
      </van-row>
    </div>

    <wallet-cell></wallet-cell>

    <van-dialog type="warn" v-model="dialogShow" closed v-if='dialogShow'>
      <warning-dialog>
        <template slot="title">
          绑定手机号
        </template>
        <template slot="brief">
          为了您的金钱安全，请先绑定您的手机号码，再进行提现操作
        </template>
        <template slot="button">
          <span @click="$router.push({name:'bindPhone'})">确定</span>
        </template>
      </warning-dialog>
    </van-dialog>
  </div>
</template>


<script>
import walletCell from "../transfers/transfer-auto/cell.vue";
import { updateBalance } from "@/build";
import {getWithdrawInfo} from '@/services/api/finance';
import getCommand from '@/mixins/get-command';
export default {
  data() {
    return {
      refresh: false,
      dialogShow: false,
      withdrawCheck:false,
      leftAmount:'',
    };
  },
  mixins: [updateBalance, getCommand],
  methods: {
    reload() {
      this.refresh = true;

      setTimeout(() => {
        this.refresh = false;
      }, 1500);
    },
    updateAllBalance() {
      this.updateBalance(true);
      this.$store.dispatch(types.GET_ALL_BALANCE);

      this.reload();
    },
    async onRecycle() {
      const [result, data] = await this.$store.dispatch(
        types.TRANSFER_IN_CHANNEL,
        {
          toChannelId: 0
        }
      );

      this.$toast({
        message: data.message
      });

      this.updateBalance();
      this.$store.dispatch(types.GET_ALL_BALANCE);
    },
    toWithdraw(){
      if(this.withdrawCheck){
        this.$router.push({
          name: 'withdrawWarning',
          query: {
            leftAmount: this.leftAmount
    }
        });
      }else{
        this.$router.push({name:"withdrawManager"});
      }
    },
  },
  computed: {
    ...mapState({
      balance: state => state.user.balance.toFixed(2),
      telephone: state => state.user.telephone
    })
  },
  components: { walletCell },
  mounted(){
    this.bindGet(getWithdrawInfo, 'withdrawInfo', {
      action: 'getWithdrawInfo',
      format: data => {
        if (data.leftAmount > 0) {
          this.withdrawCheck = true;
          this.leftAmount = data.leftAmount;
        }
        this.$store.commit(types.SET_WITHDRAW_INFO, data);
      }
    });
    this.doGet({action: 'getWithdrawInfo'});
  }
};
</script>


<style lang="scss" scoped>
@keyframes refresh {
  0% {
    transform: rotate(0);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@include b(wallet) {
  padding: $--main-padding;

  @include e(main) {
    width: 100%;
    height: 200px;
    @include utils-bg(url("./bg.png") no-repeat top, cover);
    // padding: 15px 0px;
    border-radius: 6px;
    margin: 15px 0;

    @include b(wallet-top) {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 15px;
      padding-top: 15px;
      @include e(brief) {
        font-size: 14px;
        font-family: $--main-font-family--Regular;
        color: white;
      }

      @include e(money) {
        color: rgba(255, 255, 255, 1);
        font-size: 12px;
        font-family: $--main-font-family;
        display: flex;
        align-items: center;
        span {
          font-size: 20px;
        }
        i {
          display: inline-block;
          height: 22px;
          width: 22px;
          vertical-align: middle;
          margin-left: 9px;
          @include utils-bg(url("./load.png") no-repeat top, contain);
          &.animate {
            animation: refresh 2s linear infinite 0.1s;
          }
        }
      }

      @include e(right) {
        width: 82px;
        height: 28.33px;
        border-radius: 4px;
        background-color: rgba(30, 90, 220, 1);
        line-height: 28.33px;
        text-align: center;
        color: rgba(255, 255, 255, 1);
        font-size: 14px;
        font-family: $--main-font-family--Regular;
      }
    }
    @include b(wallet-handle) {
      padding: 0 20px;
      margin-top: 66px;
      @include e(button) {
        width: 148px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        border-radius: 4px;
        border: 0.5px solid rgba(255, 255, 255, 1);
        left: 87px;
        color: rgba(255, 255, 255, 1);
        font-size: 14px;
        font-family: $--main-font-family--Regular;
      }
    }
  }
}
</style>
