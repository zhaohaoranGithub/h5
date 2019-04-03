<template>
  <div class="activity-realpass">
    <div class="activity-realpass__bg"></div>
    <div class="activity-realpass-inner">
      <div class="activity-realpass-inner-header">
        <p class="activity-realpass-inner-header__text">
          所有用户都可参与真人闯关活动，只要有投注就可以领取闯关奖金，通关每期最高可拿到
          <span>{{mountTotal}}元</span>大奖，全年最高可拿
          <span>{{mountTotal*12}}元</span>终极大奖
        </p>
        <p class="activity-realpass-inner-header__text">
          每期最低投注额为
          <span v-if='activityRealOvercomeInfo&&activityRealOvercomeInfo.levelList'>{{activityRealOvercomeInfo.levelList[0].bet}}元</span>有效值投注，凡是参与真人游戏投注，即可领取闯关奖励
        </p>
      </div>
      <div class="activity-realpass-table">
        <div class="activity-realpass-table__title">
          活动周期
        </div>
        <div class="activity-realpass-table-inner">
          <table border='0' cellspacing="0" cellpadding="0">
            <thead>
              <th>期数</th>
              <th>时间</th>
              <th>状态</th>
            </thead>
            <tbody>
              <tr :class="{'disabled':item.status===0,}" v-for='(item,index) in activityRealOvercomeInfo.periodList' :key="index" v-if='activityRealOvercomeInfo&&activityRealOvercomeInfo.periodList'>
                <td>第{{item.period}}期</td>
                <td>{{item.startTime.replace('-','/').replace('-','/')}}<br>{{item.endTime.replace('-','/').replace('-','/')}}</td>
                <td :class='{active:item.status!==0}'>{{returnConductStatus(item.status)}}</td>

              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="activity-realpass-table" v-if='isLogin'>
        <div class="activity-realpass-table__title">
          第 {{periodsNum}} 期活动进行中
          <p v-if='activityRealOvercomeInfo'>{{periodsStartTime}}-{{periodsEndTime}}</p>
        </div>
        <div class="activity-realpass-table-inner">
          <table border='0' cellspacing="0" cellpadding="0" border-spacing='0'>
            <thead>
              <th>关卡</th>
              <th>累积有效投注</th>
              <th>可获奖金</th>
              <th style="width:30%;" v-if='activityRealOvercomeInfo'>当前累积有效投注<br>{{activityRealOvercomeInfo.betTotal}}元</th>
            </thead>
            <tbody>
              <tr :class="{'disabled':item.status===-1,}" v-for="(item,index) in activityRealOvercomeInfo.levelList" :key="index" v-if='activityRealOvercomeInfo&&activityRealOvercomeInfo.levelList'>
                <td>第{{item.level}}关</td>
                <td>{{item.bet}}+</td>
                <td>{{item.bonus}}元</td>
                <td class="active" v-if='item.status===1'>
                  已领取
                </td>
                <td v-else-if="item.status===0">
                  <div class="button" v-if='item.status===0' @click="getAwardHandler(item)">
                    可领取
                  </div>
                </td>
                <td v-else>
                  未达标
                </td>
              </tr>

            </tbody>
          </table>
        </div>
        <div class="activity-realpass__tips">注：每月最后1小时服务器资金结算，不计入流水。</div>
      </div>
      <div class="activity-realpass-bottom">
        <div class="activity-realpass-bottom__title">
          活动说明
        </div>
        <div class="activity-realpass-bottom__inner">
          <ul>
            <li>1、本活动与“返水优惠”共享。</li>
            <li>2、每关奖励达标，需手动点击领取按钮领取当前关卡奖励，奖励当月有效，次月不可领取。</li>
            <li>3、当期所有关卡有效投注累积计算，如：当期积累有效投注为50000元，可获奖金为8+18=26元。</li>
            <li>4、每月最后一个小时为结算时间，
              <span>结算时间内投注额不参与活动统计</span>，请注意投注时间。</li>
            <li>5、发放的奖金，无任何流水限制，只要达到提现要求，即可提现。</li>
            <li>6、有效流水定义：需为真人游戏有效投注，任何和局、对押、无效、投注失败的、未产生输赢结果的投注不计算为有效流水。</li>
            <li>7、每位真实有效玩家/每一手机号码/电子邮箱/户籍地址/现居地址/同一银行卡/每一IP地址/每一台电脑或上网设备，仅能参加并享受一次该活动，违规不享受该活动。</li>
            <li>8、此活动为平台提供给真实玩家的福利，任何用户或团体以不正常的方式投注、套取活动优惠，平台保留在不通知的情况下冻结账户的权利，并不退还款项。</li>
            <li>9、Ballbet贝博有权对该活动进行修改、暂停、取消等，无需特别通知，并保留对该活动的最终解释权。</li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>


