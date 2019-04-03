<template>
  <div class="redPacket-container">
    <redPacket-alert v-if="redPacketShow && interval" :text="text" :subText="subText" :cancleBtn="cancleBtn" :confirmBtn="confirmBtn" @cancleClick="cancleClick" @confirmClick="confirmClick" @closeReadPack="closeReadPack"></redPacket-alert>
    <div class="redPacket-container__banner">
      <div class="banner-bg"></div>
      <div class="banner-redPacket"></div>
    </div>
    <div class="redPacket-container__content">
      <div class="content-item">
        <div class="content-item-title">开始时间</div>
        <div class="content-item-text">{{startTime | toDate}}</div>
      </div>
      <div class="content-item">
        <div class="content-item-title">结束时间</div>
        <div class="content-item-text">{{endTime | toDate}}</div>
      </div>
      <div class="content-item">
        <div class="content-item-title">参与方式</div>
        <div class="content-item-text">登录后参与</div>
      </div>
      <div class="content-item">
        <div class="content-item-title">适用平台</div>
        <div class="content-item-text">全平台</div>
      </div>
    </div>
    <div class="redPacket-container__condition">
      <div class="condition-title">
        参与条件
      </div>
      <div class="condition-item">
        <div class="condition-item-text">当日有效投注</div>
        <div class="condition-item-text">≥{{betMin}}</div>
      </div>
      <div class="condition-item">
        <div class="condition-item-text">当日有效充值</div>
        <div class="condition-item-text">≥{{rechargeMin}}</div>
      </div>
      <div class="condition-tips">
        只要您满足相应条件，就可以参加红包雨活动，在除投注页面都可以抢哦！
      </div>
    </div>
    <div class="redPacket-container__explain">
      <div class="explain-title">活动说明</div>
      <div class="explain-text">
        <div>1、本活动与平台其它活动流水共享，满足条件即可参加。</div>
        <div>2、红包雨在整点（即0:00、01:00...）定时全屏飘落，每天24次，在投注页面无法领取，请在非投注页面抢红包。</div>
        <div>3、红包奖金直接加入中心钱包，奖金无需投注即可提款。</div>
        <div>4、有效投注定义：相应类型游戏投注，任何对押、和局、无效的、投注失败的、未产生输赢结果的投注不计算为有效投注（体育类港赔0.75 / 欧赔1.75以下的投注、真人类和局投注、电子类内的棋牌游戏如百家乐/21点等的投注、彩票类撤单、棋牌类退回等注单不计算为有效投注）</div>
        <div>5、每位真实有效玩家/每一手机号码/电子邮箱/户籍地址/现居地址/同一银行卡/每一IP地址/每一台电脑或上网设备，仅能参加并享受一次该活动，违规不享受该活动。</div>
        <div>6、此活动为平台提供给真实玩家的福利，任何用户或团体以不正常的方式投注、套取活动优惠，平台保留在不通知的情况下冻结账户的权利，并不退还款项。</div>
        <div>7、Ballbet贝博有权对该活动进行修改、暂停、取消等，无需特别通知，并保留对该活动的最终解释权。</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { form, activity } from "@/mixins/index";
  import redPacket from "@/mixins/red-packet";
  import redPacketAlert from "@/components/red-packet/alert/index";
  import {activityRedPacketConfigApi, activityRedPacketInfoApi} from '@/services/api/activity';
  export default {
    name: "activity-redPacket",
    mixins: [form, activity, redPacket],
    components: {
      redPacketAlert
    },
    computed: {
      ...mapGetters(["isLogin"]),
    },
    data() {
      return {
        startTime: null,
        endTime: null,
        interval: true,
        redPacketConfig: [],
        redPacketInfo: [],
        betMin: null,
        rechargeMin: null,
      };
    },
    mounted() {
      if(this.$route.query.isFromBanner === '0' &&
         this.$route.query.token &&
         this.$route.query.token !== "" &&
         this.$route.query.token !== "null") {
        this.$store.commit(types.START_RED_PACKET, true);
        this.doGet({action: 'getRedPacketInfo'});
      } else {
        this.btnBack({type: 2, num: null});
      }
      this.bindGet(activityRedPacketConfigApi, 'redPacketConfig', {
        action: 'getRedPacketConfig',
        callback:([result, data])=>{
          if (result) {
            this.betMin = data.bonusLevelItems[0].totalBetAmount
            this.rechargeMin = data.bonusLevelItems[0].totalRechargeAmount
            _.each(data.bonusLevelItems, (item) => {
              if (this.betMin > item.totalBetAmount) {
                this.betMin = item.totalBetAmount;
              }
              if (this.rechargeMin > item.totalRechargeAmount) {
                this.rechargeMin = item.totalRechargeAmount;
              }
            });
            this.startTime = data.startTime;
            this.endTime = data.endTime;
          }
          return data;
        }
      });
      this.bindGet(activityRedPacketInfoApi, 'redPacketInfo', {
        action: 'getRedPacketInfo',
        callback:([result, data])=>{
          if(result === true) {
            this.$store.commit(types.START_RED_QUA, data.hasQualification);
          }
        }
      });
      this.doGet({action: 'getRedPacketConfig'});
    },
    created() {
      if (
        this.$route.query.token &&
        this.$route.query.token !== "" &&
        this.$route.query.token !== "null"
      ) {
        this.examine();
      } else if(!this.isLogin){
        this.clearReadPack();
      }
    },
  };
</script>

<style lang="scss" scoped>
  @include b(redPacket-container) {
    padding-bottom: 10px;
    min-height: calc(100vh - 10px);
    @include utils-bg(url("./bg.png") no-repeat top, cover);
    @include e(banner) {
      display: flex;
      justify-content: center;
      padding-top: 20px;
      .banner-bg {
        width: 365px;
        height: 326px;
        @include utils-bg(url("./banner.png") no-repeat top, cover);
        z-index: 10;
      }
      .banner-redPacket {
        width: 100%;
        height: 298px;
        position: absolute;
        top: 280px;
        left: 0;
        @include utils-bg(url("./banner-redPacket.png") no-repeat top, cover);
      }
    }
    @include e(content) {
      display: flex;
      margin: 0 10px;
      height: 80px;
      position: relative;
      color: white;
      flex-wrap: wrap;
      @include utils-bg(url("./content.png") no-repeat top, cover);
      z-index: 20;
      padding: 7px 0 18px 0;
      .content-item {
        width: 175px;
        height: 40px;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .content-item-text {
          font-weight: bold;
          font-size: 14px;
        }
      }
    }
    @include e(condition) {
      margin: 5px 10px;
      height: 120px;
      position: relative;
      color: white;
      @include utils-bg(url("./condition.png") no-repeat top, cover);
      .condition-title {
        text-align: center;
        width: 100%;
        height: 35px;
        line-height: 35px;
      }
      .condition-item {
        display: flex;
        padding-top: 12px;
        .condition-item-text {
          width: 175px;
          text-align: center;
        }
      }
      .condition-tips {
        padding-top: 10px;
        text-align: center;
        width: 142%;
        color: #f3f1a8;
        transform: scale(0.7);
        transform-origin: 0 0 0;
      }
    }
    @include e(explain) {
      @include utils-bg(url("./explain.png") no-repeat top, cover);
      margin: 15px 10px;
      padding: 15px 15px;
      height: 245px;
      position: relative;
      color: white;
      .explain-text {
        margin-top: 5px;
        width: 142%;
        transform: scale(0.7);
        transform-origin: 0 0 0;
      }
    }
  }
</style>
