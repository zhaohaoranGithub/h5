<template>
  <div class="main">
    <van-tabs @click="onClick" color="#2154D8" animated>
      <van-tab title="今天">
        <div class="main__content">
          <div class="main__header">总计 {{tableData.bettingTimes}} 单，有效流水: {{tableData.betEffectSum | currency}} 元，输赢:
            <span :class="tableData.winSum >= 0?'main__header-danger':'main__header-success'">{{tableData.winSum | currency}}</span> 元
          </div>
          <div class="main__list">
            <div v-for='(item,index) in tableData.list' :key="index"
                 @click="goToDetail('/mc/bd/',item.gameId,item.channelId,tableData.bettingTimes,tableData.winSum)" :class="'list-item list-item-bg-'+item.gameId">
              <div class="item-name">{{item.channelName}}</div>
              <div class="item-order">({{item.itemCount}}单)</div>
              <div class="item-amount">¥ <span :class="item.profitAmount > 0 ? 'win' : item.profitAmount < 0 ? 'lost' : ''">{{item.profitAmount | currency}}</span></div>
              <div class="item-flow">有效流水: ¥ {{item.effectiveAmount | currency}}</div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="昨天">
        <div class="main__content">
          <div class="main__header">总计 {{tableData.bettingTimes}} 单，有效流水: {{tableData.betEffectSum | currency}} 元，输赢:
            <span :class="tableData.winSum >= 0?'main__header-danger':'main__header-success'">{{tableData.winSum | currency}}</span> 元
          </div>
          <div class="main__list">
            <div class="list-item" v-for='(item,index) in tableData.list' :key="index"
                 @click="goToDetail('/mc/bd/',item.gameId,item.channelId,tableData.bettingTimes,tableData.winSum)" :class="'list-item list-item-bg-'+item.gameId">
              <div class="item-name">{{item.channelName}}</div>
              <div class="item-order">({{item.itemCount}}单)</div>
              <div class="item-amount">¥ <span :class="item.profitAmount > 0 ? 'win' : item.profitAmount < 0 ? 'lost' : ''">{{item.profitAmount | currency}}</span></div>
              <div class="item-flow">有效流水: ¥ {{item.effectiveAmount | currency}}</div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="本周">
        <div class="main__content">
          <div class="main__header">总计 {{tableData.bettingTimes}} 单，有效流水: {{tableData.betEffectSum | currency}} 元，输赢:
            <span :class="tableData.winSum >= 0?'main__header-danger':'main__header-success'">{{tableData.winSum | currency}}</span> 元
          </div>
          <div class="main__list">
            <div class="list-item" v-for='(item,index) in tableData.list' :key="index"
                 @click="goToDetail('/mc/bd/',item.gameId,item.channelId,tableData.bettingTimes,tableData.winSum)" :class="'list-item list-item-bg-'+item.gameId">
              <div class="item-name">{{item.channelName}}</div>
              <div class="item-order">({{item.itemCount}}单)</div>
              <div class="item-amount">¥ <span :class="item.profitAmount > 0 ? 'win' : item.profitAmount < 0 ? 'lost' : ''">{{item.profitAmount | currency}}</span></div>
              <div class="item-flow">有效流水: ¥ {{item.effectiveAmount | currency}}</div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="上周">
        <div class="main__content">
          <div class="main__header">H5只提供本周内的记录，更多的投注记录，下载<span>贝博娱乐APP或PC官网查看</span></div>

          <van-button class="main__btn" size="large" @click="goTo('/download')">下载APP</van-button>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  import getCommand from '@/mixins/get-command';
  import {
    reportGameApi as getApi
  } from '@/services/api/game';

  export default {
    name: "betting-record",
    mixins: [getCommand],
    components: {},
    data() {
      return {
        gameInfo: undefined,
        time: consts.TODAY,

        filters: {
          date: undefined,
        },
        tableData: [],
        index: 0
      }
    },
    computed: {},
    methods: {
      onClick(index, title) {
        // this.$toast(title);
        this.time = index + 1
      },
      goToDetail(routeName, gameId, channelId, bettingTimes, winSum) {
        this.$router.push({path: routeName, query: {gameId: gameId, channelId: channelId, time: this.time,bettingTimes: bettingTimes,winSum: winSum}})
      },
      goTo(routeName) {
        this.$router.push({path: routeName})
      },
    },
    watch: {
      time: {
        handler(time) {
          this.$nextTick(() => {
            this.filters.date = _.toTimestamp(_.find(consts.TIME_PERIOD, {value: time}));
            this.getAll();
          });
        },
        immediate: true
      }
    },
    mounted() {
      this.bindGet(getApi, 'tableData', {
        sendingData: 'filters',
        format(data) {
          data = _(consts.PLATFORM_TYPE).map((platform) => {
            const info = _.extend({
              effectiveAmount: 0,
              itemCount: 0,
              profitAmount: 0
            }, _.find(data, {
              gameId: platform.value
            }));
            return {
              channelId: platform.channelId,
              channelName: platform.title,
              gameId: platform.value,
              // effectiveAmount: info.channelId === 8 ? info.betValidSum : info.betEffectSum,
              effectiveAmount: info.betEffectSum,
              itemCount: info.bettingTimes,
              profitAmount: info.winSum
            };
          }).compact().value();

          let bettingTimes = 0, betEffectSum = 0, winSum = 0;
          bettingTimes = _.sumBy(data, "itemCount");
          betEffectSum = _.sumBy(data, "effectiveAmount");
          winSum = _.sumBy(data, "profitAmount");

          return {
            list: data,
            bettingTimes: bettingTimes,
            betEffectSum: betEffectSum,
            winSum: winSum,
          }
        }
      });
    }
  }
