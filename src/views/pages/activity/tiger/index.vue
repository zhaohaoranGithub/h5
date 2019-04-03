<template>
  <div class="sports-container">
    <div class="sports-container__main-bg"></div>
    <div class="sports-container__wrapper">
      <div class="sports-container__inner">
        <activity-container-header>
          <div class="activity-container-header__wrapper activity-container-header__wrapper--tiger">
            <div class="activity-container-header__cell">
              <div class="activity-container-header-inner">
                <div class="activity-container-header-inner__brief">开始时间</div>
                <div class="activity-container-header-inner__title">
                  <template v-if='activityRescueInfo&&activityRescueInfo.startTime'>
                    {{activityRescueInfo.startTime|toTime('YYYY-MM-DD')}}
                  </template>
                </div>

              </div>
              <div class="activity-container-header-inner">
                <div class="activity-container-header-inner__brief">结束时间</div>
                <div class="activity-container-header-inner__title">
                  <template v-if='activityRescueInfo&&activityRescueInfo.endTime'>
                    {{activityRescueInfo.endTime|toTime('YYYY-MM-DD')}}
                  </template>
                </div>

              </div>
            </div>
            <div class="activity-container-header__cell">
              <div class="activity-container-header-inner">
                <div class="activity-container-header-inner__brief">参与方式</div>
                <div class="activity-container-header-inner__title">自动参与</div>

              </div>
              <div class="activity-container-header-inner">
                <div class="activity-container-header-inner__brief">适用平台</div>
                <div class="activity-container-header-inner__title">
                  <template v-if='activityRescueInfo&&activityRescueInfo.gameType'>
                    {{activityRescueInfo.gameType|returnShowPlatform}}
                  </template>
                </div>

              </div>
            </div>
          </div>
        </activity-container-header>
        <activity-container-center>
          <template slot='table'
                    v-if='activityRescueInfo&&activityRescueInfo.config&&activityRescueInfo.config.itemList'>
            <table
              class="activity-container-center-table activity-container-center-table--border activity-container-center-table--tiger"
              border='0' cellspacing='0' cellpadding='0'>
              <thead>
              <tr>
                <th>
                  平台
                </th>
                <th>
                  负盈利
                </th>
                <th>
                  救援金比例
                </th>
                <th>
                  奖金上限
                </th>
              </tr>
              </thead>
              <tbody>
              <tr v-for='(item,index) in activityRescueInfo.config.itemList' :key="index">
                <td :rowspan='activityRescueInfo.config.itemList.length' v-if='index===0'>
                  <template v-if='activityRescueInfo&&activityRescueInfo.gameType'>
                    {{activityRescueInfo.gameType|returnShowPlatform}}
                  </template>
                </td>
                <td>{{item.loss}}</td>
                <td>{{item.rescue}}%</td>
                <td>{{item.amount}}</td>
              </tr>

              </tbody>
            </table>
          </template>

        </activity-container-center>

        <activity-container-center v-if='isLogin'>
          <template slot='title'>
            <div class="activity-container-center__title">
              我的奖金详情：（已经累计领取奖金：{{rewardList.amount}}元）
            </div>

          </template>
          <template slot='cell'>
            <div class="activity-container-center-cell activity-container-center-cell--tiger"
                 v-for='(item,index) in rewardList.list' :key="index">
              <div class="activity-container-center-cell__head">
                {{item.day}}
              </div>
              <div class="activity-container-center-cell__body">
                <div class="activity-container-center-cell__body">
                  <div class="center-cell-body-inner">
                    <div class="center-cell-body-inner__title">{{item.loss}}</div>
                    <div class="center-cell-body-inner__brief">每日盈亏统计</div>
                  </div>
                  <div class="center-cell-body-inner">
                    <div class="center-cell-body-inner__title">{{item.rescue}}</div>
                    <div class="center-cell-body-inner__brief">救援金比例</div>
                  </div>
                  <div class="center-cell-body-inner">
                    <div class="center-cell-body-inner__title">{{item.amount}}</div>
                    <div class="center-cell-body-inner__brief">可领取奖金</div>
                  </div>
                  <div class="center-cell-body-inner">
                    <a class="table-cell table-cell--immortal" @click="_receive()" v-if='item.status===0'>
                      领取
                    </a>
                    <template v-else>
                      <div class="center-cell-body-inner__brief">
                        {{item.status|returnStatusText}}
                      </div>
                    </template>
                  </div>
                </div>
              </div>

            </div>

          </template>
        </activity-container-center>
        <activity-container-bottom>
          <div class="activity-container-bottom-text activity-container-bottom-text--tiger">
            <div class="activity-container-bottom-text__inner">
              <ul class="activity-container-bottom-text__ul">
                <li>活动说明</li>
                <li>1、本活动与“返水优惠”共享。</li>
                <li>2、用户需第二天领取前一天的奖励，如未领取视为弃奖。</li>
                <li>3、奖励需手动领取，奖金无需额外投注即可提款。</li>
                <li>4、有效流水定义：需为电子游戏流水，任何对押、和局、未产生输赢结果、电子游戏内棋牌类游戏如百家乐/21点等无效的投注不计算为有效流水。</li>
                <li>5、每位真实有效玩家/每一手机号码/电子邮箱/户籍地址/现居地址/同一银行卡/每一IP地址/每一台电脑或上网设备，仅能参加并享受一次该活动，违规不享受该活动。</li>
                <li>6、此活动为平台提供给真实玩家的福利，任何用户或团体以不正常的方式投注、套取活动优惠，平台保留在不通知的情况下冻结账户的权利，并不退还款项。</li>
                <li>7、Ballbet贝博有权对该活动进行修改、暂停、取消等，无需特别通知，并保留对该活动的最终解释权。</li>
              </ul>
            </div>

          </div>
        </activity-container-bottom>
        <!--<activity-container-bottom>-->
          <!--<div class="activity-container-bottom-text activity-container-bottom-text&#45;&#45;tiger">-->
            <!--<div class="activity-container-bottom-text__inner">-->
              <!--<ul class="activity-container-bottom-text__ul">-->
                <!--<li>老虎机救援金规则：</li>-->
                <!--<li>1.每天在电子老虎机中产生总负盈利，将获得最高负盈利的 5%进行返还.</li>-->
                <!--<li>2.此优惠金只计算在“经典老虎机/电动老虎机”里面进行的投注.</li>-->
                <!--<li>3.救援金最低派发金额为1元，最高5088元.</li>-->
              <!--</ul>-->
            <!--</div>-->
            <!--<div class="activity-container-bottom-text__inner">-->
              <!--<ul class="activity-container-bottom-text__ul">-->
                <!--<li>备注:</li>-->
                <!--<li> 如若对此活动有任何疑问，可在咨询24小时在线客服。</li>-->

              <!--</ul>-->
            <!--</div>-->
            <!--&lt;!&ndash;<div class="activity-container-bottom-text__inner">&ndash;&gt;-->
              <!--&lt;!&ndash;<ul class="activity-container-bottom-text__ul">&ndash;&gt;-->
                <!--&lt;!&ndash;<li>活动最终解释权归Ballbet体育所有</li>&ndash;&gt;-->

              <!--&lt;!&ndash;</ul>&ndash;&gt;-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->

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
    activityRescueInfoApi,
    activityRescueAwardApi,
    activityRescueListApi
  } from "@/services/api/activity";

  export default {
    name: "activity-tiger",

    mixins: [form, activity],

    data() {
      return {
        activityRescueInfo: {}
      };
    },
    components: {
      activityContainerHeader,
      activityContainerCenter,
      activityContainerBottom
    },
    mounted() {
      this.bindGet(activityRescueInfoApi, "activityRescueInfo", {
        afterSuccess: ([result, data]) => {
          if (result) {
            this.activityRescueInfo = data;
          }
        }
      });
      if (this.isLogin) {
        this.bindGet(activityRescueListApi, "rewardList", {
          afterSuccess: ([result, data]) => {
            if (result) {
              this.rewardList = data;
            }
          }
        });
      }

      this.bindSave(activityRescueAwardApi, "save",{}, {
        successMessage: "领取奖励成功"
      });
      setTimeout(() => {
        this.getAll();
      }, 500);
    }
  };
</script>


<style lang="scss" scoped>
  $-font-family: "Helvetica";
  @include b(sports-container) {
    @include e(main-bg) {
      width: 100%;
      height: 444px;
      @include utils-bg(url("./bg.jpg") no-repeat top, cover);
      position: absolute;
      top: 0;
    }
    @include e(wrapper) {
      width: 100%;
      padding-top: 408px;
      padding-bottom: 49px;
      background: #0d1828;
    }
    @include e(inner) {
      margin: 0 13px;
    }
  }
</style>
