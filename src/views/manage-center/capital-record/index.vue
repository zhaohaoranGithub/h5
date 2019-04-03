<template>
  <div class="main">
    <div class="main__content">
      <van-tabs @click="onClick" color="#2154D8" animated>
        <van-tab title="今天">
          <div v-if="tableData.list.length>0">
            <div class="main__list" v-for='(item,index) in tableData.list' :key="index"
                 @click="goTo('/mc/cd/',item.status,item.orderType,item.orderId,item.createTime,item.orderDesc,item.remark,item.amount,item.fee,item.reallyAmount)">
              <div class="item1">
                <div v-if="item.orderType !== 3">{{item.orderDesc | checkDesc}}</div>
                <div v-else>{{item.remark}}</div>
                <span>{{item.createTime | toTime}}</span>
              </div>
              <div class="item2">
                {{item.amount | currency}}
                <!--<br/><span>手续费：{{item.fee | currency}}</span>-->
              </div>
              <div class="item3">
                <div class="item3-img"></div>
                <div class="item3-status success" v-if="item.status === 1">成功</div>
                <div class="item3-status fail" v-else-if="item.status === 2">失败</div>
                <div class="item3-status doing" v-else>进行中</div>
              </div>
            </div>
          </div>
          <div class="no-search-results" v-else>
            <div class="no-search-results-img"></div>
            <div class="no-search-results-txt">暂无更多数据</div>
          </div>
        </van-tab>
        <van-tab title="昨天">
          <div v-if="tableData.list.length>0">
            <div class="main__list" v-for='(item,index) in tableData.list' :key="index"
                 @click="goTo('/mc/cd/',item.status,item.orderType,item.orderId,item.createTime,item.orderDesc,item.remark,item.amount,item.fee,item.reallyAmount)">
              <div class="item1">
                <div v-if="item.orderType !== 3">{{item.orderDesc | checkDesc}}</div>
                <div v-else>{{item.remark}}</div>
                <span>{{item.createTime | toTime}}</span>
              </div>
              <div class="item2">
                {{item.amount | currency}}<br/>
                <!--<span>手续费：{{item.fee | currency}}</span>-->
              </div>
              <div class="item3">
                <div class="item3-img"></div>
                <div class="item3-status success" v-if="item.status === 1">成功</div>
                <div class="item3-status fail" v-else-if="item.status === 2">失败</div>
                <div class="item3-status doing" v-else>进行中</div>
              </div>
            </div>
          </div>
          <div class="no-search-results" v-else>
            <div class="no-search-results-img"></div>
            <div class="no-search-results-txt">暂无更多数据</div>
          </div>
        </van-tab>
        <van-tab title="本周">
          <div v-if="tableData.list.length>0">
            <div class="main__list" v-for='(item,index) in tableData.list' :key="index"
                 @click="goTo('/mc/cd/',item.status,item.orderType,item.orderId,item.createTime,item.orderDesc,item.remark,item.amount,item.fee,item.reallyAmount)">
              <div class="item1">
                <div v-if="item.orderType !== 3">{{item.orderDesc | checkDesc}}</div>
                <div v-else>{{item.remark}}</div>
                <span>{{item.createTime | toTime}}</span>
              </div>
              <div class="item2">
                {{item.amount | currency}}
                <!--<br/><span>手续费：{{item.fee | currency}}</span>-->
              </div>
              <div class="item3">
                <div class="item3-img"></div>
                <div class="item3-status success" v-if="item.status === 1">成功</div>
                <div class="item3-status fail" v-else-if="item.status === 2">失败</div>
                <div class="item3-status doing" v-else>进行中</div>
              </div>
            </div>
          </div>
          <div class="no-search-results" v-else>
            <div class="no-search-results-img"></div>
            <div class="no-search-results-txt">暂无更多数据</div>
          </div>
        </van-tab>
        <van-tab title="本月">
          <!--<div v-if="tableData.list.length>0">-->
            <!--<div class="main__list" v-for='(item,index) in tableData.list' :key="index"-->
                 <!--@click="goTo('/mc/cd/',item.status,item.orderId,item.createTime,item.orderDesc,item.remark,item.amount,item.fee,item.reallyAmount)">-->
              <!--<div class="item1">-->
                    <!--<div v-if="item.orderType !== 3">{{item.orderDesc}}</div>-->
                    <!--<div v-else>{{item.remark}}</div>-->
                    <!--<span>{{item.createTime | toTime}}</span>-->
              <!--</div>-->
              <!--<div class="item2">-->
                <!--{{item.amount | currency}}<br/><span>手续费：{{item.fee | currency}}</span>-->
              <!--</div>-->
              <!--<div class="item3">-->
                <!--<div class="item3-img"></div>-->
                <!--<div class="item3-status success" v-if="item.status === 1">成功</div>-->
                <!--<div class="item3-status fail" v-else-if="item.status === 2">失败</div>-->
                <!--<div class="item3-status doing" v-else>进行中</div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="no-search-results" v-else>-->
            <!--<div class="no-search-results-img"></div>-->
            <!--<div class="no-search-results-txt">暂无更多数据</div>-->
          <!--</div>-->
          <div class="main__download">
            <div class="main__header">H5只提供本周内的记录，更多的投注记录，下载<span>贝博娱乐APP或PC官网查看</span></div>

            <van-button class="main__btn" size="large" @click="goTo('/download')">下载APP</van-button>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div v-transfer-dom>
      <van-popup v-model="rightFilterVisibility" position="right" :overlay="false" class="popup-style">
        <div class="popup-style__popup" @click="resetPopup()"></div>
        <div class="popup-style__main">
          <div class="popup-style__title">交易类型</div>
          <div class="popup-style__content">
            <div class="popup-style__check" @click="orderTypeCheck(-1)" :class="itemOrder === -1?'active':''">全部</div>
            <div class="popup-style__check" @click="orderTypeCheck(1)" :class="itemOrder === 1?'active':''">充值</div>
            <div class="popup-style__check" @click="orderTypeCheck(2)" :class="itemOrder === 2?'active':''">提现</div>
            <div class="popup-style__check" @click="orderTypeCheck(3)" :class="itemOrder === 3?'active':''">转账</div>
            <div class="popup-style__check" @click="orderTypeCheck(4)" :class="itemOrder === 4?'active':''">红利</div>
            <div class="popup-style__check" @click="orderTypeCheck(5)" :class="itemOrder === 5?'active':''">返水</div>
            <div class="popup-style__check" @click="orderTypeCheck(6)" :class="itemOrder === 6?'active':''">提现退回</div>
            <div class="popup-style__check" @click="orderTypeCheck(8,11)" :class="itemOrder === 8 || itemOrder === 11?'active':''">上级转入</div>
            <div class="popup-style__check" @click="orderTypeCheck(10)" :class="itemOrder === 10?'active':''">减币</div>
            <div class="popup-style__check" @click="orderTypeCheck(13,14)" :class="itemOrder === 13 || itemOrder === 14?'active':''">加币</div>
          </div>
          <div class="popup-style__title">选择状态</div>
          <div class="popup-style__content">
            <div class="popup-style__check" @click="statusCheck(-1)" :class="itemStatus === -1?'active':''">全部</div>
            <div class="popup-style__check" @click="statusCheck(1)" :class="itemStatus === 1?'active':''">成功</div>
            <div class="popup-style__check" @click="statusCheck(2)" :class="itemStatus === 2?'active':''">失败</div>
            <div class="popup-style__check" @click="statusCheck(0)" :class="itemStatus === 0?'active':''">处理中</div>
          </div>
          <div class="popup-style__footer">
            <div class="popup-style__reset" @click="resetPopup()">重置</div>
            <div class="popup-style__sure" @click="surePopup()">确定</div>
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
  import getCommand from '@/mixins/get-command';
  import {
    userTransactionListApi as listApi
  } from '@/services/api/user';

  export default {
    name: "capital-record",
    mixins: [getCommand],
    components: {},
    data() {
      return {
        tableData: {
          list: []
        },
        time: consts.TODAY,
        filters: {
          orderType: consts.ALL,
          startTime: undefined,
          endTime: undefined,
          status: consts.ALL,
          page: 1,
          size: 100
        },
        index: 0,
        show: false,
        active: true,

        itemOrder: -1,
        itemStatus: -1,
      };
    },
    filters: {
      checkDesc(value) {
        if (value === '上分') {
          return '上级转入';
        } else {
          return value;
        }
      }
    },
    computed: {
      ...mapState({
        rightFilterVisibility: state => state.rightFilterVisibility,
      }),
    },
    methods: {
      onClick(index, title) {
        // this.$toast(title);
        if (index === 3) {
          index = 4
        }
        this.time = index + 1
      },
      orderTypeCheck(orderType,orderType2) {
        this.itemOrder = orderType;
        if (orderType2){
          this.filters.orderType = orderType+','+orderType2;
        }else {
          this.filters.orderType = orderType;
        }
      },
      statusCheck(status) {
        this.itemStatus = status;
        this.filters.status = status;
      },
      resetPopup() {
        this.itemOrder = -1;
        this.itemStatus = -1;
        this.filters.orderType = consts.ALL;
        this.filters.status = consts.ALL;
        this.$store.commit({
          type: types.RIGHT_FILTER_VISIBILITY,
          rightFilterVisibility: false
        })
      },
      surePopup() {
        this.$store.commit({
          type: types.RIGHT_FILTER_VISIBILITY,
          rightFilterVisibility: false
        })
      },
      goTo(routeName, status, orderType, orderId, createTime, orderDesc, remark, amount, fee, reallyAmount) {
        this.$router.push({
          path: routeName,
          query: {
            status: status,
            orderType: orderType,
            orderId: orderId,
            createTime: createTime,
            orderDesc: orderDesc,
            remark: remark,
            amount: amount,
            fee: fee,
            reallyAmount: reallyAmount
          }
        })
      },
    },
    watch: {
      time: {
        handler(time) {
          this.$nextTick(() => {
            this.filters = {...this.filters, ..._.toPeriod(_.find(consts.TIME_PERIOD, {value: time}))};
          });
        },
        immediate: true
      },
      filters: {
        handler() {
          this.getAll();
        },

        deep: true
      }
    },
    mounted() {
      this.bindGet(listApi, 'tableData', {
        action: 'getGrid',
        sendingData: 'filters',
        format: (data) => {
          return data;
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
    padding: 13px 16px;
    @include e(content) {
      border-radius: 8px;
      background-color: rgba(255, 255, 255, 1);
      /*box-shadow: 0 15px 25px 12px rgba(235, 235, 235, 0.6);*/
      box-shadow: 0 6px 10px 5px rgba(235, 235, 235, 0.6);
      overflow: hidden;
      @include e(download) {
        padding: 13px 16px;
        @include e(header) {
          color: #999999;
          font-size: 12px;
          margin-bottom: 10px;
          /*span {
            color: $--color-primary;
          }*/
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
          background: url("./../../../assets/nomsg/no-capital.png") no-repeat center/contain;
        }
        .no-search-results-txt {
          width: 100%;
          text-align: center;
          color: $--color-info;
          margin-top: 40px;
        }
      }
    }
    @include e(list) {
      width: 100%;
      min-height: 48px;
      display: flex;
      align-items: center;
      padding: 10px 0;
      line-height: 24px;
      font-size: 14px;
      border-bottom: 1px solid #ebedf0;
      span {
        font-size: 12px;
      }
      .item1 {
        flex: 0 0 50%;
        padding-left: 15px;
        div {
          width: 170px;
          height: 24px;
          line-height: 24px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap
        }
      }
      .item2 {
        flex: 0 0 25%;
        color: $--color-primary;
        span {
          color: #999999;
        }
      }
      .item3 {
        flex: 1;
        line-height: 48px;
        .item3-status {
          float: right;
        }
        .item3-img {
          width: 28px;
          height: 48px;
          background: url("../misc/right-arrow.png") no-repeat center/contain;
          float: right;
        }
        .success {
          color: #42C14E;
        }
        .fail {
          color: #EA4335;
        }
        .doing {
          color: $--color-primary;
        }
      }
      &:last-child {
        border-bottom: none;
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

  @include b(popup-style) {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    @include e(popup) {
      width: 20%;
      height: 100%;
      left: 0;
      position: absolute;
      z-index: 1;
    }
    @include e(main) {
      width: 80%;
      height: 100%;
      background-color: rgba(255, 255, 255, 1);
      right: 0;
      position: absolute;
      z-index: 2;
      @include e(title) {
        height: 20px;
        line-height: 20px;
        font-size: 16px;
        margin-top: 50px;
        margin-left: 20px;
        &:first-child {
          margin-top: 90px;
        }
      }
      @include e(content) {
        display: flex;
        flex-wrap: wrap;
        margin-top: 10px;
        margin-left: 20px;
        @include e(check) {
          width: 76px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          border-radius: 5px;
          border: 1px solid rgba(222, 222, 222, 1);
          margin-right: 15px;
          margin-bottom: 10px;
        }
        .active {
          background: $--color-primary;
          box-shadow: 0 2px 7px 0 rgba(22, 32, 106, 0.35);
          border: 1px solid $--color-primary;
          color: #ffffff;
        }
      }
      @include e(footer) {
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 18px;
        position: absolute;
        bottom: 0;
        display: flex;
        flex-wrap: nowrap;
        @include e(reset) {
          color: #666666;
          flex: 1 0 0;
          box-shadow: 0 2px 7px 0 rgba(22, 32, 106, 0.35);

        }
        @include e(sure) {
          color: #ffffff;
          flex: 1 0 0;
          background: $--color-primary;
          box-shadow: 0 2px 7px 0 rgba(22, 32, 106, 0.35);

        }
      }
    }
  }
</style>
