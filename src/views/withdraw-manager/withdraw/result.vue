<template>
  <div class="withdraw-result-container">
    <div class="withdraw-result-container__step">
      <div class="step-title">您的提现申请已经提交成功</div>
      <div class="step-time">
        <span class="step-time-text">预计本次提现耗时</span>
        <span class="step-time-num">0{{m}}</span>
        <span class="step-time-symbol">:</span>
        <span class="step-time-num">{{s>9?s:'0'+s}}</span>
      </div>
      <div class="step-box">
        <div class="step-box-line"></div>
        <div class="step-box-item done">
          <span class="item-img"></span>
          <span class="item-text">提交</span>
        </div>
        <!--<div class="step-box-item" :class="currentStep === 0 ? 'doing':'done'">-->
          <!--<div class="item-img" ></div>-->
          <!--<span class="item-text">风控状态</span>-->
        <!--</div>-->
        <!--<div class="step-box-item" :class="currentStep === 1 ? 'doing': status.status === 0 ? 'undone' : 'done'">-->
        <div class="step-box-item" :class="step === 1 ? 'doing': step === 0 ? 'doing' : 'done'">
          <div class="item-img"></div>
          <span class="item-text">审核中</span>
        </div>
        <div class="step-box-item" :class="step === 2 ? 'doing' : 'undone'">
          <div class="item-img" ></div>
          <!--<span class="item-text" v-show="step !== 2">出款成功</span>-->
          <span class="item-text">审核完成</span>
        </div>
      </div>
    </div>
    <div class="withdraw-result-container__tips" v-if="status.length > 1">为了您的资金安全，系统自动将订单拆分为<span class="red">{{status.length}}</span>笔，请您查收</div>
    <div class="withdraw-result-container__info" v-for="item in status">

      <div class="info-item">
        <span class="info-item-title">提款金额</span>
        <span class="info-item-text">{{item.amount}}</span>
      </div>
      <div class="info-item">
        <span class="info-item-title">订单编号</span>
        <span class="info-item-text">{{item.orderId}}</span>
      </div>
      <div class="info-item">
        <span class="info-item-title">交易时间</span>
        <span class="info-item-text">{{item.createDate | toTime}}</span>
      </div>
      <div class="info-item">
        <span class="info-item-title">提款方式</span>
        <span class="info-item-text">{{item.bankName}}</span>
      </div>
      <div class="info-item">
        <span class="info-item-title">提款状态</span>
        <span class="info-item-text" v-html="$options.filters.withdrawStatus(item.status)"></span>
      </div>
    </div>
    <van-row type="flex" justify="center" class="account-button">
      <van-button type="primary" block shadow @click="$router.push({path: '/'})">返回首页</van-button>
    </van-row>
  </div>
</template>

<script>
  import {form} from '@/build';
  import {getWithdrawStatus} from '@/services/api/finance';
  export default {
    name: "withdraw-result",
    mixins: [form],
    data() {
      return {
        step : 2,
        status: {},
        m: 4,
        s: 59,
      };
    },
    methods: {
      showtime() {
        this.s = this.s - 1;
        if (this.s === 0 && this.m !== 0) {
          this.m = this.m - 1;
          this.s = 60;
        }

        if (this.s === 0 && this.m === 0) {
          clearInterval(this.settime);
          this.resetCountDown();
        }
      },
      startCountDown() {
        this.settime = setInterval(this.showtime, 1000);
      },
      resetCountDown() {
        this.m = 4;
        this.s = 59;
        this.startCountDown();
      },
      check() {
        _.each(this.status, (item) => {
          if (_.includes([...consts.WITHDRAW_STATUS_PAYMENT_OUT_ING,...consts.WITHDRAW_STATUS_AUDIT_ING], item.status)) {
            this.step = 1;
          }
        });
      }
    },
    computed: {
      ...mapGetters({
        withdrawStatus: 'withdrawStatus'
      }),
      currentStep() {
        _.each(this.status, item => {

        })
        //风控审核
        if (_.includes(consts.WITHDRAW_STATUS_AUDIT_ING, this.status.status)) {
          return 0;
          //出款中
        } else if (_.includes(consts.WITHDRAW_STATUS_PAYMENT_OUT_ING, this.status.status)) {
          return 1;
          //提现拒绝
        } else if (_.includes(consts.WITHDRAW_STATUS_FAILURE, this.status.status)) {
          return 2;
          //提现成功
        } else if (_.includes(consts.WITHDRAW_STATUS_SUCCESS, this.status.status)) {
          return 3;
          //未知状态码上报sentry
        } else {
          return 9;
        }
      }
    },
    mounted() {
      this.startCountDown();
      this.bindGet(getWithdrawStatus, 'lastStatus', {
        action: 'getWithdrawStatus',
        format:(data) => {
          if (!data) {
            return ;
          } else {
            this.status = data;
            this.check();
          }
        }
      });
      if (!this.withdrawStatus.orderId) {
        this.doGet({action: 'getWithdrawStatus'});
      } else {
        this.status = this.withdrawStatus;
        this.check();
      }
    },
    beforeDestroy() {
      clearInterval(this.settime);
    }
  };
</script>

<style lang="scss" scoped>
  @include b(withdraw-result-container) {
    background-color: #f1f1f2;
    padding: 10px 15px;
    min-height: calc(100vh - 65px);
    @include e(step) {
      padding: 20px 15px 10px 15px;
      background-color: #ffffff;
      border-radius: 6px;
      .step-title {
        font-size: 16px;
        font-weight: bold;
      }
      .step-time {
        display: flex;
        align-items: center;
        height: 35px;
        .step-time-text {
          color: #a3a3a3;
          margin-right: 10px;
        }
        .step-time-symbol {
          padding:2px 5px;
        }
        .step-time-num {
          padding:2px 10px;
          border: 1px solid #dedede;
          color: red;
          border-radius: 5px;
        }
      }
      .step-box {
        position: relative;
        .step-box-line {
          height: 80px;
          width: 9px;
          border-right: 1px solid #ebebeb;
          position: absolute;
          left: 0px;
          top: 5px
        }
        .step-box-item{
          display: flex;
          position: relative;
          z-index: 900;
          margin-bottom: 15px;
          .item-text {
            margin-left: 15px;
            font-size: 12px;
            line-height: 19px;
            font-weight: 600;
          }
          .item-img {
            width: 20px;
            height: 20px;
          }
          &.done {
            .item-img {
              @include utils-bg(url("../../../assets/done.png") no-repeat top, contain);
            }
            .item-text{
              color: #000000;
            }
          }
          &.doing {
            .item-img {
              @include utils-bg(url("../../../assets/doing.png") no-repeat top, contain);
            }
            .item-text{
              color: #1E5ADC;
            }
          }
          &.undone {
            .item-img {
              @include utils-bg(url("../../../assets/undone.png") no-repeat top, contain);
            }
            .item-text{
              color: #a3a3a3;
            }
          }
        }
      }
    }
    @include e(tips) {
      padding: 10px 0;
      font-weight: bold;
      .red {
        color: red;
      }
    }
    @include e(info) {
      margin-bottom: 15px;
      padding: 30px 15px;
      background-color: #ffffff;
      border-radius: 6px;
      .info-item {
        display: flex;
        justify-content: space-between;
        height: 20px;
        line-height: 20px;
        .info-item-title {
          color: #a3a3a3;
        }
      }
    }
  }
</style>
