<template>
  <div class="recharge-choose-payment">
    <div class="recharge-choose-payment__amount">待充值：{{form.amount | currency}}</div>
    <div class="payment-container">
      <div class="payment-container__title">充值方式</div>
      <van-collapse v-model="selectedPayment" @change="changePayment" accordion>
        <van-collapse-item v-for="item in rechargeList" :key="item.paymentId" :name="item.paymentId"
                           class="payment-container-item" :disabled="item.disableCollapse"
                           value-class="van-cell__value-hidden">
          <div slot="title" class="payment-container-item__title" @click="showChangeAmountDialog(item)">
            <payment-pic :payment-id="item.paymentId"></payment-pic>
            <div class="payment-container-item__payment-name">
              <div class="payment-container-item__payment-name-desc" :class="item.disableCollapse?'disabled':''">
                {{item.paymentName}}
              </div>
              <div class="payment-container-item__amount-limit-desc"><span v-if="item.feeAmount > 0">手续费{{item.feeAmount | currency}}元,</span>
                单笔限额{{item.minAmount+ "~" +item.maxAmount}}元
              </div>
            </div>
          </div>
          <div slot="right-icon" class="payment-container-item__radio" @click="showChangeAmountDialog(item)">
            <span class="payment-container-item__radio-item"
                  :class="{'active':item.paymentId === form.paymentId,'disabled':item.disableCollapse}"></span>
          </div>
          <div class="payment-container-item__detail">
            <div class="payment-container-item__choose-bank mb-10"
                 v-if="[consts.PAY_WANGYIN, consts.PAY_BANKCARD_ZHUANZ].indexOf(form.paymentId) !== -1">
              <van-cell title="选择支付银行" v-if="form.bankId === undefined" is-link @click="showBankList = true"
                        class="payment-container-item__choose-bank-title"/>
              <van-cell is-link v-else @click="showBankList = true" class="payment-container-item__choose-bank-title">
                <div slot="icon" class="img">
                  <bank-pic :bank-id="form.bankId"></bank-pic>
                </div>
                <div slot="title" class="title">
                  {{bankName}}
                </div>
              </van-cell>
              <van-actionsheet v-model="showBankList" title="选择付款银行">
                <van-radio-group v-model="form.bankId" class="payment-container-item__choose-bank-radio-group">
                  <van-cell-group>
                    <van-cell :title="item.bankName" clickable @click="form.bankId = item.bankId;showBankList=false"
                              v-for="item in bankList" :key="item.bankId"
                              class="payment-container-item__choose-bank-radio-item">
                      <div slot="icon">
                        <bank-pic :bank-id="item.bankId"></bank-pic>
                      </div>
                      <van-radio :name="item.bankId" @change="getBankCode"></van-radio>
                    </van-cell>
                  </van-cell-group>
                </van-radio-group>
              </van-actionsheet>
            </div>
            <!-- <div class="payment-container-item__ali-name" v-if="form.paymentId == consts.PAY_ZHIFUBAO_ZHUANZ">
                <van-cell is-link  @click="showName = true" class="payment-container-item__edit-name-title">
                    <div slot="title" class="title">
                      {{form.name === undefined ? '请输入支付宝姓名' : form.name}}
                    </div>
                </van-cell>
                <el-warning class="text-danger payment-container-item__warning">请与实际付款账户姓名保持一致，否则影响到帐</el-warning>
                <van-actionsheet v-model="showName" title="输入支付宝姓名" class="payment-container-item__van-action" rightTitleText="确定">
                  <van-cell-group>
                    <van-field v-model="form.name" placeholder="输入支付宝姓名" maxlength="38" class="payment-container-item__van-field"/>
                  </van-cell-group>
                  <el-warning class="text-danger">请与实际付款账户姓名保持一致，否则影响到帐</el-warning>
                </van-actionsheet>
            </div> -->
            <div class="payment-container-item__card-no" v-if="item.needCardNo">
              <van-cell is-link @click="showCardNo = true" class="payment-container-item__edit-name-title">
                <div slot="title" class="title">
                  {{form.cardNo === undefined ? '请输入充值银行卡号' : form.cardNo}}
                </div>
              </van-cell>
              <van-actionsheet v-model="showCardNo" title="请选择充值银行卡号" rightTitleText="确定">
                <van-radio-group v-model="form.cardNo" class="payment-container-item__choose-bank-radio-group">
                  <van-cell-group>
                    <van-cell :title="item" clickable @click="form.cardNo = item" v-for="item in item.cardList"
                              :key="item" class="payment-container-item__choose-bank-radio-item">
                      <van-radio :name="item"></van-radio>
                    </van-cell>
                  </van-cell-group>
                  <div class="payment-container-item__new-card-btn" @click="editCardNo">＋　使用新银行卡充值</div>
                </van-radio-group>
              </van-actionsheet>
              <van-actionsheet v-model="showEditCardNo" title="输入充值银行卡号" class="payment-container-item__van-action"
                               rightTitleText="确定">
                <van-cell-group>
                  <van-field type="number" v-model="form.cardNo" placeholder="输入充值银行卡号"
                             class="payment-container-item__van-field"/>
                </van-cell-group>
              </van-actionsheet>
            </div>
            <div class="payment-container-item__card-name" v-if="item.needName">
              <van-cell is-link @click="showCardName = true" class="payment-container-item__edit-name-title">
                <div slot="title" class="title">
                  {{form.name === undefined ? '请输入' + nameTitle : form.name}}
                </div>
              </van-cell>
              <van-actionsheet v-model="showCardName" :title="'请选择' + nameTitle" rightTitleText="确定">
                <van-radio-group v-model="form.name" class="payment-container-item__choose-bank-radio-group">
                  <van-cell-group>
                    <van-cell :title="item" clickable @click="form.name = item" v-for="item in item.nameList"
                              :key="item" class="payment-container-item__choose-bank-radio-item">
                      <van-radio :name="item"></van-radio>
                    </van-cell>
                  </van-cell-group>

                  <div class="payment-container-item__new-card-btn" @click="editCardName">＋　使用新{{nameTitle}}</div>
                </van-radio-group>
              </van-actionsheet>
              <van-actionsheet v-model="showEditCardName" :title="'输入' + nameTitle" ref="editName"
                               class="payment-container-item__van-action" rightTitleText="确定">
                <van-cell-group>
                  <van-field v-model.trim="form.name" :title="'输入' + nameTitle" class="payment-container-item__van-field" />
                </van-cell-group>
              </van-actionsheet>
            </div>
          </div>
        </van-collapse-item>
      </van-collapse>
      <div class="recharge-choose-payment__no-payment-tip" v-if="noPaymentType">
        <div class="recharge-choose-payment__tip-item">抱歉，当前没有可直接使用的付款方式</div>
        <div class="recharge-choose-payment__tip-item text-danger">单笔最高充值金额{{changeAmountInfo.maxAmount}}元</div>
        <div class="recharge-choose-payment__tip-item text-danger">充值方式：{{changeAmountInfo.paymentName}}</div>
      </div>
      <div class="recharge-choose-payment__confirm-button">
        <button v-if="!noPaymentType" @click="doRechargeNow">确定</button>
        <button v-else @click="showChangeAmountDialog(changeAmountInfo)">修改充值金额为{{changeAmountInfo.maxAmount}}元</button>
      </div>
    </div>
    <div v-if="rechargeStatus">
      <has-recharge-order-dialog

        :rechargeStatus="rechargeStatus"
        :warningStatus="warningStatus"
        @closeRechargeOrder="closeRechargeOrder"
        @showResetDialog="showResetDialog"
      ></has-recharge-order-dialog>
      <reset-recharge-dialog

        :rechargeStatus="rechargeStatus"
        :warningStatus="resetDialog"
        @cancel="closeResetDialog"
      ></reset-recharge-dialog>
    </div>
    <van-dialog v-model="changeAmountDialog" message-align='center' closed>
      <warning-dialog type="warn">
        <template slot='brief'>
          <div class="title">{{changeAmountInfo.paymentName}}充值</div>
          <div class="amount">单笔最高充值金额为{{changeAmountInfo.maxAmount}}元</div>
        </template>
        <template slot='button'>
          <span @click="changeAmount(changeAmountInfo)">修改充值金额为{{changeAmountInfo.maxAmount}}</span>
        </template>
      </warning-dialog>
    </van-dialog>
  </div>
