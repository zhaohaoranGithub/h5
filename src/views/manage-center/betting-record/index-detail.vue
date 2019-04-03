<template>
  <div class="main">
    <!--<div class="main__header">-->
      <!--<span class="main__header-primary" v-if="time === 1">今日</span>-->
      <!--<span class="main__header-primary" v-else-if="time === 2">昨天</span>-->
      <!--<span class="main__header-primary" v-else-if="time === 3">本周</span>-->
      <!--&nbsp;总计&nbsp;{{tableData.bettingTimes}}&nbsp;单，输赢:&nbsp;<span :class="tableData.winSum<0?'main__header-danger':'main__header-success'">{{tableData.winSum | currency}}</span>&nbsp;元-->
    <!--</div>-->
    <div class="main__header">
      <span class="main__header-primary" v-if="time === 1">今日</span>
      <span class="main__header-primary" v-else-if="time === 2">昨天</span>
      <span class="main__header-primary" v-else-if="time === 3">本周</span>
      &nbsp;总计&nbsp;{{tableData.bettingTimes}}&nbsp;单，输赢:&nbsp;<span :class="tableData.winSum >= 0?'main__header-danger':'main__header-success'">{{tableData.winSum | currency}}</span>&nbsp;元
    </div>
    <div v-if="tableData.list.length>0">
      <div class="main__list" v-for='(item,index) in tableData.list' :key="index">
        <div class="main__title">
          <div class="main__name">{{item.detail}}</div>
          <badge-text v-if="channelId != '8'" :value="item.status" dic="BET_STATUS"></badge-text>
          <badge-text v-else :value="item.ticketStatus" dic="TICKET_STATUS"></badge-text>
          <!--<div class="main__fail" v-if="item.status === 0">-->
            <!--<van-icon name="clock"/>&nbsp;未结算-->
          <!--</div>-->
          <!--<div class="main__success" v-else-if="item.status === 2">-->
            <!--<van-icon name="checked"/>&nbsp;已结算-->
          <!--</div>-->
          <!--<div class="main__fail" v-else-if="item.status === 1 && item.channelId === 8">-->
            <!--<van-icon name="clock"/>&nbsp;未中奖-->
          <!--</div>-->
          <!--<div class="main__fail" v-else>-->
            <!--<van-icon name="clear"/>&nbsp;已取消-->
          <!--</div>-->
        </div>
        <div class="main__txt">
          <div class="main__left">投注时间：{{item.createTime | toTime}}</div>
          <div class="main__right" v-if="item.win !==0">输赢：<span :class="item.win < 0?'win':'lost'">¥{{item.win | currency}}</span>
          </div>
        </div>
        <div class="main__txt" v-if="channelId == '7'">投注单号：{{item.merOrderId}}</div>
        <div class="main__txt" v-else>投注单号：{{item.orderId}}</div>
        <div class="main__bottom">
          <div class="main__left">投注金额：{{item.amount | currency}}</div>
          <div class="main__right">有效金额：{{item.validAmount | currency}}</div>
        </div>
      </div>
    </div>
    <div class="no-search-results" v-else>
      <div class="no-search-results-img"></div>
      <div class="no-search-results-txt">暂无更多数据</div>
    </div>
  </div>
</template>

<script>
  import getCommand from '@/mixins/get-command';
  import Cookies from 'js-cookie';
  import {
    historyGameBetApi as getApi,
  } from '@/services/api/game';

  export default {
    name: "betting-detail",
    mixins: [getCommand],
    components: {},
    props: {
      gameId: {
        required: true
      },
      channelId: {
        required: true
      },
      time: {
        required: true
      },
      bettingTimes: {
        required: true
      },
      winSum: {
        required: true
      },
    },
    data() {
      return {
        filters: {
          // startTime: undefined,
          // endTime: undefined,
          userName: Cookies.get(consts.CACHE_USERNAME, {
            domain: _.getFirstLevelDomain({
              change: false
            })
          }),
          gameId: this.gameId,
          channelId: this.channelId,
          stime: '',
          etime: '',
          size: 100,
          page: 1,
        },
        tableData: {
          list: []
        },
      };
    },
    computed: {},
    methods: {},
    watch: {
      time: {
        handler(time) {
          this.$nextTick(() => {
            const [startTime, endTime] = _.toTimestamp(_.find(consts.TIME_PERIOD, {value: Number(time)}));
            this.filters.stime = startTime;
            this.filters.etime = endTime;

            this.getAll();
          });
        },
        immediate: true
      }
    },
    mounted() {
      if (this.channelId === '8') {
        this.filters['ticketStatus'] = '';
      } else {
        this.filters['status'] = '';
      }
      this.bindGet(getApi, 'tableData', {
        action: 'getGrid',
        sendingData: 'filters',
        format:(data) =>{
          let bettingTimes = 0, betEffectSum = 0, winSum = 0;
          bettingTimes = data.total;
          betEffectSum = data.sum.effectAmount;
          winSum = data.sum.win;
          return {
            list: data.list,
            bettingTimes: bettingTimes,
            betEffectSum: betEffectSum,
            winSum: winSum,
          };
        }
      });
    }
  };
</script>
<style lang="scss" scoped>
  @include b(main) {
    min-height: 800px;
    color: #333333;
    font-size: 14px;
    background: #F5F6F7;
    padding: 13px 16px;

    @include e(header) {
      color: #999999;
      font-size: 12px;
      margin-bottom: 10px;
      font-weight: bold;
      @include e(header-primary) {
        color: $--color-primary;
      }
      @include e(header-danger) {
        color: $--color-danger;
      }
      @include e(header-success) {
        color: #42C14E;
      }
    }
    @include e(list) {
      height: 117px;
      border-radius: 8px;
      background-color: rgba(255, 255, 255, 1);
      box-shadow: 0 15px 25px 12px rgba(235, 235, 235, 0.6);
      padding: 13px 16px;
      margin-bottom: 12px;
      @include e(title) {
        width: 100%;
        height: 30px;
        line-height: 30px;
        margin-bottom: 2px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        @include e(name) {
          font-size: 16px;
          float: left;
        }
        @include e(success) {
          float: right;
          color: #42C14E;
        }
        @include e(fail) {
          float: right;
          color: #999999;
        }
      }
      @include e(txt) {
        height: 25px;
        line-height: 25px;
        color: #999999;
        font-size: 12px;
      }
      @include e(bottom) {
        width: 100%;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        margin-top: 2px;
      }
      @include e(left) {
        float: left;
      }
      @include e(right) {
        float: right;
        .win {
          color: $--color-success;
        }
        .lost {
          color: $--color-danger;
        }
      }
    }
    .no-search-results {
      width: 225px;
      height: 200px;
      margin: 0 auto;
      padding-top: 30px;
      padding-bottom: 170px;
      .no-search-results-img {
        width: 225px;
        height: 150px;
        background: url("./../../../assets/nomsg/no-betting.png") no-repeat center/contain;
      }
      .no-search-results-txt {
        width: 100%;
        text-align: center;
        color: $--color-info;
        margin-top: 40px;
      }
    }
  }
</style>
