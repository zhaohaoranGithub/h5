<template>
  <div class="main">
    <div class="main__cell">
      <div class="main__cell-header">资金详情</div>
      <div class="main__cell-list">
        <div class="main__cell-name">状态</div>
        <div class="main__cell-value"><span :class="statusClassName">{{statusTxt.title}}</span></div>
      </div>
      <div class="main__cell-list">
        <div class="main__cell-name">订单号</div>
        <div class="main__cell-value">{{orderId}}</div>
      </div>
      <div class="main__cell-list">
        <div class="main__cell-name">时间</div>
        <div class="main__cell-value">{{Number(createTime) | toTime}}</div>
      </div>
      <div class="main__cell-list">
        <div class="main__cell-name">交易类型</div>
        <div class="main__cell-value">{{orderDesc}}</div>
      </div>
      <div class="main__cell-list">
        <div class="main__cell-name">子类型</div>
        <div class="main__cell-value">{{remark}}</div>
      </div>
      <div class="main__cell-list">
        <div class="main__cell-name">交易金额</div>
        <div class="main__cell-value">{{amount | currency}}</div>
      </div>
      <div class="main__cell-list">
        <div class="main__cell-name">手续费</div>
        <div class="main__cell-value">{{fee | currency}}</div>
      </div>
      <div class="main__cell-list">
        <div class="main__cell-name">到账金额</div>
        <div class="main__cell-value"><span>{{reallyAmount | currency}}</span></div>
      </div>
      <div class="main__cell-footer" v-if="Number(status) === 0 && Number(orderType) === 1">
        <van-button class="main__cell-btn" size="large" @click="cancelApply">撤销申请</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {doRechargeCancel} from '@/services/api/finance';
  // import getCommand from '@/mixins/get-command';

  export default {
    name: "capital-detail",
    // mixins: [getCommand],
    components: {},
    props: {
      status: {
        required: true
      },
      orderType: {
        required: true
      },
      orderId: {
        required: true
      },
      createTime: {
        required: true
      },
      orderDesc: {
        required: true
      },
      remark: {
        required: true
      },
      amount: {
        required: true
      },
      fee: {
        required: true
      },
      reallyAmount: {
        required: true
      },
    },
    data() {
      return {
        // statusTxt: '处理中'
      }
    },
    computed: {
      statusTxt() {
        return _.find(consts.TRADE_STATUS, {value: Number(this.status)});
      },
      statusClassName(){
        let className = '';
        switch(this.status){
          case 1: className = 'success';break;
          case 2: className = 'fail';break;
          default: className = 'doing';break;
        }
        return className;
      }
      // statusTxt: {
      //   get(){
      //     // this.form.amount = _.find(this.channelWallet, {
      //     //   channelId: this.form.fromChannelId
      //     // }).balance;
      //     return _.find(this.activityRealpassData.periodList, {status:consts.ACTIVITY_PROCESSING}) ? _.find(this.activityRealpassData.periodList, {status:consts.ACTIVITY_PROCESSING}).period : 1;
      //   }
      // }
    },
    methods: {
      cancelApply() {
        // const {orderId} = this.orderId;
        let self=this;
        doRechargeCancel({orderId:this.orderId}).then(([result, data]) => {
          if (result) {
            this.$toast.success('订单撤销成功');
            setTimeout(function(){
              self.$router.push({path:'/mc/cr'})
            },300)
          }else {
            this.$toast.fail(data.message);
          }
        });
      },
    },
    mounted() {}
  }
</script>
<style lang="scss" scoped>
  @include b(main) {
    min-height: 800px;
    color: #333333;
    font-size: 14px;
    background: #F5F6F7;
    padding: 13px 16px;
    @include e(cell) {
      border-radius: 8px;
      background-color: rgba(255, 255, 255, 1);
      /*box-shadow: 0 15px 25px 12px rgba(235, 235, 235, 0.6);*/
      box-shadow: 0 6px 10px 5px rgba(235, 235, 235, 0.6);
      overflow: hidden;
      padding-bottom: 80px;
      @include e(cell-header) {
        font-size: 18px;
        padding: 13px 0 30px 16px;
        font-weight: bold;
      }
      @include e(cell-list) {
        /*width: 100%;*/
        height: 30px;
        line-height: 30px;
        padding: 0 16px;
        @include e(cell-name) {
          float: left;
        }
        @include e(cell-value) {
          float: right;
          span {
            &.success {
              color: #42C14E;
            }
            &.fail {
              color: #EA4335;
            }
            &.doing {
              color: $--color-primary;
            }
          }

        }
        &:nth-child(6) {
          border-bottom: 1px solid #edeef0;
          padding-bottom: 15px;
          margin-bottom: 15px;
        }
      }
      @include e(cell-footer) {
        padding: 200px 16px 0 16px;
        @include e(cell-btn) {
          border-radius: 5px;
          background-color: rgba(255, 255, 255, 1);
          text-align: center;
          color: $--color-primary;
          border: 1px solid $--color-primary;
          /*box-shadow: 0 4px 10px 0 rgba(30, 90, 220, 0.5);*/
        }
      }
    }
  }
</style>
