<template>
  <div class="sports-container">
    <div class="sports-container__wrapper">
      <div class="sports-container__inner">
        <activity-container-header>
          <div class="activity-container-header__wrapper activity-container-header__wrapper--immortal">
            <div class="activity-container-header__cell activity-container-header__cell--block">
              <div class="activity-container-header-inner">
                <div class="activity-container-header-inner__brief">开始时间</div>
                <div class="activity-container-header-inner__title">
                  <template v-if='activityWinInfo&&activityWinInfo.startTime'>
                    {{activityWinInfo.startTime|toTime('YYYY-MM-DD')}}
                  </template>
                </div>
              </div>
              <div class="activity-container-header-inner">
                <div class="activity-container-header-inner__brief">结束时间</div>
                <div class="activity-container-header-inner__title">
                  <template v-if='activityWinInfo&&activityWinInfo.endTime'>
                    {{activityWinInfo.endTime|toTime('YYYY-MM-DD')}}
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
                <!-- <div class="activity-container-header-inner__title">AG真人,eBET真人平台</div> -->
                <div class="activity-container-header-inner__title">
                  <template v-if='activityWinInfo&&activityWinInfo.gameType'>
                    {{_returnShowPlatform(activityWinInfo.gameType)}}
                  </template>
                </div>
              </div>
            </div>
          </div>
        </activity-container-header>
        <activity-container-center>

          <template slot='table' v-if='activityWinInfo&&activityWinInfo.config&&activityWinInfo.config.itemList'>
            <table
              class="activity-container-center-table activity-container-center-table--border activity-container-center-table--immortal"
              border='0' cellspacing='0' cellpadding='0'>
              <thead>
              <tr>
                <th>
                  平台
                </th>
                <th>
                  单注金额
                </th>
                <th>
                  连赢次数
                </th>
                <th>
                  奖金金额
                </th>

              </tr>
              </thead>
              <tbody>
              <tr v-for='(item,index) in activityWinInfo.config.itemList' :key="index">
                <td :rowspan='activityWinInfo.config.itemList.length' v-if='index===0'>
                  <template v-if='activityWinInfo&&activityWinInfo.gameType'>
                    {{_returnShowPlatform(activityWinInfo.gameType)}}
                  </template>
                </td>
                <td>{{item.bet}}</td>
                <td>{{item.times}}</td>
                <td>{{item.amount}}</td>
              </tr>

              </tbody>
            </table>
          </template>

        </activity-container-center>
        <activity-container-bottom>
          <div class="activity-container-bottom-text activity-container-bottom-text--immortal">
            <div class="activity-container-bottom-text__inner">
              <ul class="activity-container-bottom-text__ul">
                <li>1.本活动与“返水优惠”共享。</li>
                <li>2.系统每天凌晨00:00:00自动统计上一日的真人投注连赢最 大次数，并显示在“我的奖金详情”报表中。</li>
                <li>3.奖励领取是本周领取上周的奖励，若是本周没有领取上周的奖励，则系统认为用户自动放弃领奖，领奖状态变更为未领取。</li>
                <li>4.每周一凌晨00:00:00统一计算上周体育总有效投注额。</li>
                <li>5.用户自助领取奖金，奖金无需投注即可提款。</li>
              </ul>
            </div>

          </div>
        </activity-container-bottom>
        <activity-container-center v-if='isLogin'>
          <template slot='title'>
            <div class="activity-container-center__title">
              我的奖金详情：（已经累计领取奖金：{{rewardList.amount}}元)
            </div>

          </template>
          <template slot='cell'>
            <div class="activity-container-center-cell activity-container-center-cell--immortal"
                 v-for='(item,index) in rewardList.list' :key="index">
              <div class="activity-container-center-cell__head">
                {{item.day|toTime('YYYY-MM-DD')}}
              </div>
              <div class="activity-container-center-cell__body">
                <div class="center-cell-body-inner">
                  <div class="center-cell-body-inner__title">{{item.bet}}</div>
                  <div class="center-cell-body-inner__brief">累计有效投注额</div>
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
                    {{_returnStatusText(item.status)}}
                  </template>
                </div>
              </div>
            </div>

          </template>
        </activity-container-center>
        <activity-container-bottom>
          <div class="activity-container-bottom-text activity-container-bottom-text--immortal">
            <div class="activity-container-bottom-text__inner">
              <ul class="activity-container-bottom-text__ul">
                <li>真人平台连赢规则：</li>
                <li>1.此优惠仅针对在AG真人平台/eBET真人平台，其中单个平 台内投注真人百家乐游戏连续产生连赢的会员，如果投注其 它游戏连赢，是无法获得此优惠的奖金。</li>
                <li>2.此优惠连赢仅计算百家乐游戏中的"庄"/"闲"投注玩法，如 果投注百家乐游戏的其它玩法无论输赢均无法参与此优惠。</li>
                <li>3.游戏过程中如出现和局不影响连赢，但是不计算在连赢局 数之内。</li>
                <li>4.局号相同的多个注单仅计算下注金额最高的注单，其他注 单不计算在连赢场次内。</li>
              </ul>
            </div>

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

  import {form, activity} from "@/mixins/index";

  import {
    activityWinInfoApi,
    activityWinAwardApi,
    activityWinListApi
  } from "@/services/api/activity";

  export default {
    name: "activity-immortal",

    mixins: [form, activity],

    data() {
      return {
        activityWinInfo: {},
        show: false
      };
    },
    components: {
      activityContainerHeader,
      activityContainerCenter,
      activityContainerBottom
    },
    mounted() {
      this.bindGet(activityWinInfoApi, "activityWinInfo", {
        action: "getActivityWinInfo",
        afterSuccess: ([result, data]) => {
          if (result) {
            this.activityWinInfo = data;
          }
        }
      });
      this.bindGet(activityWinListApi, "rewardList", {
        afterSuccess: ([result, data]) => {
          if (result) {
            this.rewardList = data;
          }
        }
      });
      this.bindSave(activityWinAwardApi, 'save',{}, {
        successMessage: '领取奖励成功',
        afterSuccess: () => {
          this.$nextTick(() => {
            this.doAction({ type: "get", action: "getActivityWinInfo" });
          });
        }
      });

      this.getAll();
    }
  };
</script>


<style lang="scss" scoped>
  $-font-family: "Helvetica";
  @include b(sports-container) {
    @include e(wrapper) {
      @include utils-bg(url("./bg.png") no-repeat top, cover);
      width: 100%;
      padding-top: 408px;
      padding-bottom: 49px;
    }
    @include e(inner) {
      margin: 0 13px;
    }
  }
</style>
