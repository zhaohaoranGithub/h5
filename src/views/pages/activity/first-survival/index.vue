<template>
  <div class="sports-container">
    <div class="sports-container__wrapper">
      <div class="sports-container__inner">
        <activity-container-header>
          <div class="activity-container-header__wrapper activity-container-header__wrapper--survival">
            <div class="activity-container-header__cell">
              <div class="activity-container-header-inner activity-container-header-inner--survival">
                <div class="activity-container-header-inner__brief">开始时间</div>
                <div class="activity-container-header-inner__title">
                  <template v-if='activityRechargeInfo&&activityRechargeInfo.startTime'>
                    {{activityRechargeInfo.startTime|toTime('YYYY-MM-DD')}}
                  </template>
                </div>
              </div>
              <div class="activity-container-header-inner activity-container-header-inner--survival">
                <div class="activity-container-header-inner__brief">结束时间</div>
                <div class="activity-container-header-inner__title">
                  <template v-if='activityRechargeInfo&&activityRechargeInfo.endTime'>
                    {{activityRechargeInfo.endTime|toTime('YYYY-MM-DD')}}
                  </template>
                </div>
              </div>
            </div>
            <div class="activity-container-header__cell">
              <div class="activity-container-header-inner activity-container-header-inner--survival">
                <div class="activity-container-header-inner__brief">参与方式</div>
                <div class="activity-container-header-inner__title">自动参与</div>
              </div>
              <div class="activity-container-header-inner activity-container-header-inner--survival">
                <div class="activity-container-header-inner__brief">适用平台
                </div>
                <div class="activity-container-header-inner__title">
                  <template v-if='activityRechargeInfo&&activityRechargeInfo.gameType'>
                    {{activityRechargeInfo.gameType|returnShowPlatform}}
                  </template>
                </div>
              </div>
            </div>
          </div>
        </activity-container-header>
        <activity-container-center>

          <template slot='table' v-if='activityRechargeInfo&&activityRechargeInfo.config&&activityRechargeInfo.config.itemList'>
            <table class="activity-container-center-table activity-container-center-table--survival" border='0' cellspacing='0' cellpadding='0'>
              <thead>
                <tr>
                  <th>
                    首存金额
                  </th>
                  <th>
                    累计有效投注额
                  </th>
                  <th>
                    奖金金额
                  </th>

                </tr>
              </thead>
              <tbody>
                <tr v-for='(item,index) in activityRechargeInfo.config.itemList' :key="index">
                  <td>{{item.recharge}}</td>
                  <td>{{item.bet}}</td>
                  <td>{{item.amount}}</td>
                </tr>

              </tbody>
            </table>
          </template>

        </activity-container-center>
        <activity-container-center v-if='isLogin'>
          <template slot='table'>
            <table class="activity-container-center-table activity-container-center-table--survival" border="0" cellspacing='0' cellpadding='0'>
              <thead>
                <tr>
                  <th>
                    我的首存额
                  </th>
                  <th>
                    累计有效投注额
                  </th>
                  <th>
                    可领取奖金
                  </th>
                  <th>
                    操作
                  </th>
                </tr>
              </thead>
              <tbody>

                <tr>
                  <td>{{activityRechargeInfo.recharge}}</td>
                  <td>{{activityRechargeInfo.bet}}</td>
                  <td>{{activityRechargeInfo.amount}}</td>
                  <td>
                    <a class="table-cell table-cell--button" @click="_receive()" v-if='activityRechargeInfo.status===0'>
                      领取
                    </a>
                    <template v-else>
                      {{activityRechargeInfo.status|returnStatusText}}
                    </template>
                  </td>
                </tr>

              </tbody>
            </table>
          </template>

        </activity-container-center>
        <activity-container-bottom>

          <div class="activity-container-bottom-text activity-container-bottom-text--survival">
            <div class="activity-container-bottom-text__inner">
              <div class="activity-container-bottom__title">
                活动说明：
              </div>
              <ul class="activity-container-bottom-text__ul">
                <li>1、本活动与“返水优惠”共享。</li>
                <li>2、首次存款未达到100元，视为自动放弃此活动，活动将自动作废</li>
                <li>3、奖励需手动领取，奖金无需额外投注即可提款。</li>
                <li>4、有效流水定义：全平台流水，任何对押、和局、无效的、投注失败的、未产生输赢结果的投注不计算为有效流水（体育类港赔0.75 / 欧赔1.75以下的投注、真人类和局投注、电子类内的棋牌游戏如百家乐/21点等的投注不计算为有效流水）。</li>
                <li>5、每位真实有效玩家/每一手机号码/电子邮箱/户籍地址/现居地址/同一银行卡/每一IP地址/每一台电脑或上网设备，仅能参加并享受一次该活动，违规不享受该活动。</li>
                <li>6、此活动为平台提供给真实玩家的福利，任何用户或团体以不正常的方式投注、套取活动优惠，平台保留在不通知的情况下冻结账户的权利，并不退还款项。</li>
                <li>7、Ballbet贝博有权对该活动进行修改、暂停、取消等，无需特别通知，并保留对该活动的最终解释权。</li>
              </ul>
            </div>
            <!--<div class="activity-container-bottom-text__inner">-->
              <!--<div class="activity-container-bottom__title">-->
                <!--备注-->
              <!--</div>-->
              <!--<ul class="activity-container-bottom-text__ul">-->
                <!--<li>如若不清楚当日自然有效投注额度，可在“资金明细”内 查询或咨询24小时在线客服。</li>-->
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

import { form, activity } from "@/mixins/index";

import Raven from "raven-js";

import {
  activityRechargeInfoApi,
  activityRechargeAwardApi
} from "@/services/api/activity";

export default {
  name: "first-survival",

  mixins: [form, activity],

  data() {
    return {
      activityRechargeInfo: {}
    };
  },
  components: {
    activityContainerHeader,
    activityContainerCenter,
    activityContainerBottom
  },
  mounted() {
    this.bindGet(activityRechargeInfoApi, "activityRechargeInfo", {
      action: "getActivityRechargeInfo",
      afterSuccess: ([result, data]) => {
        if (result) {
          this.activityRechargeInfo = data;
        }
      }
    });
    this.bindSave(activityRechargeAwardApi, "save",{} ,{
      successMessage:"领取成功",
      afterSuccess: () => {
        this.$nextTick(() => {
          this.doAction({ type: "get", action: "getActivityRechargeInfo" });
        });
      },
    });
    this.doAction({ type: "get", action: "getActivityRechargeInfo" });
  }
};
</script>


<style lang="scss" scoped>
$-font-family: "Helvetica";
@include b(sports-container) {
  @include e(wrapper) {
    @include utils-bg(url("./bg.jpg") no-repeat top, cover);
    width: 100%;
    padding-top: 408px;
    padding-bottom: 49px;
  }
  @include e(inner) {
    margin: 0 13px;
  }
}
</style>
