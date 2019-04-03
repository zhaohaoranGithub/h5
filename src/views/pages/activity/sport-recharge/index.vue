<template>
  <div class="sport-recharge">
    <div class="sport-recharge__inner">
      <div class="activity-container-main">
        <activity-container-header>
          <div class="activity-container-header__wrapper activity-container-header__wrapper--sport-recharge">
            <div class="activity-container-header__cell">
              <div class="activity-container-header-inner activity-container-header-inner--sport-recharge">
                <div class="activity-container-header-inner__brief">开始时间</div>
                <div class="activity-container-header-inner__title"  v-if="configData">
                    {{configData.startTime|toTime('YYYY.MM.DD')}}
                </div>
              </div>
              <div class="activity-container-header-inner activity-container-header-inner--sport-recharge">
                <div class="activity-container-header-inner__brief">结束时间</div>
                <div class="activity-container-header-inner__title"  v-if="configData">
                  {{configData.endTime|toTime('YYYY.MM.DD')}}
                </div>
              </div>
            </div>
            <div class="activity-container-header__cell">
              <div class="activity-container-header-inner activity-container-header-inner--sport-recharge">
                <div class="activity-container-header-inner__brief">参与方式</div>
                <div class="activity-container-header-inner__title">自动参与</div>
              </div>
              <div class="activity-container-header-inner activity-container-header-inner--sport-recharge">
                <div class="activity-container-header-inner__brief">适用平台
                </div>
                <div class="activity-container-header-inner__title"  v-if="configData">
                  {{_showClient(configData.gameType)}}
                </div>
              </div>
            </div>
          </div>
        </activity-container-header>
          <div class="activity-container-main__bet-record t-center">
          <div class="activity-container-main__bet-record-title">
            <img src="./img/title-1.png" alt="">
          </div>
          <div class="activity-container-main__bet-prograss">
             <div class="activity-container-main__bet-record-info" v-if="awardDetail&&configData&&awardDetail[1].recharge>=configData.config.totalRechargeAmount">
              再产生有效流水
              <span class="text-warning">{{needBetAmount}}元</span>，明天可领彩金
              <span class="text-warning">{{getAwardAmount}}元</span>
            </div>
            <div class="activity-container-main__bet-record-info" v-if="awardDetail&&configData&&awardDetail[1].recharge<configData.config.totalRechargeAmount">
              再充值
              <span class="text-warning">{{configData.config.totalRechargeAmount - awardDetail[1].recharge}}元</span>，明天就有机会领取最高
              <span class="text-warning">{{configData.config.itemList[0].multiple}}倍</span>彩金
            </div>
            <div class="activity-container-main__bet-record-tip">温馨提示：投注不会立刻统计在有效流水内，会稍有延迟，请稍后刷新再看看噢！</div>
            <div class="activity-container-main__bet-btn-box"></div>
            <div class="activity-container-main__bet-prograss-box">
              <CirclePrograss :precent="precent"></CirclePrograss>
              <div class="activity-container-main__bet-multiple">
                  <div class="activity-container-main__bet-multiple-detail">
                    <!-- <span v-for="(item,index) in configData.config.itemList" :key="index" :class="'activity-container-main__bet-multiple-item  activity-container-main__bet-multiple-' + index">{{item.multiple}}倍</span> -->
                    <span class="activity-container-main__bet-multiple-today" v-if="awardDetail&&configData">{{premultiple}}倍</span>
                  </div>
              </div>
              <div class="activity-container-main__bet-btn-box">
                <span
                  class="activity-container-main__bet-btn bet"
                  @click="$router.push({path:'/',query:{_t:new Date().valueOf()}})"
                ></span>
                <span
                  class="activity-container-main__bet-btn recharge"   @click="gotoRecharge"
                ></span>
              </div>
            </div>
          </div>
        </div>
        <div class="activity-container-main__activity-inner-table">
          <div class="activity-container-main__bet-record-title">
            <img src="./img/title-2.png" alt="">
          </div>
          <activity-container-center>
            <template slot='table'>
            <table
              class="activity-container-center-table activity-container-center-table--sport-recharge activity-container-center-table--border"
              border='0' cellspacing='0' cellpadding='0' v-if="configData">
             <thead>
                      <tr>
                        <th>当日充值总额</th>
                        <th>流水倍数</th>
                        <th>返还比例</th>
                        <th>最高奖励</th>
                      </tr>
                    </thead>
              <tbody>
                      <tr v-for="(item,index) in configData.config.itemList" :key="index">
                        <td :rowspan="configData.config.itemList.length" v-if="index===0" class="rowspan-td">>={{configData.config.totalRechargeAmount}} <span></span> </td>
                        <td>{{item.multiple}}</td>
                        <td>{{item.returnProportion}}%</td>
                        <td>{{item.highestReward | currency}}</td>
                      </tr>
                    </tbody>
            </table>
          </template>
          </activity-container-center>
        </div>
        <div class="activity-container-main__award-detail-table">
          <div class="activity-container-main__bet-record-title">
            <img src="./img/title-3.png" alt="">
          </div>
          <div class="activity-container-main__bet-record-today" v-if="awardDetail&&isLogin">
            <ul>
              <li>
                  <span>今天</span>
                  <span>{{awardDetail[1]?awardDetail[1].recharge:''}}</span>
                  <span>{{awardDetail[1]?awardDetail[1].multiple:''}}</span>
                  <span>{{awardDetail[1]?awardDetail[1].returnProportion:''}}</span>
                  <span>{{awardDetail[1]?awardDetail[1].amount:''}}</span>
                  <span class="cursor" @click="gotoFirst(awardDetail[1])">{{awardDetail[1]?_returnStatusText(awardDetail[1].status,"sport-recharge"):''}}</span>
              </li>
            </ul>
          </div>
          <div class="activity-container-main__bet-record-today" v-else>
            <ul>
              <li>
                  <span>今天</span>
                  <span>0</span>
                  <span>0</span>
                  <span>0</span>
                  <span>0</span>
                  <span class="cursor">未达标</span>
              </li>
            </ul>
          </div>
           <activity-container-center>
            <template slot='table'>
            <table
              class="activity-container-center-table activity-container-center-table--sport-recharge-detail activity-container-center-table--border"
              border='0' cellspacing='0' cellpadding='0'>
             <thead>
                      <tr>
                        <th>日期</th>
                        <th>充值金额</th>
                        <th>已达流水倍数</th>
                        <th>返还比例</th>
                        <th>可返金额</th>
                        <th>操作</th>
                      </tr>
                    </thead>
              <tbody>
                      <tr  v-if="awardDetail&&isLogin">
                        <td>{{awardDetail[0]?awardDetail[0].date:' '}}</td>
                        <td>{{awardDetail[0]?awardDetail[0].recharge:' '}}</td>
                        <td>{{awardDetail[0]?awardDetail[0].multiple:' '}}</td>
                        <td>{{awardDetail[0]?awardDetail[0].returnProportion:' '}}</td>
                        <td>{{awardDetail[0]?awardDetail[0].amount:' '}}</td>
                        <td class="cursor"  @click="getAward(awardDetail[0])">{{awardDetail[0]?_returnStatusText(awardDetail[0].status,"sport-recharge"):''}}</td>
                      </tr>
                      <tr  v-else>
                        <td>{{yesterday | toTime("YYYY-MM-DD")}}</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td class="cursor">未达标</td>
                      </tr>
                    </tbody>
            </table>
          </template>
          </activity-container-center>
        </div>
        <activity-container-bottom>
          <div
            class="activity-container-bottom-text activity-container-bottom-text--sport-recharge"
          >
           <div class="activity-container-main__bet-record-title">
            <img src="./img/title-4.png" alt="">
            <img class="award-cup" src="./img/award-cup.png" alt="">
          </div>
            <ul class="activity-container-bottom-text__ul">
              <li>活动说明</li>
              <li>1、本活动与“返水优惠”共享，不与“首存活动”共享，未完成“首存活动”的玩家不可参加；</li>
              <li>2、充值当日累积计算，有效流水达到相应倍数或以上，即可获得当日充值总额对应比例的奖励（如当日累积充值10000元，在体育有效流水208万元，有效流水倍数为208倍，可得奖励 </li> <li>10000*100%=10000元）；</li>
              <li>3、奖励需手动领取，第二天领取前一天的奖励，奖金无需投注即可提款，如未领取视为弃奖；</li>
              <li>4、投注后生成流水报表稍有延迟，有效流水以报表统计为准，晚间的投注有可能顺延到第二天统计；</li>
              <li>5、有效流水定义：需为体育流水，任何平局、取消的赛事投注，任何未产生输赢结果的、投注失败的、对押的投注，任何体育类港赔0.75 / 欧赔1.75以下的投注不计算为有效流水；</li>
              <li>6、每位真实有效玩家/每一手机号码/电子邮箱/户籍地址/现居地址/同一银行卡/每一IP地址/每一台电脑或上网设备，仅能参加并享受一次该活动，违规不享受该活动；</li>
              <li>7、此活动为平台提供给真实玩家的福利，任何用户或团体以不正常的方式投注、套取活动优惠，平台保留在不通知的情况下冻结账户的权利，并不退还款项；</li>
              <li>8、Ballbet贝博有权对该活动进行修改、暂停、取消等，无需特别通知，并保留对该活动的最终解释权。</li>
            </ul>

          </div>
        </activity-container-bottom>
      </div>
    </div>
  </div>
