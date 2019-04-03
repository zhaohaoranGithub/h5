<template>
  <div class="sports-container">
    <div class="sports-container__wrapper">
      <div class="sports-container__inner">
        <activity-container-header>
          <div class="activity-container-header__wrapper activity-container-header__wrapper--platfrom">
            <div class="activity-container-header__cell activity-container-header__cell--block">
              <div class="activity-container-header-inner">
                <div class="activity-container-header-inner__brief">开始时间</div>
                <div class="activity-container-header-inner__title">
                  {{activityPlatformInfo.startTime|toTime('YYYY-MM-DD')}}
                </div>
              </div>
              <div class="activity-container-header-inner">
                <div class="activity-container-header-inner__brief">结束时间</div>
                <div class="activity-container-header-inner__title">
                  {{activityPlatformInfo.endTime|toTime('YYYY-MM-DD')}}
                </div>
              </div>
            </div>
            <div class="activity-container-header__cell activity-container-header__cell--block">
              <div class="activity-container-header-inner">
                <div class="activity-container-header-inner__brief">参与方式</div>
                <div class="activity-container-header-inner__title">自动参与</div>
              </div>
              <div class="activity-container-header-inner">
                <div class="activity-container-header-inner__brief">适用平台</div>
                <div class="activity-container-header-inner__title">
                  <template v-if="activityPlatformInfo&&activityPlatformInfo.gameType">
                    {{activityPlatformInfo.gameType|returnShowPlatform}}
                  </template>
                </div>
              </div>
            </div>
          </div>
        </activity-container-header>
        <activity-container-center
          v-if='activityPlatformInfo&&activityPlatformInfo.config&&activityPlatformInfo.config.itemList["AG真人"]'>
          <template slot='title'>
            <div class="activity-container-center__title">
              AG真人
            </div>

          </template>
          <template slot='table'>
            <table
              class="activity-container-center-table activity-container-center-table--platform"
              border='0' cellspacing='0' cellpadding='0'>
              <thead>
              <tr>
                <th>
                  日有效投注额
                </th>
                <th>
                  返水比例
                </th>

              </tr>
              </thead>
              <tbody>
              <tr v-for='(item,index) in activityPlatformInfo.config.itemList["AG真人"]' :key="index">
                <td>{{item.validRebateAmount}}</td>
                <td>{{item.rebateRate}}</td>
              </tr>
              </tbody>
            </table>
          </template>

        </activity-container-center>
        <activity-container-center
          v-if='activityPlatformInfo&&activityPlatformInfo.config&&activityPlatformInfo.config.itemList["AG捕鱼"]'>
          <template slot='title'>
            <div class="activity-container-center__title">
              AG捕鱼
            </div>

          </template>
          <template slot='table'>
            <table
              class="activity-container-center-table activity-container-center-table--platform activity-container-center-table--border"
              border='0' cellspacing='0' cellpadding='0'>
              <thead>
              <tr>
                <th>
                  日有效投注额
                </th>
                <th>
                  返水比例
                </th>
              </tr>
              </thead>
              <tbody>
              <tr v-for='(item,index) in activityPlatformInfo.config.itemList["AG捕鱼"]' :key="index">
                <td>{{item.validRebateAmount}}</td>
                <td>{{item.rebateRate}}</td>
              </tr>
              </tbody>
            </table>
          </template>

        </activity-container-center>
        <activity-container-center
          v-if='activityPlatformInfo&&activityPlatformInfo.config&&activityPlatformInfo.config.itemList["188体育"]'>
          <template slot='title'>
            <div class="activity-container-center__title">
              贝博体育
            </div>
          </template>
          <template slot='table'>
            <table
              class="activity-container-center-table activity-container-center-table--platform activity-container-center-table--border"
              border='0' cellspacing='0' cellpadding='0'>
              <thead>
              <tr>
                <th>
                  日有效投注额
                </th>
                <th>
                  返水比例
                </th>
              </tr>
              </thead>
              <tbody>
              <tr v-for='(item,index) in activityPlatformInfo.config.itemList["188体育"]' :key="index">
                <td>{{item.validRebateAmount}}</td>
                <td>{{item.rebateRate}}</td>
              </tr>
              </tbody>
            </table>
          </template>

        </activity-container-center>
        <activity-container-center
          v-if='activityPlatformInfo&&activityPlatformInfo.config&&activityPlatformInfo.config.itemList["PT电子"]'>
          <template slot='title'>
            <div class="activity-container-center__title">
              PT电子
            </div>
          </template>
          <template slot='table'>
            <table
              class="activity-container-center-table activity-container-center-table--platform activity-container-center-table--border"
              border='0' cellspacing='0' cellpadding='0'>
              <thead>
              <tr>
                <th>
                  日有效投注额
                </th>
                <th>
                  返水比例
                </th>
              </tr>
              </thead>
              <tbody>
              <tr v-for='(item,index) in activityPlatformInfo.config.itemList["PT电子"]' :key="index">
                <td>{{item.validRebateAmount}}</td>
                <td>{{item.rebateRate}}</td>
              </tr>
              </tbody>
            </table>
          </template>

        </activity-container-center>
        <activity-container-center
          v-if='activityPlatformInfo&&activityPlatformInfo.config&&activityPlatformInfo.config.itemList["EBET真人"]'>
          <template slot='title'>
            <div class="activity-container-center__title">
              EBET真人
            </div>
          </template>
          <template slot='table'>
            <table
              class="activity-container-center-table activity-container-center-table--platform activity-container-center-table--border"
              border='0' cellspacing='0' cellpadding='0'>
              <thead>
              <tr>
                <th>
                  日有效投注额
                </th>
                <th>
                  返水比例
                </th>
              </tr>
              </thead>
              <tbody>
              <tr v-for='(item,index) in activityPlatformInfo.config.itemList["EBET真人"]' :key="index">
                <td>{{item.validRebateAmount}}</td>
                <td>{{item.rebateRate}}</td>
              </tr>
              </tbody>
            </table>
          </template>

        </activity-container-center>
        <activity-container-center
          v-if='activityPlatformInfo&&activityPlatformInfo.config&&activityPlatformInfo.config.itemList["LB彩票"]'>
          <template slot='title'>
            <div class="activity-container-center__title">
              LB彩票
            </div>
          </template>
          <template slot='table'>
            <table
              class="activity-container-center-table activity-container-center-table--platform activity-container-center-table--border"
              border='0' cellspacing='0' cellpadding='0'>
              <thead>
              <tr>
                <th>
                  日有效投注额
                </th>
                <th>
                  返水比例
                </th>
              </tr>
              </thead>
              <tbody>
              <tr v-for='(item,index) in activityPlatformInfo.config.itemList["LB彩票"]' :key="index">
                <td>{{item.validRebateAmount}}</td>
                <td>{{item.rebateRate}}</td>
              </tr>
              </tbody>
            </table>
          </template>

        </activity-container-center>
        <activity-container-bottom>
          <div class="activity-container-bottom-text activity-container-bottom-text--platfrom">
            <div class="activity-container-bottom-text__inner">
              <div class="activity-container-bottom__title">
                申请方式
              </div>
              <ul class="activity-container-bottom-text__ul">
                <li>1、本活动与平台其它活动流水共享，满足条件即可参加。</li>
                <li>2、返水计算天期为：前一天凌晨(北京时间00:00 am)至当天 凌晨(北京时间00:00 am)的返水报表。</li>
                <li>3、返水每日下午(北京时间15:00 pm)前左右自动派发、无需 申请，无需流水即可提款。</li>
                <li>4、返水金额=(日总有效流水-某些特定优惠活动需要完成的有效流水)*返水比例。</li>
                <li>5、有效流水定义：相应类型游戏流水，任何对押、和局、无效的、投注失败的、未产生输赢结果的投注不计算为有效流水（体育类港赔0.75 / 欧赔1.75以下的投注、真人类和局投注、电子类内的棋牌游戏如百家乐/21点等的投注、彩票类撤单、棋牌类退回等注单不计算为有效流水）。</li>
                <li>6、每位真实有效玩家/每一手机号码/电子邮箱/户籍地址/现居地址/同一银行卡/每一IP地址/每一台电脑或上网设备，仅能参加并享受一次该活动，违规不享受该活动。</li>
                <li>7、此活动为平台提供给真实玩家的福利，任何用户或团体以不正常的方式投注、套取活动优惠，平台保留在不通知的情况下冻结账户的权利，并不退还款项。</li>
                <li>8、Ballbet贝博有权对该活动进行修改、暂停、取消等，无需特别通知，并保留对该活动的最终解释权。</li>
              </ul>
            </div>
            <!--<div class="activity-container-bottom-text__inner">-->
              <!--<div class="activity-container-bottom__title">-->
                <!--备注-->
              <!--</div>-->
              <!--<ul class="activity-container-bottom-text__ul">-->
                <!--<li>如若不清楚当日自然有效投注额度，可在“资金明细-返水”内 查询或咨询24小时在线客服。</li>-->
              <!--</ul>-->
            <!--</div>-->
            <!--<div class="activity-container-bottom-text__inner">-->

              <!--<ul class="activity-container-bottom-text__ul">-->
                <!--<li>活动最终解释权归Ballbet体育所有</li>-->
              <!--</ul>-->
            <!--</div>-->
          </div>
        </activity-container-bottom>

      </div>
    </div>

  </div>
