<template>
  <div class="sports-container">
    <div class="sports-container__wrapper">
      <div class="sports-container__header">

        <activity-container-header>
          <div class="activity-container-header__wrapper activity-container-header__wrapper--green">
            <div class="activity-container-header__cell activity-container-header__cell--block">
              <div class="activity-container-header-inner">
                <div class="activity-container-header-inner__brief">开始时间</div>
                <div class="activity-container-header-inner__title">
                  <template v-if='activitySportsInfo&&activitySportsInfo.startTime'>
                    {{activitySportsInfo.startTime|toTime('YYYY-MM-DD')}}
                  </template>
                </div>
              </div>
              <div class="activity-container-header-inner">
                <div class="activity-container-header-inner__brief">结束时间</div>
                <div class="activity-container-header-inner__title">
                  <template v-if='activitySportsInfo&&activitySportsInfo.endTime'>
                    {{activitySportsInfo.endTime|toTime('YYYY-MM-DD')}}
                  </template>
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
                  <template v-if='activitySportsInfo&&activitySportsInfo.gameType'>
                    {{activitySportsInfo.gameType|returnShowPlatform}}
                  </template>
                </div>
              </div>
            </div>
          </div>
        </activity-container-header>
      </div>
      <div class="sports-container__inner">

        <activity-container-center>

          <template slot='table'
                    v-if='activitySportsInfo&&activitySportsInfo.config&&activitySportsInfo.config.itemList'>
            <table
              class="activity-container-center-table activity-container-center-table--border activity-container-center-table--green"
              border='0' cellspacing='0' cellpadding='0'>
              <thead>
              <tr>
                <th>
                  平台
                </th>
                <th>
                  周体育总有效投注额
                </th>
                <th>
                  奖金金额
                </th>

              </tr>
              </thead>
              <tbody>
              <tr v-for='(item,index) in activitySportsInfo.config.itemList' :key="index">
                <td :rowspan='activitySportsInfo.config.itemList.length' v-if='index===0'>
                  <template v-if='activitySportsInfo&&activitySportsInfo.gameType'>
                    {{activitySportsInfo.gameType|returnShowPlatform}}
                  </template>
                </td>
                <td>{{item.bet}}</td>
                <td>{{item.amount}}</td>
              </tr>
              </tbody>
            </table>
          </template>

        </activity-container-center>

        <activity-container-center v-if='isLogin'>
          <template slot='title'>
            <div class="activity-container-center__title">
              <template v-if='rewardList'>
                我的奖金详情：（已经累计领取奖金：{{rewardList.amount}}元）
              </template>
            </div>

          </template>
          <template slot='cell'>
            <div class="activity-container-center-cell" v-for='(item,index) in rewardList.list' :key="index">
              <div class="activity-container-center-cell__head">
                {{item.week}}
              </div>
              <div class="activity-container-center-cell__body">
                <div class="center-cell-body-inner">
                  <div class="center-cell-body-inner__title">
                    {{item.bet}}
                  </div>
                  <div class="center-cell-body-inner__brief">累计有效投注额</div>
                </div>
                <div class="center-cell-body-inner">
                  <div class="center-cell-body-inner__title">
                    {{item.amount}}
                  </div>
                  <div class="center-cell-body-inner__brief">可领取奖金</div>
                </div>
                <div class="center-cell-body-inner">
                  <a class="table-cell table-cell--tiger" @click="_receive()" v-if='item.status===0'>
                    领取
                  </a>
                  <template v-else>
                    <div class="center-cell-body-inner__title">
                      {{item.status|returnStatusText}}
                    </div>

                  </template>
                </div>
              </div>
            </div>

          </template>
        </activity-container-center>
        <activity-container-bottom>
          <div class="activity-container-bottom-text activity-container-bottom-text--green">
            <div class="activity-container-bottom-text__inner">
              <ul class="activity-container-bottom-text__ul">
                <li>活动说明：</li>
                <li>1、本活动与“返水优惠”流水共享，流水统计周期为自然周（周一00:00:00至周日23:59:59）</li>
                <li>2、奖励需手动领取，本周领取上周的奖励，如未领取视为弃奖。</li>
                <li>3、每周一凌晨00:00:00统一计算上周体育总有效投注额，如有延迟，请稍后再查看。</li>
                <li>4、发放的奖励，无任何流水限制，只要达到提现要求，即可提现。</li>
                <li>5、有效流水定义：需为体育流水，任何平局、取消的赛事投注，任何未产生输赢结果的、投注失败的、对押的投注，任何体育类港赔0.75 / 欧赔1.75以下的投注不计算有效流水。</li>
                <li>6、每位真实有效玩家/每一手机号码/电子邮箱/户籍地址/现居地址/同一银行卡/每一IP地址/每一台电脑或上网设备，仅能参加并享受一次该活动，违规不享受该活动。</li>
                <li>7、此活动为平台提供给真实玩家的福利，任何用户或团体以不正常的方式投注、套取活动优惠，平台保留在不通知的情况下冻结账户的权利，并不退还款项。</li>
                <li>8、Ballbet贝博有权对该活动进行修改、暂停、取消等，无需特别通知，并保留对该活动的最终解释权。</li>
              </ul>
            </div>
          </div>
        </activity-container-bottom>
        <!--<activity-container-bottom>-->
          <!--<div class="activity-container-bottom-text activity-container-bottom-text&#45;&#45;green">-->
            <!--<div class="activity-container-bottom-text__inner">-->
              <!--<ul class="activity-container-bottom-text__ul">-->
                <!--<li>体育平台有效投注规则：</li>-->
                <!--<li>1. ballBET体育仅对已结算并产生输赢结果的投注额进行计算。</li>-->
                <!--<li>2.任何走盘、取消的赛事、对押等(包括串关和单双)的投注将不计算在有效流水内。</li>-->
              <!--</ul>-->
            <!--</div>-->
            <!--<div class="activity-container-bottom-text__inner">-->
              <!--<ul class="activity-container-bottom-text__ul">-->
                <!--<li>备注:</li>-->
                <!--<li> 如若对此活动有任何疑问，可在咨询24小时在线客服。</li>-->
                <!--<li>活动最终解释权归Ballbet体育所有</li>-->
              <!--</ul>-->
            <!--</div>-->

          <!--</div>-->
        <!--</activity-container-bottom>-->
      </div>
    </div>

  </div>