</template>
<script>
  import {getLogin} from '@/utils/auth';
  import {factory, form, capitalOperation} from '@/build';
  import {getRechargeList, getRechargeStatus, rechargeTransfer} from '@/services/api/finance';
  import ResetRechargeDialog from "@/views/finance/recharge/reset-recharge-dialog";
  import HasRechargeOrderDialog from "@/views/finance/recharge/has-recharge-order";
  import localBankList from '../bank-config';

  export default {
    name: "finance-payment",
    mixins: [form, factory, capitalOperation],
    props: ["rechargeAmount", "type"],
    components: {HasRechargeOrderDialog, ResetRechargeDialog},
    data() {
      return {
        rechargeList: [],
        cardList: [],
        nameList: [],
        needCardNo: false,
        needName: false,
        innerPay: false,
        form: {
          amount: this.rechargeAmount,
          paymentId: undefined,
          bankId: undefined,
          name: undefined,
          cardNo: undefined
        },
        rechargeFlag: true,
        rechargeStatus: undefined,
        showBankList: false,
        showName: false,
        showCardNo: false,
        showEditCardNo: false,
        showCardName: false,
        showEditCardName: false,
        changeAmountDialog: false,
        selectedPayment: 1,
        changeAmountInfo: {
          paymentName: '',
          maxAmount: 0,
        },
        noPaymentType: false,
        warningStatus: false,
        resetDialog: false,
      };
    },
    watch:{
      // showEditCardName(val){
      //   if(!val){
      //     this.onCancel();
      //   }
      // }
    },
    computed: {
      nameTitle() {
        if (this.form.paymentId === consts.PAY_BANKCARD_ZHUANZ) {
          return "银行卡姓名";
        } else if (this.form.paymentId === consts.PAY_ZHIFUBAO_ZHUANZ) {
          return "支付宝姓名";
        }
      },
      amount() {
        if (!_.isUndefined(this.form.amount)) {
          return this.form.amount.toFixed(2);
        }
      },
      actual() {
        return parseInt(this.form.amount) - this.feeAmount;
      },
      bankList() {
        return this.rechargeMethod.bankList;
      },
      bankName() {
        return _.find(this.bankList, {bankId: this.form.bankId}).bankName;
      },
      rechargeMethod() {
        let obj = {};
        _.map(this.rechargeList, item => {
          if (item.paymentId === this.form.paymentId) {
            obj = item;
          }
        });

        return obj;
      },
      ...mapState({
        user: state => state.user
      })
    },
    methods: {
      closeRechargeOrder() {
        this.warningStatus = false;
      },
      showResetDialog() {
        this.warningStatus = false;
        this.resetDialog = true;
      },
      closeResetDialog() {
        this.resetDialog = false;
      },
      getSelectedPayment(paymentList) {
        let defaultPaymentType = _.find(paymentList, {disableCollapse: false});
        if (defaultPaymentType) {
          this.noPaymentType = false;
          this.selectedPayment = _.find(paymentList, {disableCollapse: false}).paymentId;
          this.form.paymentId = this.selectedPayment;
          this.form = {
            amount: this.form.amount,
            paymentId: defaultPaymentType.paymentId,
            bankId: defaultPaymentType.bankList ? defaultPaymentType.bankList[0].bankId : 1,
            merchantId: defaultPaymentType.merchantId,
            paymentName: defaultPaymentType.paymentName,
            name: undefined,
          };
        } else {
          this.noPaymentType = true;
          this.changeAmountInfo = _.maxBy(paymentList, function (val) {
            return val.maxAmount;
          });
        }
      },
      showChangeAmountDialog(item) {
        if (item.disableCollapse) {
          this.changeAmountInfo = item;
          this.changeAmountDialog = true;
        }else{
          this.changePayment(item.paymentId);
        }
      },
      changeAmount(item) {
        this.form = {
          amount: item.maxAmount,
            paymentId: item.paymentId,
            bankId: item.bankList ? item.bankList[0].bankId : 1,
            merchantId: item.merchantId,
            paymentName: item.paymentName,
            name: undefined,
          };
        this.needName = item.needName;
        this.formatRechargeList(this.rechargeList);
        this.selectedPayment = item.paymentId;
        this.changeAmountDialog = false;
        this.noPaymentType = false;
      },
      disableCollapse(item) {
        if (this.form.amount > item.maxAmount || this.form.amount < item.minAmount) {
          return true;
        }
        return false;
      },
      changePayment(data) {
        if (data) {
          this.form.paymentId = data;
          this.getPaymentId(data);
        }
      },
      editCardNo() {
        this.form.cardNo = undefined;
        this.showCardNo = false;
        this.showEditCardNo = true;
      },
      editCardName() {
        this.form.name = undefined;
        this.showCardName = false;
        this.showEditCardName = true;
      },
      getBankName(bankId) {
        return _.find(this.bankList, {bankId: bankId}).bankName;
      },
      initForm() {
        // const rechargeList = JSON.parse(window.localStorage.getItem('rechargeList'));
        let defaultPaymentType = _.find(this.rechargeList, {disableCollapse: false});
        this.form = {
          amount: this.form.amount,
          paymentId: defaultPaymentType.paymentId,
          bankId: defaultPaymentType.bankList ? defaultPaymentType.bankList[0].bankId : 1,
          merchantId: defaultPaymentType.merchantId,
          paymentName: defaultPaymentType.paymentName,
          name: undefined,
        };
      },
      getPaymentId(paymentId) {
        _.map(this.rechargeList, item => {
          if (item.paymentId === paymentId) {
            this.form.merchantId = item.merchantId;
            this.form.paymentName = item.paymentName;
            this.needCardNo = item.needCardNo;
            this.needName = item.needName;
            this.innerPay = item.innerPay;
          }
        });
      },
      getBankCode(bankId) {
        _.map(this.bankList, item => {
          if (item.bankId === bankId) {
            this.form.bankCode = item.bankCode;
          }
        });
      },

      doRechargeNow() {
        if (this.rechargeFlag) {
          if (this.rechargeStatus) {
            this.warningStatus = true;
            return false;
          }
          this.rechargeFlag = false;
          localStorage.setItem("rechargeInfo", JSON.stringify(this.form));
          switch (this.form.paymentId) {
            //银行卡转账
            case consts.PAY_BANKCARD_ZHUANZ:
              if(this.needName){
                if (this.checkName()) {
                  this.$_doRechargeTransfer();
                }
              }else{
                this.$_doRechargeTransfer();
              }
              break;
            //支付宝转账
            case consts.PAY_ZHIFUBAO_ZHUANZ:
              if (this.innerPay) {
                if (this.checkName()) {
                  this.$_doRechargeTransfer();
                }
              } else {
                if (this.checkName()) {
                  this.$_doBankPayment();
                }
              }
              break;
            // 微信转账
            case consts.PAY_WEIXIN_ZHUANZ:
              this.$_doRechargeTransfer();
              break;
            case consts.PAY_QUICK_PAY:
              if (this.checkName() ) {
                this.$_doBankPayment();
              }
              break;
            // 网银支付/快捷支付/银联扫码
            default:
              this.$_doBankPayment();
          }
        }
        // }else{
        //   this.warningStatus = true;
        // }
      },

      $_doBankPayment() {
        const {token, uid} = getLogin();
        const urlStr = this.$_urlEncode({
          token,
          uid,
          os_type: 1,
          device_id: this.user.deviceId,
          ...this.form
        }).substr(1);
        const $_window = window.open(`/api/gl/recharge/submit?${urlStr}`, "_blank");
        if ($_window) {
          setTimeout(() => {
            this.doAction({type: "get", action: "getStatus"});
            this.rechargeFlag=true;
            this.$router.push({path: "/"});
          }, 2000);
        }
      },
      $_doWeixinTransfer() {
        this.fakeAmount = (this.form.amount - Math.random(0, 0.99)).toFixed(2);
        this.$confirm(
          `<p>系统对您的充值金额调整为<span>${
            this.fakeAmount
            }</span>元<br/>请支付<span>${this.fakeAmount}</span>元</p>`,
          "【为了避免支付限额】",
          {
            confirmButtonText: "去支付",
            cancelButtonText: "",
            dangerouslyUseHTMLString: true,
            showCancelButton: false,
            type: "warning",
            center: true
          }
        )
          .then(() => {
            this.$_doRechargeTransfer();
          })
          .catch(() => {
            // this.$message({
            //   type: 'info',
            //   message: '取消'
            // });
          });
      },
      $_doRechargeTransfer() {
        this.rechargeFlag = false;
        this.doSave({
          action: "rechargeTransfer",
        });
      },
      checkName() {
        if (this.form.paymentId === consts.PAY_BANKCARD_ZHUANZ && this.needName && !this.form.name) {
          this.rechargeFlag = true;
          this.$toast("请输入银行卡姓名");
          return false;
        }
        if (this.form.paymentId === consts.PAY_ZHIFUBAO_ZHUANZ && !this.form.name) {
          this.rechargeFlag = true;
          this.$toast("请输入支付宝姓名");
          return false;
        }
        if (this.form.paymentId === consts.PAY_QUICK_PAY && this.needCardNo && !this.form.cardNo) {
          this.rechargeFlag = true;
          this.$toast("请输入银行卡号");
          return false;
        }
        return true;
      },
      $_urlEncode(param, key, encode) {
        if (param == null) return "";
        let paramStr = "";
        const t = typeof param;
        if (t === "string" || t === "number" || t === "boolean") {
          paramStr +=
            "&" +
            key +
            "=" +
            (encode == null || encode ? encodeURIComponent(param) : param);
        } else {
          for (let i in param) {
            let k =
              key == null
                ? i
                : key + (param instanceof Array ? "[" + i + "]" : "." + i);
            paramStr += this.$_urlEncode(param[i], k, encode);
          }
        }
        return paramStr;
      },
      formatRechargeList(paymentList) {
        _.each(paymentList, (item) => {
          let fee = (parseInt(this.form.amount) * item.feeRate) / 100;
          item.feeAmount = fee > item.maxFee ? item.maxFee : fee;
          item.disableCollapse = this.disableCollapse(item);
        });
        this.rechargeList = _.sortBy(paymentList,item=>{
          return item.disableCollapse;
        });
      },
      // onCancel(){
      //   const reg = /^[\u4E00-\u9FA5`~!@#\$%^&\*()\+=\|\{\}':;,\[\].<>/\?\.—‘”“’· --]+$/;
      //   if(!reg.test(this.form.name)){
      //     this.$toast('请输入正确的姓名');
      //     this.form.name = undefined;
      //   }
      // }
    },
    mounted() {
      this.bindGet(getRechargeList, 'rechargeList', {
        format: data => {
          data = Number(this.type) === 0 ? data.common : data.large;
          let {paymentList} = data;
          paymentList = paymentList.filter((item) => {
            return _.find(consts.PAYMENT_LIST, {value: Number(item.paymentId)});
          });
          this.formatRechargeList(paymentList);
          paymentList = _.sortBy(paymentList,item=>{
            return item.disableCollapse;
          });
          _.each(paymentList, (item) => {
            if (item.paymentId === consts.PAY_BANKCARD_ZHUANZ) {
              item.bankList = localBankList;
            }
            if (item.paymentId === consts.PAY_QUICK_PAY && item.cardList && item.cardList.length > 0) {
              //  item.cardList.map(item=>{
              //    this.cardList.push({value:item})
              //  })
              this.needCardNo = item.needCardNo;
              this.cardList = item.cardList;
            }
            item.paymentPic = _.find(consts.PAYMENT_LIST, {value: Number(item.paymentId)}).pic;
          });
          this.needCardNo = paymentList[0].needCardNo;
          this.needName = paymentList[0].needName;
          this.innerPay = paymentList[0].innerPay;
          this.getSelectedPayment(paymentList);
          window.localStorage.setItem('rechargeList', JSON.stringify(paymentList));
          return paymentList;
        }
      });
      this.bindSave(rechargeTransfer, 'rechargeTransfer', 'form', {
        successMessage: '',
        beforeSend: (data) => {
          this.formError = '';
          return data;
        },
        afterSuccess: ([result, data]) => {
          this.rechargeFlag=true;
          if (result) {
            this.$router.push({name: "recharge-status"});
            this.doAction({type: 'get', action: getRechargeList.name});
          } else {
            this.formError = data.message;
          }
        }
      });


      this.bindGet(getRechargeStatus, 'rechargeStatus', {
        action: 'getStatus',
        format: data => {
          if (!_.isUndefined(data) && !_.isEmpty(data)) {
            this.warningStatus = true;
            const rechargeList = JSON.parse(window.localStorage.getItem('rechargeList'));
            _.map(rechargeList, item => {
              if (item.paymentId === data.paymentId) {
                data.paymentName = item.paymentName;
              }
            });
          }
          return data;
        }
      });
      this.getAll();
    },
  };
