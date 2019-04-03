<template>
  <div class="withdarw-container">
    <div class="withdarw-container__wallet">
      <div class="wallet-tips">可正常出款</div>
      <div class="wallet-name">中心钱包</div>
      <div class="wallet-money">
        <span class="icon">￥</span>
        <span class="num">{{ user.balance || 0 | currency}}</span>
        <span class="refresh" :class="isRefresh ? 'animate' : ''" @click="refresh()">
        </span>
      </div>
    </div>
    <div class="withdarw-container__warn">
      <span class="warn-icon">!</span>
      <span class="warn-text">游戏钱包的资金必须转移到中心钱包才能取出现金</span>
    </div>
    <div class="withdarw-container__card">
      <div @click="popShow = true" class="card-choice">
        <div class="bank-box">
          <div v-if="bankName !=''" class="bank-img" :class="bankName"></div>
          <span class="bank-name">{{bankChoice}}</span>
        </div>
        <van-icon name="arrow"/>
      </div>
    </div>
    <div class="withdarw-container__sum">
      <div class="sum-input">
        <div class="sum-input-icon">￥</div>
        <van-field v-model.number="withdrawform.amount" :placeholder="str" />
        <!--<div class="sum-input-all" @click="withdrawform.amount = user.balance">全部</div>-->
      </div>
    </div>
    <div class="withdarw-container__way" v-if="generalConfig && quickConfig">
      <div class="way-title">提现方式 <router-link v-if="Number(withdrawInfo.tipStatus) === 1" :to="{path:'/withdraw-manager/withdraw-tip'}"><span class="text-primary tip" > <van-icon name="info-o" size="14px" class="ver-middle"/> <span  class="ver-middle">提现说明</span></span></router-link>  </div>
      <div class="way-item border">
        <div  class="choice-img"  @click="choice(1)" :class="generalStep !== 0 ? 'no-choice' : withdrawform.type === 1 ? 'choice' : 'un-choice'"></div>
        <div class="way-item-icon"></div>
        <div class="way-item-title">普通提现</div>
        <div class="way-item-text" v-if="generalStep === 1">今日普通提现次数已经用完，敬请明日再来</div>
        <div class="way-item-text" v-else-if="generalStep === 2">今日普通提现金额已达上限，敬请明日再来</div>
        <div class="way-item-text" v-else-if="generalStep === 0 || generalStep === 3">取款限额<span :class="generalStep === 0 ? 'red' : ''">{{generalConfig.minLimit}}~{{generalConfig.maxLimit}}</span>；剩余免费提现<span :class="generalStep === 0 ? 'red' : ''">{{generalConfig.leftFreeCount}}/{{generalConfig.freeTimes}}</span>次。<br/>
          <span v-if="generalConfig.leftFreeCount === 0 && generalFee.total != '0'">本次单笔手续费<span :class="generalStep === 0 ? 'red' : ''">{{generalFee.total | currency}}元</span></span>
        </div>
      </div>
      <div class="way-item">
        <div  class="choice-img" @click="choice(2)" :class="quickStep !== 0 ? 'no-choice' :withdrawform.type === 2 ? 'choice' : 'un-choice'"></div>
        <!--<div  class="choice-img" :class="item.cardId === form.cardId ? 'choice' : 'un-choice'"></div>-->
        <div class="way-item-title">大额提现</div>
        <div class="way-item-text" v-if="quickStep === 1">今日大额提现次数已经用完，敬请明日再来</div>
        <div class="way-item-text" v-else-if="quickStep === 2">今日大额提现金额已达上限，敬请明日再来</div>
        <div class="way-item-text" v-else-if="quickStep === 0 || quickStep === 3">取款限额<span :class="quickStep === 0 ? 'red' : ''">{{quickConfig.minLimit}}~{{quickConfig.maxLimit}}</span>；剩余免费提现<span :class="quickStep === 0 ? 'red' : ''">{{quickConfig.leftFreeCount}}/{{quickConfig.freeTimes}}</span>次。<br/>
          <span v-if="quickConfig.leftFreeCount === 0 && quickFee.total != '0'">本次单笔手续费<span :class="quickStep === 0 ? 'red' : ''">{{quickFee.total | currency}}元</span></span>
        </div>
      </div>
    </div>
    <!--<div class="withdarw-container__card">-->
      <!--<div class="card-title">选择提现银行卡</div>-->
      <!--<div @click="popShow = true" class="card-choice">-->
        <!--<span>{{bankChoice}}</span>-->
        <!--<van-icon name="arrow"/>-->
      <!--</div>-->
    <!--</div>-->
    <!--<div class="withdarw-container__sum">-->
      <!--<div class="sum-title">输入提现金额</div>-->
      <!--<div class="sum-tips">-->
        <!--取款限额<span class="red">50~5000</span>;每天免费提现<span class="red">3</span>次，提现次数不限。-->
      <!--</div>-->
      <!--<div class="sum-input">-->
        <!--<div class="sum-input-tips">输入提现金额(额外扣除2元服务费)</div>-->
        <!--<div class="sum-input-num">-->
          <!--<div>￥</div>-->
          <!--<van-field v-model.number="form.amount" placeholder="请输入提现金额" />-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <van-row type="flex" justify="center" class="account-button">
      <van-button type="primary" block shadow @click="submit">确定</van-button>
    </van-row>
    <van-dialog class="withdarw-container__dialog" v-model="dialogShow" close-on-click-overlay>
      <!--<van-icon @click="dialogShow = false" size="20px" class="delete-icon" name="clear" />-->
      <div class="dialog-img"></div>
      <div class="dialog-title">绑定手机号</div>
      <div class="dialog-text">为了您的金钱安全，请先绑定您的手机号码，再进行提现操作</div>
      <van-button type="primary" size='medium' class="dialog-button" @click="$router.push({name:'bindPhone'})">确定</van-button>
    </van-dialog>
    <van-dialog class="withdarw-container__subDialog" closed v-model="subDialogShow" close-on-click-overlay>
      <div class="dialog-img"></div>
      <div class="dialog-title">输入提现验证码</div>
      <div class="dialog-text">我们将验证码发送至手机号<span class="blue">{{user.telephone}}</span></div>
      <van-cell-group>
        <van-field clearable v-model='withdrawform.code' placeholder="请输入验证码">
          <template slot="left-icon">
            <div class="code">验证码</div>
          </template>
          <template slot="icon">
            <span class="phone-container__code" @click="send">{{codeBtnText}}</span>
          </template>
        </van-field>
      </van-cell-group>
      <div class="dialog-button">
        <van-button type="primary"  class="dialog-button" @click="withdrawSubmit">确认提现，预计2小时到账</van-button>
      </div>
    </van-dialog>
    <van-actionsheet class="withdarw-container__pop" v-model="popShow">
      <div class="pop-header">
        <van-icon @click="popShow = false" size="20px" class="back-icon" name="arrow-left" />
        <span class="pop-header-title">选择提现银行卡</span>
        <span class="pop-header-edit" @click="$router.push({name: 'cardManager'})">编辑</span>
      </div>
      <div class="pop-warn">
        <span class="warn-icon">!</span>
        <span class="warn-text">最多可添加三张银行卡</span>
      </div>
      <div class="pop-card-item" @click="choiceCard(item)" v-for="item in cardList" :key="item.cardId">
        <div class="bank-box">
          <div class="bank-img" :class="item.name"></div>
          <div class="bank-name">{{item.bankName}}({{item.cardNo}})</div>
        </div>
        <div  class="choice-img" :class="item.cardId === withdrawform.cardId ? 'choice' : 'un-choice'"></div>
      </div>
      <div v-if="cardList.length < 3" class="pop-card-add" @click="$router.push({name:'cardAdd'})">
        <div class="add-icon"></div>
        <div>新增银行卡</div>
      </div>
    </van-actionsheet>
  </div>