</template>

<script>
  import activityContainerHeader from "../components/activity-container-header";

  import activityContainerCenter from "../components/activity-container-center";

  import activityContainerBottom from "../components/activity-container-bottom";

  import {form, activity} from "@/mixins/index";

  import {
    activitySportsInfoApi,
    activitySportsAwardApi,
    activitySportsListApi
  } from "@/services/api/activity";

  export default {
    name: "activity-sports",

    mixins: [form, activity],

    data() {
      return {
        activitySportsInfo: {}
      };
    },
    components: {
      activityContainerHeader,
      activityContainerCenter,
      activityContainerBottom
    },

    created() {
      this.bindGet(activitySportsInfoApi, "activitySportsInfo", {
        afterSuccess: ([result, data]) => {
          if (result) {
            this.activitySportsInfo = data;
          }
        }
      });
      if (this.isLogin) {
        this.bindGet(activitySportsListApi, "rewardList", {
          afterSuccess: ([result, data]) => {
            if (result) {
              this.rewardList = data;
            }
          }
        });
      }

      this.bindSave(activitySportsAwardApi, "save", {},{
        successMessage: "领取奖励成功"
      });
    },
    mounted() {
      setTimeout(() => {
        this.getAll();
      }, 500);
    }
  };
</script>


<style lang="scss" scoped>
  $-font-family: "Helvetica";
  @include b(sports-container) {
    height: auto;
    background: url("./pic-bg.jpg") repeat-y center center;
    @include e(header) {
      padding: 0 13px;
    }
    @include e(wrapper) {
      width: 100%;
      background: url("./bg.jpg") no-repeat top center;
      background-size: contain;
      /*height: 605px;*/
    }
    @include e(inner) {
      padding: 0 13px;
      padding-bottom: 49px;
      @include utils-bg(url("./pic-bg.jpg") repeat center);
    }
    @include b(activity-container-header) {
      padding-top: 408px;
    }
  }

  @include b(aaaa) {
    opacity: 0.05;
  }
</style>