</script>
<style lang="scss" scoped>
  $--input-width: 306px;
  @include b(recharge-choose-payment) {
    background: $--background-color-base;
    padding: 12px 16px;
    position: absolute;
    top: 44px;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    @include e(confirm-button) {
      text-align: center;
      padding-bottom: 40px;
      button {
        width: $--input-width;
        height: 50px;
        border-radius: 5px;
        background-color: rgba(30, 90, 220, 1);
        text-align: center;
        box-shadow: 0px 4px 10px 0px rgba(30, 90, 220, 0.5);
        border: none;
        color: $--color-white;
        font-size: $--font-size-x-large;
        text-align: center;
        line-height: 50px;
        margin-top: 20px;
      }
    }
    @include e(no-payment-tip) {
      padding: 12px 18px;
      padding-bottom: 0;
      @include e(tip-item) {
        font-size: $--font-size-base;
        line-height: 24px;

      }
    }
    @include e(amount) {
      border-radius: 12px;
      background: $--color-primary;
      padding: 20px;
      color: $--color-white;
      border-radius: 8px;
      box-shadow: 0px 2px 7px 0px rgba(22, 32, 106, 0.35);
      margin: 10px 0;
      font-size: $--font-size-x-large;
      font-weight: bold;
    }
    @include b(payment-container) {
      border-radius: 12px;
      background: $--color-white;
      padding: 0 10px;
      @include e(title) {
        padding: 20px;
        color: $--color-black;
        font-size: $--font-size-x-large;
        font-weight: bold;
      }
      @include b(van-collapse-item) {
        padding-bottom: 0;
        /deep/ .van-collapse-item__wrapper {
          padding-bottom: 0px;
          /*display: none;*/
        }
      }
      @include b(payment-container-item) {
        @include e(card-name) {
          margin-bottom: 10px;
        }
        @include e(new-card-btn) {
          width: $--input-width;
          height: 44px;
          line-height: 44px;
          text-align: center;
          color: $--color-primary;
          border-radius: 5px;
          border: 1px dashed $--border-color-base;
          margin: 10px auto;
          font-size: $--font-size-large;
        }
        @include e(title) {
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
        @include e(warning) {
          background: $--color-white;
          padding-top: 10px;
        }
        @include e(payment-name) {
          margin-left: 14px;
          @include e(payment-name-desc) {
            color: $--color-text-primary;
            font-size: 14px;
            font-family: PingFangSC-Semibold;
            font-weight: bold;
            &.disabled {
              color: $--color-text-secondary;
            }

          }
          @include e(amount-limit-desc) {
            color: $--color-text-secondary;
            font-size: 14px;
            font-family: PingFangSC-Semibold;
          }
        }
        @include e(radio) {
          margin-right: 14px;
          @include e(radio-item) {
            display: inline-block;
            width: 15px;
            height: 15px;
            border: 1px solid rgba(151, 151, 151, 1);
            border-radius: 50%;
            &.active {
              width: 8px;
              height: 8px;
              border: 5px solid $--color-primary;
            }
            &.disabled {
              background: #e2e2e2;
              border-color: #e2e2e2;
            }
          }
        }
        @include e(detail) {
          background: $--color-white;
          @include e(choose-bank-title) {
            background: $--background-color-base;
            border-radius: 5px;
            .img {
              padding-left: 10px;
            }
            .title {
              padding-left: 10px;
            }
          }
          @include e(edit-name-title) {
            background: $--background-color-base;
            border-radius: 5px;
            .title {
              padding-left: 20px;
            }
          }
          @include e(van-action) {
            height: 200px;
            .van-hairline--top-bottom::after {
              border: none;
            }
            @include e(van-field) {
              width: 343px;
              height: 42px;
              border-radius: 5px;
              padding-left: 10px;
              margin: 20px auto;
              background-color: rgba(245, 246, 247, 1);
            }
          }

        }
        @include e(choose-bank-radio-group) {
          height: 400px;
          overflow-y: scroll;
          @include e(choose-bank-radio-item) {
            padding: 10px 20px;
          }
        }
      }
    }
  }
</style>

