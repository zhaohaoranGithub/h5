<template>
  <div class="golden-main">
    <div class="golden-main-top">
      <img src="./top-bg.png">
    </div>
    <div class="golden-main-warpper">
      <div class="golden-main-warpper__lanter left"></div>
      <div class="golden-main-warpper__lanter right"></div>
      <div class="golden-main-warpper__container">
        <div class="golden-main-warpper__time">
          <div class="golden-main-warpper__time-title">活动时间:</div>
          <div class="golden-main-warpper__time-detail">{{startTime | toDate("YYYY.MM.DD")}}-{{endTime | toDate("YYYY.MM.DD")}}</div>
        </div>
        <div class="golden-main-warpper__des">
          用户当日的累计充值额自动转换为等值的能量点，能量点可用来兑换彩蛋，每种彩蛋所消耗的能量点不一样;彩蛋共分为三种，包括白银彩蛋，黄金彩蛋，钻石彩蛋，彩蛋等级越高奖金越高。
        </div>
        <div class="golden-main-warpper__egg">
          <div class="golden-main-warpper__egg-item" v-for="(item,index) in goldenEggCfg" :key="index">
            <div class="golden-main-warpper__egg-item-title" :class="`title-${item.eggType}`"></div>
            <div class="golden-main-warpper__egg-item-detail" @click="getAmount(item.eggType,item.costPoints)">
              <div class="golden-main-warpper__egg-item-info"
                   :class="[`info-${item.eggType}`,{active: activeIndex === item.eggType},{animate: animateIndex === item.eggType}]"
                   >
                最高奖励<br>{{item.amount}}
              </div>
              <div class="golden-main-warpper__egg-item-bottom" :class="`bottom-${item.eggType}`"></div>
            </div>
            <div class="golden-main-warpper__egg-item-point" :class="`point=${item.eggType}`">
              消耗能量点{{item.costPoints}}
            </div>
          </div>
        </div>
        <div class="golden-main-warpper__my" v-if="isLogin">
          <div class="golden-main-warpper__my-point">
            <span>剩余能量点：{{leftPoints}}</span>
          </div>
          <div class="golden-main-warpper__my-tip">
            注意：该能量点会在次日后清零
          </div>
        </div>
      </div>
      <div class="golden-main-warpper__win">
        <div class="golden-main-warpper__win-record">
          <vue-seamless :data="winRecordList" :class-option="classOption" class="golden-main-warpper__win-seamless-warp">
            <ul>
              <li v-for="(item,index) in winRecordList" :key="index">
                恭喜<span>{{item.userName}}</span>用户 砸中{{checkEggType(item.eggType)}}彩蛋获得奖金<span>{{item.amount}}</span>元
              </li>
            </ul>
          </vue-seamless>
        </div>
        <div class="golden-main-warpper__win-btn" @click="getMyRecord">
          查询中奖记录
        </div>
      </div>
      <div class="golden-main-warpper__act">
        <div class="golden-main-warpper__act-title">
          活动说明
        </div>
        <div class="golden-main-warpper__act-des">
          <div>1、本活动与平台其它活动流水共享，当日的累计充值额包括现金充值和上分充值;</div>
          <div>2、当日的累计充值额1:1等值自动转换为能量点，当日剩余能量点=当日累计兑换能量点 - 已兑换能量点;能量点当日有效，次日清零</div>
          <div>3、奖金自动加入中心钱包，奖金可自由选择提款或投注;</div>
          <div>4、每位真实有效玩家/每一手机号码/电子邮箱/户籍地址/现居地址/同一银行卡/每一IP地址/每一台电脑或上网设备，仅能参加并享受一次该活动，违规不享受该活动;</div>
          <div>5、此活动为平台提供给真实玩家的福利，任何用户或团体以不正常的方式投注，套取活动优惠，平台保留在不通知的情况下冻结账户的权利，并不退还款项;</div>
          <div>6、Ballbet贝博有权对该活动进行修改、暂停、取消等，无需特别通知，并保留对该活动的最终解释权。</div>
        </div>
      </div>
    </div>
    <van-dialog class="golden-win-res" v-model="showWinResult" close-on-click-overlay>
      <div class="golden-win-res__get" v-show="winResStatus"></div>
      <div class="golden-win-res__info">
        <template v-if="winResStatus">
          <div>砸蛋成功！</div>
          <div>恭喜发财，获得奖励<span>{{winAmount}}</span>元</div>
        </template>
        <template v-else>
          能量点不足，充值后可获得能量点
        </template>
      </div>
      <div class="golden-win-res__btn">
        <div class="golden-win-res__btn-info left" @click="showWinResult = !showWinResult">{{winResStatus ? '休息一下' : '查看活动详情'}}</div>
        <div class="golden-win-res__btn-info right" @click="winResStatus ? again(goldenIndex) : checkRechargeStatus()">{{winResStatus ? '继续砸蛋' : '立即充值'}}</div>
      </div>
    </van-dialog>
    <van-dialog class="golden-my-record" v-model="showMyRecord">
      <div class="golden-my-record__lanter left"></div>
      <div class="golden-my-record__lanter right"></div>
      <div class="golden-my-record__close" @click="showMyRecord = !showMyRecord"></div>
      <div class="golden-my-record__title"></div>
      <div class="golden-my-record__info">
        <div class="golden-my-record__info-title">
          <div>时间</div>
          <div>消耗能量点</div>
          <div>获得奖金</div>
        </div>
        <ul class="golden-my-record__info-list" v-if="myRecordList.length > 0">
          <li v-for="(item,index) in myRecordList" :key="index">
            <div>{{item.createDate | toDate}}</div>
            <div>{{item.costPoints}}</div>
            <div>{{item.amount}}</div>
          </li>
        </ul>
        <div v-else class="golden-my-record__info-no-tip"></div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
  import vueSeamless from 'vue-seamless-scroll';
  import {
    activityGoldenInfoApi,
    activityGoldenHistoryListApi,
    activityGoldenMyHistoryApi,
    activityGoldenAwardApi,
  } from "@/services/api/activity";

  import {form, activity} from "@/mixins/index";
  import gotoRecharge from "@/mixins/goto-recharge";

  export default {
    name: "golden-egg",

    mixins: [form, activity, gotoRecharge],

    data() {
      return {
        startTime:'',
        endTime:'',
        goldenEggCfg:[
          {
            eggType:1,
            amount:8
          },
          {
            eggType:2,
            amount:128
          },
          {
            eggType:3,
            amount:888
          }
        ], //金蛋配置
        goldenIndex:0, //点击当前金蛋
        activeIndex:0,
        animateIndex:0,
        leftPoints:0, //用户剩余能量点
        winRecordList:[], //所有用户中奖信息
        showWinResult:false, //显示砸金蛋结果
        winResStatus:false, //抽奖结果
        winAmount:0,
        showMyRecord:false,//显示我的中奖记录
        myRecordList:[],//我的中奖记录
        form:{},
        clickSwitch:true,
        clickGetMyRecord:true,
      };
    },

    computed: {
      classOption () {
        return {
          hoverStop: false,
          openTouch:false,
          waitTime: 2000,
          singleHeight: 0.86,
          isSingleRemUnit:true,
        };
      }
    },

    components:{
      vueSeamless
    },

    watch:{
      showWinResult(val){
        if(!val){
          this.winResStatus = false;
          this.activeIndex = 0;
          this.winResStatus = '';
        }
      }
    },

    methods:{
      checkEggType(type){
        return type === 1 ? '白银' : (type === 2 ? '黄金' : '钻石');
      },
      getActivityInfo(){
        this.doAction({ type: "get", action: "getActivityGoldenInfo" });
      },
      getMyRecord(){
        if(this.isLogin){
          if(this.clickGetMyRecord){
            this.clickGetMyRecord = false;
            this.doAction({ type: "get", action: "getActivityGoldenMyHistory" });
          }
        }else{
          this.$toast("请登录后再参加活动");
        }
      },
      checkRechargeStatus(){
        this.showWinResult = false;
        this.$store.dispatch(types.OAUTH);
        this.gotoRecharge();
      },
      getAmount(type,point){
        if(this.clickSwitch){
          if(this.isLogin){
            this.clickSwitch = false;
            this.animateIndex = this.goldenIndex = type;
            this.form.eggType = this.goldenIndex;
            setTimeout(() => {
              this.doAction({type: "get", action: "getActivityGoldenAward" });
            },800);
          }else{
            this.$toast("请登录后再参加活动");
          }
        }
      },
      again(type){
        this.showWinResult = false;
        this.getAmount(type);
      }
    },

    mounted(){
      this.bindGet(activityGoldenInfoApi, "", {
        action: "getActivityGoldenInfo",
        afterSuccess: ([result, data]) => {
          if (result) {
            this.startTime = data.startTime;
            this.endTime = data.endTime;
            this.leftPoints = data.leftPoints;
            _.merge(this.goldenEggCfg, data.config.itemList);
          }
        }
      });
      this.getActivityInfo();

      this.bindGet(activityGoldenHistoryListApi, "", {
        action: "getActivityGoldenHistoryList",
        afterSuccess: ([result, data]) => {
          if (result) {
            if(this.winRecordList.length === 5){
              this.winRecordList = this.winRecordList.concat(data);
            }else if(this.winRecordList.length === 10){
              this.winRecordList = this.winRecordList.concat(data);
              this.winRecordList = this.winRecordList.slice(5, this.winRecordList.length);
            }else{
              this.winRecordList = data;
            }
          }
        },
        afterFail: ([result,data]) => {
        }
      });
      this.doAction({ type: "get", action: "getActivityGoldenHistoryList" });

      this.bindGet(activityGoldenMyHistoryApi, "", {
        action: "getActivityGoldenMyHistory",
        afterSuccess: ([result, data]) => {
          if (result) {
            this.myRecordList = data.list;
            this.showMyRecord = true;
          }
          this.clickGetMyRecord = true;
        },
        afterFail: ([result,data]) => {
          this.clickGetMyRecord = true;
          this.$toast(data);
        }
      });

      this.bindGet(activityGoldenAwardApi, '', {
        action: "getActivityGoldenAward",
        sendingData:  'form',

        afterSuccess: ([result, data]) => {
          if (result) {
            this.animateIndex = 0;
            this.activeIndex = this.goldenIndex;
            setTimeout(() => {
              this.winAmount = data.amount;
              this.winResStatus = true;
              this.showWinResult = true;
              this.clickSwitch = true;
            },500);
            this.getActivityInfo();
          }else{
            this.clickSwitch = true;
          }
        },
        afterFail: ([result,data]) => {
          this.animateIndex = 0;
          this.clickSwitch = true;
          if(data.code === 400){
            this.showWinResult = true;
          }else{
            this.$toast(data);
          }
        }
      });

      this.timer = setInterval(() => {
        this.$nextTick(() => {
          this.doAction({ type: "get", action: "getActivityGoldenHistoryList" });
        });
      },10000);
    },
    beforeDestroy(){
      clearInterval(this.timer);
    }
  };