</template>

<script>
  import activityContainerHeader from "../components/activity-container-header";

  import activityContainerCenter from "../components/activity-container-center";

  import activityContainerBottom from "../components/activity-container-bottom";

  import {activityPlatformInfoApi} from "@/services/api/activity";

  import {form, activity} from "@/mixins/index";


  export default {
    name: "activity-rebate",

    mixins: [form, activity],

    data() {
      return {
        activityPlatformInfo: {}
      };
    },
    components: {
      activityContainerHeader,
      activityContainerCenter,
      activityContainerBottom
    },
    mounted() {
      this.bindGet(activityPlatformInfoApi, "activityPlatformInfo", {
        afterSuccess: ([result, data]) => {
          if (result) {
            this.activityPlatformInfo = data;
            let arr = {
              AG真人: [],
              AG捕鱼: [],
              "188体育": [],
              PT电子: [],
              EBET真人: [],
              'LB彩票':[]
            };
            for (let item of data.config.itemList) {
              if (item.gameType === "1")
                arr["AG真人"].push({
                  validRebateAmount: item.validRebateAmount,
                  rebateRate: (Number(item.rebateRate) * 100).toFixed(2) + "%"
                });
              if (item.gameType === "2")
                arr["AG捕鱼"].push({
                  validRebateAmount: item.validRebateAmount,
                  rebateRate: (Number(item.rebateRate) * 100).toFixed(2) + "%"
                });
              if (item.gameType === "3")
                arr["188体育"].push({
                  validRebateAmount: item.validRebateAmount,
                  rebateRate: (Number(item.rebateRate) * 100).toFixed(2) + "%"
                });
              if (item.gameType === "4")
                arr["PT电子"].push({
                  validRebateAmount: item.validRebateAmount,
                  rebateRate: (Number(item.rebateRate) * 100).toFixed(2) + "%"
                });
              if (item.gameType === "5")
                arr["EBET真人"].push({
                  validRebateAmount: item.validRebateAmount,
                  rebateRate: (Number(item.rebateRate) * 100).toFixed(2) + "%"
                });
              if (item.gameType === "8")
                arr["LB彩票"].push({
                  validRebateAmount: item.validRebateAmount,
                  rebateRate: (Number(item.rebateRate) * 100).toFixed(2) + "%"
                });
            }
            this.activityPlatformInfo.config.itemList = arr;
          }
        }
      });

      this.getAll();
    }
  };
</script>


<style lang="scss" scoped>
  $-font-family: "Helvetica";
  @include b(sports-container) {
    background: #000000;
    @include e(wrapper) {
      @include utils-bg(url("./bg.png") no-repeat top, contain);
      width: 100%;
      padding-top: 408px;
      padding-bottom: 49px;
    }
    @include e(inner) {
      margin: 0 13px;
    }
  }
</style>