</script>
<style lang="scss" scoped>
  @include b(main) {
    min-height: 800px;
    color: #333333;
    font-size: 14px;
    background: #F5F6F7;
    @include e(content) {
      padding: 13px 16px;
      @include e(header) {
        color: #999999;
        font-size: 12px;
        margin-bottom: 10px;
        font-weight: bold;
        @include e(header-danger) {
          color: $--color-danger;
        }
        @include e(header-success) {
          color: #42C14E;
        }
      }
      @include e(list) {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        /*flex-direction: column;*/
        .list-item {
          flex: 0 0 48%;
          height: 180px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 1);
          /*box-shadow: 0 15px 25px 12px rgba(235, 235, 235, 0.6);*/
          box-shadow: 0 6px 10px 5px rgba(235, 235, 235, 0.6);
          margin-bottom: 12px;
          .item-name {
            line-height: 50px;
            font-size: 20px;
            margin-top: 10px;
            padding-left: 10px;
            font-weight: bold;
          }
          .item-order {
            line-height: 20px;
            font-size: 12px;
            color: #999999;
            padding-left: 10px;
          }
          .item-amount {
            line-height: 30px;
            font-size: 18px;
            padding-left: 10px;
            .win {
              color: $--color-danger;
            }
            .lost {
              color: $--color-success;
            }
          }
          .item-flow {
            line-height: 20px;
            font-size: 12px;
            color: #999999;
            margin-top: 30px;
            padding-left: 10px;
          }
          &:nth-child(2) {
            margin-right: 0;
          }
        }
        .list-item-bg-1 {
          background: #ffffff url("../misc/game-bg/ag.png") no-repeat center/contain;
        }
        .list-item-bg-2 {
          background: #ffffff url("../misc/game-bg/ag-fish.png") no-repeat center/contain;
        }
        .list-item-bg-3 {
          background: #ffffff url("../misc/game-bg/ball.png") no-repeat center/contain;
        }
        .list-item-bg-4 {
          background: #ffffff url("../misc/game-bg/pt.png") no-repeat center/contain;
        }
        .list-item-bg-5 {
          background: #ffffff url("../misc/game-bg/ebet.png") no-repeat center/contain;
        }
        .list-item-bg-8 {
          background: #ffffff url("../misc/game-bg/lb.png") no-repeat center/contain;
        }
        .list-item-bg-9 {
          background: #ffffff url("../misc/game-bg/ky.png") no-repeat center/contain;
        }
        .list-item-bg-10 {
          background: #ffffff url("../misc/game-bg/happy.png") no-repeat center/contain;
        }
      }
    }
    @include e(btn) {
      border-radius: 5px;
      background-color: $--color-primary;
      text-align: center;
      color: #ffffff;
      border: 1px solid $--color-primary;
      box-shadow: 0 4px 10px 0 rgba(30, 90, 220, 0.5);
      margin-top: 20px;
    }
  }
</style>