</template>
<script>
import {
  activitySportsRchargeInfoApi,
  activitySportsRchargeListApi,
  activitySportsRchargeGetAwardApi
} from "@/services/api/activity";

import { form, activity ,gotoRecharge} from "@/build";

import activityContainerHeader from "../components/activity-container-header";

import activityContainerCenter from "../components/activity-container-center";

import activityContainerBottom from "../components/activity-container-bottom";

import CirclePrograss from "./circle-prograss";

import { getLogin } from "@/utils/auth";
export default {
  name: "sport-recharge",
  mixins: [form, activity,gotoRecharge],
  components: {
    activityContainerHeader,
    activityContainerCenter,
    activityContainerBottom,
    CirclePrograss,
  },
  data() {
    let date=new Date();
    let yesterday=date.setDate(date.getDate()-1);
    return {
      configData: null,
      awardDetail: null,
      premultiple:0,
      bonous:0,
      today:new Date().valueOf(),
      yesterday:yesterday
      // multipleTotal:200,
    };
  },
  computed:{
      multipleTotal(){
        return this.awardDetail ? this.awardDetail[1].multiple :0
      },
      reachedMultiple(){
        return this.awardDetail ? this.awardDetail[1].multiple * 1 :0;
      },
      nextLevelMultiple(){
        let reachedMultiple=this.awardDetail ? this.awardDetail[1].multiple * 1 :0;
        return _.find(this.configData.config.itemList,function(val){return val.multiple > reachedMultiple}) ? _.find(this.configData.config.itemList,function(val){return val.multiple > reachedMultiple}).multiple : 0;
      },
      precent(){
        if(this.configData && _.isArray(this.configData.config.itemList)){
          return parseInt(this.multipleTotal / this.nextLevelMultiple *100);
        }
      },
       needBetAmount(){
        // 再产生有效流水=我的充值总额*下一级流水倍数-我的充值总额*已达流水倍数
        if(this.configData && _.isArray(this.configData.config.itemList)){
          //我的充值总额
          let todatBetAmount = this.awardDetail ? this.awardDetail[1].recharge * 1 :0;
          //已达流水倍数
          let reachedMultiple = this.awardDetail ? this.awardDetail[1].multiple * 1 :0;
          //下一级流水倍数
          let nextLevelMultiple = _.find(this.configData.config.itemList,function(val){return val.multiple > reachedMultiple}) ? _.find(this.configData.config.itemList,function(val){return val.multiple > reachedMultiple}).multiple : 0;
          let needBetAmount=todatBetAmount * nextLevelMultiple - todatBetAmount * reachedMultiple
          if(todatBetAmount > 0){
            return needBetAmount.toFixed(2)
          }else{
            return this.configData.config.totalRechargeAmount * this.configData.config.itemList[0].multiple
          }
        }

      },
      getAwardAmount(){
        //明天可领彩金=我的充值总额*下一级返还比例
        if(this.configData && _.isArray(this.configData.config.itemList)){
          //我的充值总额
          let todatBetAmount = this.awardDetail ? this.awardDetail[1].recharge * 1 :0;
           //已达流水倍数
          let reachedMultiple = this.awardDetail ? this.awardDetail[1].multiple * 1 :0;
           //下一级返还比例
          let nextLevelbate = _.find(this.configData.config.itemList,function(val){return val.multiple > reachedMultiple}) ? _.find(this.configData.config.itemList,function(val){return val.multiple > reachedMultiple}).returnProportion*1 : 0;
          let maxAmount = _.find(this.configData.config.itemList,function(val){return val.multiple > reachedMultiple}) ? _.find(this.configData.config.itemList,function(val){return val.multiple > reachedMultiple}).highestReward*1 : 0;
          let getAwardAmount= todatBetAmount * nextLevelbate / 100;
          if(todatBetAmount > 0){
            return getAwardAmount > maxAmount ? maxAmount : getAwardAmount
          }else{
            return this.configData.config.totalRechargeAmount * this.configData.config.itemList[0].returnProportion / 100
          }
        }
      }
  },
  methods: {
    getAward(item){
       if(item.status === 1){
        this.openUrl("/activity/first-survival")
        return false;
      }
      if(item.status === 2){
        this.bonous=item.amount;
        this.doSave({action:"getAward"}) ;
        return false;
      }
    },
    gotoFirst(item){
       if(item.status === 1){
         this.openUrl("/activity/first-survival")
        // this.$router.push({path:"/activity/first-survival"});
        return false;
      }
    },
     openUrl(url) {
      if(this.isLogin) {
        const {device_id, os_type, token, version, uid} = getLogin();
        let str = `${url}?token=${encodeURIComponent(token)}&uid=${encodeURIComponent(uid)}&os_type=${encodeURIComponent(os_type||1)}&device_id=${encodeURIComponent(device_id)}&version=${encodeURIComponent(version)}`;
        window.open(str);
      } else {
        window.open(url);
      }
    },
    timedCount() {
      let self = this;
      let time = 1000 / this.multipleTotal;
      if(this.multipleTotal > 0){
        this.timer = setInterval(() => {
          self.premultiple++;
          if (self.premultiple ===  parseInt(this.multipleTotal)) {
            clearInterval(self.timer);
            self.premultiple=this.multipleTotal;
          }
        }, time);
      }
    },
  },
  mounted() {
    this.bindGet(activitySportsRchargeInfoApi, "awardDetail", {
        action: "getActivityAwardDetail",
    });
    this.bindGet(activitySportsRchargeListApi, "configData", {
        action: "getActivityConfig",
    });
    if(this.isLogin){
      this.doAction({type:"get",action:"getActivityAwardDetail"})
    }else{
      this.$toast({
        type:"fail",
        message:"您还未登录，请登录后参加活动"
      })
    }
    this.doAction({type:"get",action:"getActivityConfig"})
    let self = this;
    setTimeout(()=>{
      self.timedCount()
    },1000)
    this.bindSave(activitySportsRchargeGetAwardApi, "getAward",  {
      successMessage: '领取奖励成功',
      afterSuccess: () => {
        this.doAction({ type: "get", action: "getActivityAwardDetail" });
      }
    });
  }
};
</script>
<style lang="scss" scoped>
@include b(sport-recharge) {
  width: 100%;
  padding-top: 9.4rem;
 
  .rowspan-td{
    position: relative;
    span{
      position: absolute;
      top: 0;
      bottom: 0;
      left:0;
      right: 0;
      margin: auto;
      display: inline-block;
      width: 100px;
      height: 100px;
      @include utils-bg(url("./img/money.png") no-repeat center, contain);
    }
  }
  @include utils-bg(url("./img/bg.jpg") no-repeat top, 100%);
   background-color:#10121b;
  @include b(activity-container-main){
    @include e(award-detail-table){
      position: relative;
      @include e(bet-record-today){
        position: absolute;
        bottom: 35px;
        z-index: 11;
        left: 3px;
        right: 3px;
        ul{
          height: 42px;
          list-style: none;
          background: linear-gradient(to right,#d0c8a9,#fefefe,#cac4a5);
          border-radius: 3px;
          li{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-size: 12px;
            font-weight: bold;
            height: 42px;
            // line-height: 32px;
            span{
              width: 59px;
              text-align: center;
              margin-top: 6px;
            }
          }
        }
      }
    }
    @include e(bet-record-title){
      text-align: center;
      position: relative;
      img{
        width:100%;
        &.award-cup{
          position: absolute;
          width: 100px;
          top: 20px;
          left: 0;
          right: 0;
          margin: auto;
        }
      }
    }
    @include e(bet-record-info){
      margin-top: 25px;
      color: $--color-white;
      font-size: 12px;
    }
    @include e(bet-record-tip){
      margin-top: 5px;
      color: #c1c1c3;
      font-size: 10px;
    }
    @include e(bet-prograss){
      width: 95%;
      height: 284px;
      margin: auto;
      @include utils-bg(url("./img/people.png") no-repeat bottom, contain);
      @include e(bet-prograss-box){
        width: 80%;
        margin-top: 35px;
        position: relative;
        margin-left: 20%;

        @include e(bet-multiple){
          height: 136px;
          @include e(bet-multiple-detail){
            width: 140px;
            height: 140px;
            margin: auto;
            position: relative;
             @include e(bet-multiple-item){
                font-size: 12px;
                color: #fccd3a;
                font-weight: bold;
              }
              @include e(bet-multiple-0){
                position: absolute;
                right:10px;
                top: 75px;
              }
              @include e(bet-multiple-1){
                position: absolute;
                right: 25px;
                top: 115px;
              }
              @include e(bet-multiple-2){
                position: absolute;
                left: 25px;
                top: 115px;
              }
              @include e(bet-multiple-3){
                position: absolute;
                left: -5px;
                top: 75px;
              }
              @include e(bet-multiple-4){
                position: absolute;
                left:50px;
                top: 25px;
              }
              @include e(bet-multiple-today){
                font-size:16px;
                display: inline-block;
                color: #fccd3a;
                font-weight: bold;
                margin-top: 58px;
              }
        }
        }
      }
      @include e(bet-btn-box){
        position: absolute;
        /* bottom: 0; */
        left: 0;
        right: 0;
        z-index: 10;
        @include e(bet-btn){
          display: inline-block;
          height: 30px;
          width: 60px;
          margin-left: 10px;
          &.bet{
           @include utils-bg(url("./img/bet-btn.png") no-repeat center,cover);
          }
          &.recharge{
           @include utils-bg(url("./img/recharge-btn.png") no-repeat center,cover);
          }
        }
      }
    }
  }

}
</style>