</template>

<script>
  import {factory, form, getCode, loading} from '@/build';
  import {getWithdrawInfo, getWithdrawStatus, submitWithdraw} from '@/services/api/finance';
  import {getValidateCode as codeApi} from "@/services/api/user";
  import Cookies from 'js-cookie';
  import { bankListApi as listApi } from "@/services/api/user";
  // import BindMobile from "@/views/finance/withdraw/bind-mobile";
  // import WithdrawProgress from "@/views/finance/withdraw/withdraw-progress";
  // import NeedMoreBills from './need-more-bills';
  // import WithdrawValidate from './withdraw-validate';

  export default {
    name: "withdraw-view",
    mixins: [form, factory, getCode, loading],

    data() {
      return {
        balance: '',
        isInProgress: false,
        choiceIndex: 1,
        isChoice: true,
        isRefresh: false,
        dialogShow: false,
        subDialogShow: false,
        popShow: false,
        check: true,
        codeApi,
        withdrawform: {
          name: undefined,
          amount: undefined,
          code: undefined,
          cardNo: undefined,
          cardId: undefined,
          type: undefined,
        },
        form: {
          type: consts.CODE_CASH
        },
        bankChoice: '',
        withdrawInfo: {
          freeTimes: 0
        },
        isInit: true,
        bankName: '',
        isCurrentInProgress: false,
        lastStatus: {},
        formError: '',
        generalCheck: false,
        quickCheck: false,
        str: '',
      };
    },
    watch: {
      withdrawInfo: {
        handler(newValue, oldValue) {
          this.setWithdrawType();
        }
      },
      'withdrawform.amount'(val){
        this.setWithdrawType();
      }
    },
    computed: {
      ...mapState({
        user: state => state.user,
      }),
      telephone(){
        return Cookies.get(consts.CACHE_TELEPHONE);
      },
      currentBankId() {
        if (this.withdrawform.cardId) {
          const currentCardInfo = _.find(this.withdrawInfo.cardList, {'cardId': this.withdrawform.cardId});
          return currentCardInfo ? currentCardInfo.bankId : undefined;
        } else {
          return undefined;
        }
      },
      generalFee() {
        const feeType = this.generalConfig.feeType;
        if (feeType == 'percent') {
          if (this.withdrawform.amount == undefined) {
            return {
              total: `0`
            };
          } else {
            return {
              total:Number(this.withdrawform.amount) * this.generalConfig.fee / 100 > this.generalConfig.feeLimit ? `${this.generalConfig.feeLimit}` : `${Number(this.withdrawform.amount) * this.generalConfig.fee / 100}`
            };
          }
        } else if (feeType == 'fix') {
          return {
            total: `${this.generalConfig.fee}`
          };
        }
        // if (fee.)
      },
      quickFee() {
        const feeType = this.quickConfig.feeType;
        if (feeType == 'percent') {
          if (this.withdrawform.amount == undefined) {
            return {
              total: `0`
            };
          } else {
            return {
              total:Number(this.withdrawform.amount) * this.quickConfig.fee / 100 > this.quickConfig.feeLimit ? `${this.quickConfig.feeLimit}` : `${Number(this.withdrawform.amount) * this.quickConfig.fee / 100}`
            };
          }
        } else if (feeType == 'fix') {
          return {
            total: `${this.quickConfig.fee}`
          };
        }
        // if (fee.)
      },
      generalStep() {
        const count = this.withdrawInfo.generalConfig.withdrawCount;
        const countLimit = this.withdrawInfo.generalConfig.countLimit;
        const amountLimit = this.withdrawInfo.generalConfig.amountLimit;
        const sums = this.withdrawInfo.withdrawSumAmount;
        if (this.withdrawform.amount > this.withdrawInfo.generalConfig.maxLimit && count < countLimit && sums < amountLimit) {
          return 3;
        } else if(this.withdrawform.amount < this.withdrawInfo.generalConfig.minLimit && count < countLimit && sums < amountLimit) {
          return 3;
        } else if(this.withdrawform.amount < this.withdrawInfo.generalConfig.maxLimit &&
          this.withdrawform.amount > this.withdrawInfo.quickConfig.maxLimit &&
          count < countLimit &&
          sums < amountLimit) {
          return 0;
        }
        if (count >= countLimit) {
          return 1;
        } else if (sums >= amountLimit) {
          return 2;
        } else {
          return 0;
        }
      },
      quickStep() {
        const count = this.withdrawInfo.quickConfig.withdrawCount;
        const countLimit = this.withdrawInfo.quickConfig.countLimit;
        const amountLimit = this.withdrawInfo.quickConfig.amountLimit;
        const sums = this.withdrawInfo.withdrawSumAmount;
        if (this.withdrawform.amount > this.withdrawInfo.quickConfig.maxLimit && count < countLimit && sums < amountLimit) {
          return 3;
        } else if(this.withdrawform.amount < this.withdrawInfo.quickConfig.minLimit && count < countLimit && sums < amountLimit) {
          return 3;
        } else if(
          this.withdrawform.amount < this.withdrawInfo.quickConfig.maxLimit &&
          this.withdrawform.amount > this.withdrawInfo.generalConfig.maxLimit &&
          count < countLimit &&
          sums < amountLimit) {
          return 0;
        }
        if (count >= countLimit) {
          return 1;
        } else if (sums >= amountLimit) {
          return 2;
        } else {
          return 0;
        }
      },
      generalConfig() {
        return this.withdrawInfo.generalConfig;
      },
      quickConfig() {
        return this.withdrawInfo.quickConfig;
      },
      cardList() {
        return this.withdrawInfo.cardList || [];
      },
      // isInProgress() {
      //   return this.checkIsInProgress(this.lastStatus.status) || this.isCurrentInProgress;
      // },
    },
    methods: {
      choice(i) {
        if (i === 1) {
          if (this.generalStep === 0) {
            this.withdrawform.type = i;
          }
        } else {
          if (this.quickStep === 0) {
            this.withdrawform.type = i;
          }
        }
      },
      choiceCard(data) {
        this.withdrawform.cardId = data.cardId;
        this.popShow = false;
        this.bankChoice = `${data.bankName}(${data.cardNo})`;
        this.bankName = data.name;
      },
      checkIsInProgress(status) {
        if(_.includes([
          ...consts.WITHDRAW_STATUS_AUDIT_ING,
          ...consts.WITHDRAW_STATUS_PAYMENT_OUT_ING,
        ], status)){
          this.isInProgress = true;
        }
      },
      async refresh() {
        const start = moment.now();
        this.isRefresh = true;

        const [result, data] = await this.$store.dispatch(types.OAUTH);

        _.delay(() => {
          this.$toast('刷新成功');
          this.isRefresh = false;
        }, _.clamp(1000 - (moment.now() - start), 0, 1000));
      },
      checkPhone() {
        if(!this.user.telephone && !this.telephone) {
          this.dialogShow = true;
        }
      },
      send(){
        this.sendCode(this.user.telephone);
      },
      submit() {
        if(this.withdrawInfo.cardList.length == 0) {
          this.$toast('请先添加银行卡');
        } else {
          if (this.checkAmount(Number(this.withdrawform.amount))) {
            if (this.withdrawInfo.needSms) {
              this.subDialogShow = true;
              this.sendCode(this.user.telephone);
            } else {
              if(this.check) {
                this.check = false;
                this.startLoading();
                this.doSave({action: 'saveForm'});
              }
            }
            // this.doSave({action: 'saveForm'});
          }
        }
      },
      withdrawSubmit() {
        if (factory.getValidator('mobilecode')(this.withdrawform.code)) {
          if(this.check) {
            this.check = false;
            this.startLoading();
            this.doSave({action: 'saveForm'});
          }
        }
      },
      checkAmount(value) {
        const reg = /^\d+$/;
        if (this.withdrawform.type ===0) {
          this.$toast('当前无可用提现方式');
        } else {
          if (!reg.test(value)) {
            this.$toast('提现金额应为正整数');
          } else {
            if (value > this.user.balance) {
              this.$toast(`提现金额超出中心钱包余额`);
            } else {
              if (this.withdrawform.type == 1) {
                if (value < this.generalConfig.minLimit) {
                  this.$toast(`普通单笔提现金额最小为${this.generalConfig.minLimit}`);
                } else if (value > this.generalConfig.maxLimit) {
                  this.$toast(`普通单笔提现金额最大为${this.generalConfig.maxLimit}`);
                } else {
                  return true;
                }
              } else if (this.withdrawform.type == 2) {
                if (value < this.quickConfig.minLimit) {
                  this.$toast(`快速单笔提现金额最小为${this.quickConfig.minLimit}`);
                } else if (value > this.quickConfig.maxLimit) {
                  this.$toast(`快速单笔提现金额最大为${this.quickConfig.maxLimit}`);
                } else {
                  return true;
                }
              }
            }
          }
        }
      },
      setWithdrawType() {
        if(this.generalStep === 0 ) {
          this.withdrawform.type = 1;
        } else if (this.generalStep !== 0 && this.quickStep === 0 ) {
          this.withdrawform.type = 2;
        } else if (this.generalStep !== 0 && this.quickStep !== 0) {
          this.withdrawform.type = 0;
        }
      }
    },
    mounted() {
      this.checkPhone();
      this.startLoading();
      if (this.user.telephone || this.telephone) {

        this.bindGet(getWithdrawInfo, 'withdrawInfo', {
          action: 'getWithdrawInfo',
          format: data => {
            _.each(data.cardList, (bankInfo) => {
              const bankName = _.find(consts.BANK_LIST, {
                value: bankInfo.bankId
              }).name;
              bankInfo.name = bankName;
              // bankInfo.pic = cache[`./${bankName}-small.png`];
            });
            this.balance = parseInt(data.balance);
            // this.str = `可转出到卡${_.currency(this.balance)}元`;
            this.str = `可转出到卡${this.balance}元`;
            this.withdrawform.name = data.name;
            this.$store.commit(types.SET_WITHDRAW_INFO, data);
            //默认选中银行卡
            if (data.cardList && data.cardList.length != 0) {
              this.withdrawform.cardId = data.cardList[0].cardId;
              this.bankName = data.cardList[0].name;
              this.bankChoice = `${data.cardList[0].bankName}(${data.cardList[0].cardNo})`;
            } else {
              this.bankChoice = '尚未设定提款账户';
              this.bankName= '';
            }
            if(data.leftAmount > 0) {
              this.$router.push({
                name: 'withdrawWarning',
                query: {
                  leftAmount: data.leftAmount
                }});
            }
            this.closeLoading();
            return data;
          }
        });

        this.bindGet(getWithdrawStatus, 'lastStatus', {
          action: 'getWithdrawStatus',
          format:(data) => {
            if (!data) {
              return ;
            } else if (data.length !== 0) {
              this.lastStatus = data;
              _.each(data, (item) => {
                this.checkIsInProgress(item.status);
              });
              if (this.isInProgress) {
                this.$toast('你有一笔提现正在进行中');
                this.$store.commit(types.SET_WITHDRAW_STATUS, data);
                this.$router.push({path: '/withdraw-manager/result'});
              }
            }
          }
        });

        this.doGet({action: 'getWithdrawInfo'});

        this.doGet({action: 'getWithdrawStatus'});
      }
      this.bindSave(submitWithdraw, 'saveForm', 'withdrawform',
        {
          beforeSend: (data) => {
            return data;
          },
          callback: ([result, data]) => {
            this.check = true;
            if (!result) {
              this.$toast(data.message);
            } else {
              this.$toast('提现成功');
              this.closeLoading();
              this.$router.push({path: '/withdraw-manager/result'});
            }
          }
        }
      );
    }
  };
