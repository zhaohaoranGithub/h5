<template>
    <div class="main-recharge">
        <van-col span='6' class="main-racharge-cell">
            <div class="main-recharge-cell__pic"  @click="gotoRecharge">
                <img src="./pic-1.png" alt="">
            </div>
            <div class="main-recharge-cell__footer">充值</div>
        </van-col>
        <van-col span='6' class="main-racharge-cell" @click.native="$router.push({name:'fund-transfer'})">
            <div class="main-recharge-cell__pic">
                <img src="./pic-2.png" alt="">
            </div>
            <div class="main-recharge-cell__footer">转账</div>
        </van-col>
        <van-col span='6' class="main-racharge-cell" @click.native="goTo('withdrawManager')">
            <div class="main-recharge-cell__pic">
                <img src="./pic-3.png" alt="">
            </div>
            <div class="main-recharge-cell__footer">提现</div>
        </van-col>
        <van-col span='6' class="main-racharge-cell">
            <div class="main-recharge-cell__pic" @click="goTo('/mc/br')">
                <img src="./pic-4.png" alt="">
            </div>
            <div class="main-recharge-cell__footer" @click="goTo('/mc/br')">投注记录</div>
        </van-col>
      <van-dialog type="warn" v-model="dialogShow" closed>
        <warning-dialog >
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
  import {getWithdrawInfo} from '@/services/api/finance';
  import {form,gotoRecharge} from '@/build';
  import {getRechargeStatus} from '@/services/api/finance';
  export default {
  mixins: [form,gotoRecharge],
  data(){
    return {
      leftAmount: '',
      rechargeStatus:null,
      dialogShow: false,
      withdrawCheck: false
    };
  },
  computed: {
    ...mapState({
      user: state => state.user,
    }),
  },
  methods: {
    goTo(routeName){
      if(routeName === 'withdrawManager') {
        if (this.user.telephone) {
          if (this.withdrawCheck) {
            this.$router.push({
              name: 'withdrawWarning',
              query: {
                leftAmount: this.leftAmount
              }
            });
          } else {
            this.$router.push({name:routeName});
          }
        } else {
          this.dialogShow = true;
        }
      } else {
        this.$router.push({path:routeName});
      }
    },
  },
  mounted(){
    this.bindGet(getWithdrawInfo, 'withdrawInfo', {
      action: 'getWithdrawInfo',
      format: data => {
        if(data.leftAmount > 0) {
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
@include b(main-recharge) {
  height: 108px;
  margin-bottom: 15px;
  box-shadow: 0px 15px 25px 12px rgba(235, 235, 235, 0.6);
  border-radius: 8px;
  @include b(main-racharge-cell) {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;

    @include b(main-recharge-cell__footer) {
      font-size: 14px;
      font-family: "PingFangSC-Regular";
      font-weight: 400;
      color: #333333;
      margin-top: 12px;
    }

    @include b(main-recharge-cell__pic) {
      width: 36px;
      height: 36px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