<script>
import {
  activityRealOvercomeAwardApi,
  activityRealOvercomeInfoApi
} from "@/services/api/activity";
import { form,activity } from "@/mixins/index";
export default {
  data() {
    return {
      activityRealOvercomeInfo: {},
      periodsNum:1,
      periodsStartTime:'',
      periodsEndTime:'',
      level: null
    };
  },
  mixins: [form,activity],

  methods: {
    returnConductStatus(status) {
      if (_.isUndefined(status)) return;
      let statusText;
      switch (status) {
        case 0:
          statusText = `未开始`;
          break;
        case 1:
          statusText = `进行中`;
          break;
        case 2:
          statusText = `已结束`;
          break;
        default:
          statusText = "";
      }

      return statusText;
    },
    getAwardHandler(item) {
      if (item.status != 0) {
        return false;
      }
      this.level = item.level;
      this.doSave({ action: "getAward", level: item.level });
    }
  },
  mounted() {
    this.bindGet(activityRealOvercomeInfoApi, "activityRealOvercomeInfo", {
      action: "getActivityInfo",
      afterSuccess: ([result, data]) => {
        if (result) {
          const periodsNow = _(data.periodList).find({status:1})
          this.periodsNum = periodsNow.period;
          this.periodsStartTime = periodsNow.startTime;
          this.periodsEndTime = periodsNow.endTime;
          return data;
        }
      }
    });

    this.bindSave(activityRealOvercomeAwardApi, "getAward", "level", {
      successMessage: '领取奖励成功',
      beforeSend: data => {
        return data;
      },
      afterSuccess: () => {
        this.$nextTick(() => {
          this.doAction({ type: "get", action: "getActivityInfo" });
        });
      }
    });
    this.doAction({ type: "get", action: "getActivityInfo" });
  },

  computed: {
    mountTotal() {
      let everyTotal = 0;
      if (this.activityRealOvercomeInfo.levelList) {
        for (let item of this.activityRealOvercomeInfo.levelList) {
          everyTotal += item.bonus;
        }
      }

      return everyTotal;
    },

  }
};
</script>



<style lang="scss" scoped>
$--font-family: "PingFangSC-Semibold";
@include b(activity-realpass) {
  height: auto;
  background: black;
  padding-bottom: 30px;

  @include e(tips) {
    color: white;
    margin-top: 12px;
  }
  @include e(bg) {
    @include utils-bg(url("./bg.png") no-repeat top, cover);
    width: 100%;
    height: 511px;
    position: absolute;
    top: 0;
    left: 0;
  }

  @include b(activity-realpass-inner) {
    padding: 0 10px;
    padding-top: 426px;

    @include b(activity-realpass-inner-header) {
      padding: 15px 0;
      position: relative;
      z-index: 1;
      color: white;
      // background-image: radial-gradient(
      //   50% 100%,
      //   rgba(173, 148, 73, 0.31) 5%,
      //   #342b1a 100%
      // );
      box-shadow: 0 10px 8px 0 rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      text-align: center;
      @include e(text) {
        font-family: $--font-family;
        font-size: 12px;
        letter-spacing: -0.48px;
        line-height: 1.4;
        span {
          color: #e1a12b;
        }
      }
    }

    @include b(activity-realpass-table) {
      margin-top: 25px;
      @include e(title) {
        font-family: $--font-family;
        font-size: 15px;
        color: #ffffff;
        letter-spacing: -0.46px;
        text-align: center;
        p {
          opacity: 0.6;
          font-family: PingFangSC-Semibold;
          font-size: 10px;
          letter-spacing: -0.31px;
        }
      }
      @include b(activity-realpass-table-inner) {
        margin-top: 12px;
        border-radius: 8px;
        overflow: hidden;
        background: #dfc47f;
        box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.5);
        table {
          width: 100%;
          overflow: hidden;
          table-layout: fixed;
          th,
          td {
            font-family: $--font-family;
            font-size: 12px;
            color: #ffffff;
            letter-spacing: -0.4px;
            text-align: center;
            color: black;
            padding: 10px 0;
          }
          thead {
            background: rgba(138, 100, 45, 0.55);
          }
          tbody {
            tr {
              &:nth-child(odd) {
                background: rgba(175, 142, 81, 0.37);
              }
              &.disabled {
                opacity: 0.3;
              }
            }
            td {
              white-space: nowrap;
              .button {
                color: white;
                display: inline-block;
                padding: 3px 14px;
                background: #c4a565;
                box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.26);
                border-radius: 4px;
              }
              &.active {
                color: #c04040;
              }
            }
          }
        }
      }
    }
    @include b(activity-realpass-bottom) {
      @include e(title) {
        font-family: $--font-family;
        font-size: 15px;
        color: #ffffff;
        letter-spacing: -0.46px;
        text-align: center;
        margin-top: 36px;
      }
      @include e(inner) {
        background: #dfc47f;
        border-radius: 8px;
        padding: 30px 13px;
        margin-top: 10px;
        ul {
          li {
            //  font-family: $--font-family;
            font-size: 12px;
            margin-top: 8px;
            // span{
            //   color: red;
            // }
          }
        }
      }
    }
  }
}
</style>