</script>

<style lang="scss" scoped>
  @include b(withdarw-container) {
    min-height: calc(100vh - 75px);
    .bank-img {
      width: 30px;
      height: 30px;
      &.gongshang {
        @include bank(gongshang) {
        }
      }
      &.jiaotong {
        @include bank(jiaotong) {
        }
      }
      &.jianshe {
        @include bank(jianshe) {
        }
      }
      &.zhaoshang {
        @include bank(zhaoshang) {
        }
      }
      &.nongye {
        @include bank(nongye) {
        }
      }
      &.zhongguo {
        @include bank(zhongguo) {
        }
      }
      &.guangfa {
        @include bank(guangfa) {
        }
      }
      &.pufa {
        @include bank(pufa) {
        }
      }
      &.guangda {
        @include bank(guangda) {
        }
      }
      &.minsheng {
        @include bank(minsheng) {
        }
      }
      &.pingan {
        @include bank(pingan) {
        }
      }
      &.xinye {
        @include bank(xinye) {
        }
      }
      &.zhongxin {
        @include bank(zhongxin) {
        }
      }
      &.youzheng {
        @include bank(youzheng) {
        }
      }
    }
    @keyframes refresh {
      0%{
        transform: rotate(0)
      }
      50%{
        transform: rotate(180deg)
      }
      100%{
        transform: rotate(360deg)
      }
    }
    padding: 15px;
    background-color: #eff0f1;
    @include e(wallet) {
      height: 80px;
      padding: 35px 15px;
      background-color: #141f39;
      border-radius: 6px;
      color: white;
      .wallet-tips {
        font-weight: bold;
        font-size: 16px;
      }
      .wallet-name {
        margin-top: 15px;
      }
      .wallet-money {
        display: flex;
        align-items: baseline;
        .icon {
          margin-bottom: 5px;
          font-size: 10px;
        }
        .num {
          font-size: 24px;
        }
        .refresh {
          @include utils-bg(url("../../../assets/refresh.png") no-repeat top, contain);
          /*background-color: #8d929e;*/
          border-radius: 50%;
          margin-left: 10px;
          height: 16px;
          width: 16px;
          display: flex;
          justify-content: center;
          align-items: center;
          &.animate {
            animation: refresh 2s linear infinite 0.1s;
          }
        }
      }
    }
    @include e(warn) {
      line-height: 30px;
      display: flex;
      align-items: center;
      .warn-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background-color: red;
        color: white;
      }
      .warn-text {
        margin-left: 10px;
        color: red;
      }
    }
    @include e(card-old) {
      /*padding: 20px;*/
      /*background-color: white;*/
      /*border-top-left-radius: 6px;*/
      /*border-top-right-radius: 6px;*/
      /*border-bottom: 1px #f6f6f7 solid;*/
      /*.card-title {*/
        /*font-size: 18px;*/
        /*font-weight: bold;*/
      /*}*/
      /*.card-choice {*/
        /*display: flex;*/
        /*align-items: center;*/
        /*justify-content: space-between;*/
        /*height: 40px;*/
        /*margin-top: 15px;*/
        /*border-radius: 4px;*/
        /*padding: 0 15px;*/
        /*background-color: #F5F6F7;*/
        /*span {*/
          /*font-size: 14px;*/
        /*}*/
        /*i {*/
          /*font-size: 18px;*/
        /*}*/
      /*}*/
    }
    @include e(sum-old) {
      /*padding: 20px;*/
      /*background-color: white;*/
      /*border-bottom-left-radius: 6px;*/
      /*border-bottom-right-radius: 6px;*/
      /*.sum-title {*/
        /*font-size: 18px;*/
        /*font-weight: bold;*/
      /*}*/
      /*.sum-tips {*/
        /*color: #b3b3b3;*/
        /*margin-top: 5px;*/
        /*.red {*/
          /*color: red;*/
          /*font-weight: bold;*/
        /*}*/
      /*}*/
      /*.sum-input {*/
        /*color: #a6aab1;*/
        /*margin-top: 20px;*/
        /*height: 60px;*/
        /*padding: 10px 15px;*/
        /*border-radius: 4px;*/
        /*background-color: #F5F6F7;*/
        /*.sum-input-num {*/
          /*display: flex;*/
          /*align-items: center;*/
          /*justify-content: space-between;*/
          /*margin-top: 5px;*/
          /*font-size: 24px;*/
          /*.van-field {*/
            /*background-color: #F5F6F7;*/
            /*color: #a6aab1;*/
          /*}*/
        /*}*/
      /*}*/
    }
    @include e(card) {
      padding:5px 20px;
      background-color: white;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      border-bottom: 1px #f6f6f7 solid;
      .card-choice {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 40px;
        border-radius: 4px;
        .bank-box {
          display: flex;
          align-items: center;
        }
        span {
          margin-left: 10px;
          font-size: 14px;
        }
        i {
          font-size: 18px;
        }
      }
    }
    @include e(sum) {
      padding: 8px 20px;
      background-color: white;
      border-bottom: 1px #f6f6f7 solid;
      .sum-input {
        display: flex;
        align-items: center;
        background-color: #F5F6F7;
        padding:0 5px;
        border-radius: 4px;
        .sum-input-icon {
          font-size: 18px;
          font-weight: bold;
          color: #b3b3b3;
        }
        .sum-input-all {
          width: 40px;
          color: #1E5ADC;
        }
        .van-cell {
          background-color: #F5F6F7;
          color: #a6aab1;
          position: static;
        }
      }
    }
    @include e(way) {
      padding:15px 20px;
      background-color: white;
      .way-title {
        color: #666666;
        .tip{
          vertical-align: middle;
          float: right;
          .van-icon{
            font-size: 14px;
          }
        }
      }
      .way-item {
        padding: 15px 20px 15px 25px;
        position: relative;
        .choice-img {
          position: absolute;
          left: -8px;
          top: 20px;
          width: 30px;
          height: 30px;
          &.choice {
            @include utils-bg(url("../../../assets/choice.png") no-repeat top, contain);
          }
          &.un-choice {
            @include utils-bg(url("../../../assets/un-choice.png") no-repeat top, contain);
          }
          &.no-choice {
            @include utils-bg(url("../../../assets/undone.png") no-repeat center, 23px);
          }
        }
        &.border {
          border-bottom: 1px #f6f6f7 solid;
        }
        .way-item-title {
          font-size: 14px;
          margin-bottom: 5px;
        }
        .way-item-text {
          color: #b3b3b3;
          .red {
            color: red;
            font-weight: bold;
          }
        }
      }
    }
    @include e(dialog) {
      padding-top: 20px;
      .delete-icon {
        position: absolute;
        top: 7px;
        right: 7px;
      }
      .dialog-img {
        margin: 0 auto;
        width: 140px;
        height: 140px;
        @include utils-bg(url("../../../assets/tips.png") no-repeat top, contain);
      }
      .dialog-title {
        font-weight: bold;
        margin-top: 25px;
        text-align: center;
      }
      .dialog-text {
        padding: 0 25px;
        margin-top: 10px;
        text-align: center;
        font-size: 14px;
        color: #a5a5a5;
      }
      .dialog-button {
        width: 100%;
        border-radius: 0px;
        /*bottom: 0;*/
        margin-top: 20px;
      }
    }
    @include e(subDialog) {
      .dialog-img {
        margin: 0 auto;
        width: 140px;
        height: 140px;
        @include utils-bg(url("../../../assets/tips.png") no-repeat top, contain);
      }
      .dialog-title {
        font-weight: bold;
        margin-top: 10px;
        text-align: center;
      }
      .dialog-text {
        padding: 0 15px;
        margin-top: 20px;
        font-size: 14px;
        color: #a5a5a5;
        font-size: 12px;
        .blue {
          color: #1E5ADC;
        }
      }
      .dialog-button {
        width: 100%;
        border-top-left-radius: 0px;
        border-top-right-radius: 0px;
      }
      .van-cell-group {
        margin: 15px 15px 40px 15px;
      }
      .van-cell {
        font-size: 12px;
        display: flex;
        align-items: baseline;
        .code {
          width: 60px;
        }
        .blue {
          color: #1E5ADC;
        }
      }
    }
    @include e(pop) {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      height: 420px;
      .pop-header {
        border-bottom: 1px solid #ebedf0;
        display: flex;
        justify-content: space-between;
        padding: 20px 15px;
        font-size: 14px;
        font-weight: bold;
        .pop-header-edit {
          color: #1E5ADC;
        }
      }
      .pop-warn {
        line-height: 40px;
        border-bottom: 1px solid #ebedf0;
        padding:0 15px;
        display: flex;
        align-items: center;
        .warn-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background-color: #ea4335;
          color: white;
        }
        .warn-text {
          margin-left: 10px;
          color: #ea4335;
        }
      }
      .pop-card-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0px 15px;
        height: 60px;
        border-bottom: 2px solid #ebedf0;
        .bank-box {
          display: flex;
          align-items: center;

          .bank-name {
            font-size: 14px;
            margin-left: 10px;
          }
        }
        .choice-img {
          &.choice {
            width: 30px;
            height: 30px;
            @include utils-bg(url("../../../assets/choice.png") no-repeat top, contain);
          }
          &.un-choice {
            width: 30px;
            height: 30px;
            @include utils-bg(url("../../../assets/un-choice.png") no-repeat top, contain);
          }
        }
      }
      .pop-card-add {
        margin: 15px;
        font-size: 16px;
        line-height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 45px;
        border: 1px dashed #cccccc;
        color: #1E5ADC;
        border-radius: 4px;
        .add-icon {
          margin-right: 5px;
          width: 25px;
          height: 25px;
          @include utils-bg(url("../../../assets/add.png") no-repeat top, contain);
        }
      }
    }
  }
</style>