</script>

<style scoped lang="scss">
  @include b(golden-main){
    width: 100%;
    background-color: #000000;
    position: relative;
    overflow: hidden;
    @include b(golden-main-top){
      width: 100%;
      font-size: 0px;
      img{
        width: 100%;
      }
    }

    @include b(golden-main-warpper){
      width: 100%;
      position: relative;
      padding-bottom: 60px;
      @include utils-bg(
          url("./warpper-bg.png") no-repeat top,
          100% 100%
      );

      @include e(lanter){
        width: 210px;
        height: 106px;
        position: absolute;
        @include utils-bg(
            url("./lantern.png") no-repeat top
        );
        &.left{
          top: -28px;
          left: -46px;
        }
        &.right{
          top: -28px;
          right: -46px;
          transform: scaleX(-1);
        }
      }

      @include e(container){
        width: 83%;
        margin: 0 auto;
        padding-top: 10px;
        /*overflow: hidden;*/
        @include e(time){
          width: 65%;
          /*height: 50.5px;*/
          text-align: center;
          font-size: 14px;
          color: #ffffff;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 5px 0px;
          @include utils-bg(
              url("./time-bg.png") no-repeat top,
              100% 100%
          );

          @include e(time-detail){
            color: #ffc835;
            margin-top: 5px;
          }
        }

        @include e(des){
          font-size: 12px;
          color: #FEE6C7;
          width: 100%;
          margin: 10px auto;
          transform: scale(0.9);
          letter-spacing: -0.14px;
        }

        @include e(egg){
          display: flex;
          padding-top: 10px;
          /*position: relative;*/
          @include e(egg-item){
            width: 33.33%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            /*position: absolute;*/
            /*&:nth-child(1){*/
              /*left: 0%;*/
            /*}*/
            /*&:nth-child(2){*/
              /*left: 33.33%;*/
            /*}*/
            /*&:nth-child(3){*/
              /*right: 0%;*/
            /*}*/
            @include e(egg-item-title){
              width: 50%;
              /*height: 21.5px;*/
              padding: 10%;
              &.title-1{
                @include utils-bg(
                    url("./silver-title.png") no-repeat top,
                    100% 100%
                );
              };
              &.title-2{
                @include utils-bg(
                    url("./golden-title.png") no-repeat top,
                    100% 100%
                );
              };
              &.title-3{
                @include utils-bg(
                    url("./diamond-title.png") no-repeat top,
                    100% 100%
                );
              }
            }

            @include e(egg-item-detail){
              position: relative;
              top: -20px;
              display: flex;
              flex-direction: column;
              align-items: center;
              transform: translateX(-3px);
            }

            @include e(egg-item-info){
              margin-top: 5px;
              text-align: center;
              width: 190%;
              /*height: 153px;*/
              padding: 70px 0 59px;
              font-size: 12px;
              display: flex;
              justify-content: center;
              align-items: center;
              z-index: 2;
              &.animate{
                animation: swing 1s infinite;
                transform-origin: 50% 70%;
              }
              &.info-1{
                color: #ffffff;
                @include utils-bg(
                    url("./silver-def.png") no-repeat top,
                    100% 100%
                );
                &.active{
                  @include utils-bg(
                      url("./silver-active.png") no-repeat top,
                      100% 100%
                  );
                }
                background-position: 3px 0px;
              }
              &.info-2{
                color: #E4AD60;
                @include utils-bg(
                    url("./golden-def.png") no-repeat top,
                    100% 100%
                );
                &.active{
                  @include utils-bg(
                      url("./golden-active.png") no-repeat top,
                      100% 100%
                  );
                }
                background-position: 3px 0px;
              }
              &.info-3{
                color: #E86C5E;
                @include utils-bg(
                    url("./diamond-def.png") no-repeat top,
                    100% 100%
                );
                &.active{
                  @include utils-bg(
                      url("./diamond-active.png") no-repeat top,
                      100% 100%
                  );
                }
                background-position: 3px 0px;
              }
            }

            @include e(egg-item-bottom){
              width: 85px;
              height: 29.5px;
              position: relative;
              top: -25px;
              z-index: 1;
              &.bottom-1{
                @include utils-bg(
                    url("./silver-bottom.png") no-repeat top,
                    contain
                );
              }
              &.bottom-2{
                @include utils-bg(
                    url("./golden-bottom.png") no-repeat top,
                    contain
                );
              }
              &.bottom-3{
                @include utils-bg(
                    url("./diamond-bottom.png") no-repeat top,
                    contain
                );
              }
            }

            @include e(egg-item-point){
              width: 80%;
              padding: 1%;
              color: #FEE6C7;
              background: #320C0C;
              border-radius: 4px;
              text-align: center;
              position: relative;
              top: -40px;
            }
          }
        }

        @include e(my){
          text-align: center;
          color: #F5C452;
          @include e(my-point){
            font-size: 14px;
            color: #ffffff;
            margin-bottom: 5px;
            /*height: 22.5px;*/
            /*line-height: 22.5px;*/
            span{
              padding: 5px 10px;
              background: rgba(245,196,82,.2);
              border-radius: 10px;
              display: inline-block;
            }
          }
        }

      }
      @include e(win){
        width: 95%;
        /*height: 166px;*/
        margin: 12.5px auto 10px;
        padding: 25px 0px 8px;
        @include utils-bg(
            url("./win-record-bg.png") no-repeat top,
            100% 100%
        );
        @include e(win-record){
          width: 86.4%;
          height: 106px;
          margin: 0 auto;
          padding: 10px;
          @include utils-bg(
              url("./win-bg.png") no-repeat top,
              100% 100%
          );
          @include e(win-seamless-warp){
            height: 96px;
            overflow: hidden;
          }
          ul{
            li{
              font-size: 14px;
              /*padding: 8px;*/
              height: 31px;
              line-height: 31px;
              border-bottom: 1px solid #ffbc59;
              color: #fee6c7;
              span{
                color: #fa7643;
              }
            }
          }
        }
        @include e(win-btn){
          width: 30.4%;
          /*height: 32.5px;*/
          text-align: center;
          /*line-height: 32.5px;*/
          padding: 9px 0;
          color: #F0D080;
          margin: 7.5px auto;
          font-size: 12px;
          @include utils-bg(
              url("./button-1-bg.png") no-repeat top,
              100% 100%
          );
        }
      }

      @include e(act){
        @include e(act-title){
          width: 42.5%;
          /*height: 50.5px;*/
          margin: 0 auto;
          text-align: center;
          color: #FFFFFF;
          /*line-height: 50px;*/
          padding: 12px 0px 24px;
          font-size: 14px;
          @include utils-bg(
              url("./act-des-bg.png") no-repeat top,
              100% 100%
          );
        }
        @include e(act-des){
          width: 93%;
          padding: 10px 5px;
          margin: 0 auto;
          color: #FEE6C7;
          font-size: 12px;
          @include utils-bg(
              url("./act-des-detail-bg.png") no-repeat top,
              100% 100%
          );
          div{
            width: 95%;
            margin: 0 auto;
          }
        }
      }
    }

    @include b(golden-win-res){
      padding: 48px 0 34px;
      overflow: initial;
      @include utils-bg(
          url("./win-res-dialog-bg.png") no-repeat top,
          100% 100%
      );
      @include e(get){
        width: 72%;
        height: 74.5px;
        position: absolute;
        left: 50%;
        top: -50%;
        transform: translate(-50%,75%);
        @include utils-bg(
            url("./win-res-get-bg.png") no-repeat top,
            100% 100%
        );
      }

      @include e(info){
        text-align: center;
        font-size: 14px;
        color: #2A110D;
        span{
          color: #ad0703;
          margin: 0 5px;
        }
      }

      @include e(btn){
        display: flex;
        justify-content: space-around;

        @include e(btn-info){
          width: 30%;
          padding: 6px 15px;
          font-size: 12px;
          color: #F0D080;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 34px;
          &.left{
            @include utils-bg(
                url("./button-2-bg.png") no-repeat top,
                100% 100%
            );
          }
          &.right{
            @include utils-bg(
                url("./button-1-bg.png") no-repeat top,
                100% 100%
            );
          }
        }
      }
    }
    @include b(golden-my-record){
      padding: 11px 0px 7px;
      overflow: initial;

      @include e(close){
        position: absolute;
        width: 25.5px;
        height: 25.5px;
        z-index: 99;
        top: -5%;
        right:-10%;
        @include utils-bg(
            url("./dialog-close.png") no-repeat top,
            100% 100%
        )
      }

      @include utils-bg(
          url("./my-record-bg.png") no-repeat top,
          100% 100%
      );
      @include e(lanter){
        width: 210px;
        height: 106px;
        position: absolute;
        @include utils-bg(
            url("./lantern.png") no-repeat top
        );
        &.left{
          top: -7%;
          left: -26%;
        }
        &.right{
          top: -7%;
          right: -26%;
          transform: scaleX(-1);
        }
      }

      @include e(title){
        width: 29.4%;
        height: 22px;
        margin: 0 auto;
        @include utils-bg(
            url("./my-record-title.png") no-repeat top,
            100% 100%
        )
      }

      @include e(info){
        width: 86%;
        margin: 0 auto;
        background: rgba(255,255,255,.3);
        font-size: 14px;
        height: 170px;
        @include e(info-title){
          width: 100%;
          height: 26.5px;
          color: #2A110D;
          display: flex;
          background: rgba(255,255,255,.3);
          align-items: center;
          div{
            width: 33.33%;
            text-align: center;
          }
        }

        @include e(info-list){
          width: 100%;
          height: 143.5px;
          overflow: auto;
          li{
            display: flex;
            div{
              font-size: 12px;
              color: #2A110D;
              width: 33.33%;
              text-align: center;
              line-height: 20px;
            }
          }
        }

        @include e(info-no-tip){
          width: 42.8%;
          height: 95px;
          margin: 12% 28%;
          @include utils-bg(
              url("./no-record-bg.png") no-repeat top,
              100% 100%
          )
        }
      }
    }
  }
</style>
