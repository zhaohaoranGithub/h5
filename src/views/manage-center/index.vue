<template>
  <div class="main">
    <div class="main__header">
      <div class="main__header-img">
        <img src="./../../components/avatar-select/avatars/header-1.png" alt="" v-if='!avatar'>
        <img :src="headerImg.pic" alt="" v-else>
      </div>
      <div class="main__header-name">{{user.username}}<i class="main__header-edit" @click="goTo('personalData')"></i></div>
      <!--<div class="main__header-txt">这是你成为贝博会员的第{{parseInt((Date.parse(new Date())-user.registerDate)/ 3600 / 24 /-->
      <!--1000)>0?parseInt((Date.parse(new Date())-user.registerDate)/ 3600 / 24 / 1000):'1'}}天-->
      <!--</div>-->
      <div class="main__header-txt">这是你成为贝博会员的第{{registerDate}}天
      </div>
    </div>
    <div class="main__cell">
      <van-cell value="查看钱包" is-link @click.native="$router.push({name:'Wallet'})">
        <template slot="title">
          <span class="custom-text">中心钱包：</span>
          <!--<van-tag type="danger">¥{{user.balance | currency}}</van-tag>-->
          <van-tag>¥{{user.balance | currency}}</van-tag>
        </template>
      </van-cell>
      <van-row>
        <van-col span="6">
          <div class="main__menu" @click="gotoRecharge">
            <div class="mc-recharge"></div>
            <div class="main__menu-txt">充值</div>
          </div>
        </van-col>
        <van-col span="6">
          <router-link tag="div" :to='{name:"fund-transfer"}' class="main__menu">
            <div class="mc-transfer"></div>
            <div class="main__menu-txt">转账</div>
          </router-link>
        </van-col>
        <van-col span="6">
          <div @click="goTo('withdrawManager')" class="main__menu">
            <div class="mc-withdraw"></div>
            <div class="main__menu-txt">提现</div>
          </div>
        </van-col>
        <van-col span="6">
          <router-link tag="div" :to='{name:"activity"}' class="main__menu">
            <div class="mc-activity"></div>
            <div class="main__menu-txt">活动</div>
          </router-link>
        </van-col>
      </van-row>
    </div>
    <div class="main__cell">
      <van-cell class="van-cell-msg" v-if="tableSystemData.length>0" is-link
                :value="tableSystemData.length>99?99:tableSystemData.length"
                @click="goTo('messageCenter')">
        <template slot="title">
          <div class="icon-mc-bg">
            <div class="icon-mc-message"></div>
          </div>
          <span class="custom-text">我的消息</span>
        </template>
      </van-cell>
      <van-cell class="van-cell-msg" v-else is-link @click="goTo('messageCenter')">
        <template slot="title">
          <div class="icon-mc-bg">
            <div class="icon-mc-message"></div>
          </div>
          <span class="custom-text">我的消息</span>
        </template>
      </van-cell>
      <van-cell is-link @click="goTo('capitalRecord')">
        <template slot="title">
          <div class="icon-mc-bg">
            <div class="icon-mc-capital"></div>
          </div>
          <span class="custom-text">资金明细</span>
        </template>
      </van-cell>
      <van-cell is-link @click="goTo('bettingRecord')">
        <template slot="title">
          <div class="icon-mc-bg">
            <div class="icon-mc-betting"></div>
          </div>
          <span class="custom-text">投注记录</span>
        </template>
      </van-cell>
    </div>
    <div class="main__cell">
      <!--<van-cell-group v-if="user.telephone != ''">-->
      <!--<van-switch-cell v-model="checked" title="提现短信验证" class="icon-mc-sms" @click.native="verifyTel"/>-->
      <!--</van-cell-group>-->
      <!--<van-cell-group v-else>-->
      <!--<van-switch-cell v-model="checked" title="提现短信验证" class="icon-mc-sms" @click.native="showTel"/>-->
      <!--</van-cell-group>-->
      <!--<van-cell-group v-if="user.telephone != ''">-->
      <!--<van-switch-cell v-model="checked" title="提现短信验证" class="icon-mc-sms" @click.native="verifyTel"/>-->
      <!--</van-cell-group>-->
      <!--<van-cell-group v-else>-->
      <!--<van-switch-cell v-model="checked" title="提现短信验证" class="icon-mc-sms" @click.native="showTel"/>-->
      <!--</van-cell-group>-->
      <van-cell value-class="phone-switch">
        <template slot="title">
          <div class="icon-mc-bg">
            <div class="icon-mc-sms"></div>
          </div>
          <span class="custom-text">提现短信验证</span>
        </template>
        <van-switch v-model="checked"
                    size="24px"
                    @click.native="user.telephone != '' ? verifyTel() : showTel()"/>
      </van-cell>
      <van-cell is-link @click="goTo('cardManager')">
        <template slot="title">
          <div class="icon-mc-bg">
            <div class="icon-mc-bank"></div>
          </div>
          <span class="custom-text">绑定提现银行卡</span>
        </template>
      </van-cell>
      <van-cell is-link @click="goTo('selectLine')">
        <template slot="title">
          <div class="icon-mc-bg">
            <div class="icon-mc-line"></div>
          </div>
          <span class="custom-text">线路更换</span>
        </template>
      </van-cell>
      <!--<van-cell is-link to="course?type=sport">-->
      <van-cell is-link @click="goTo('courseH5')">
        <template slot="title">
          <div class="icon-mc-bg">
            <div class="icon-mc-course"></div>
          </div>
          <span class="custom-text">新手教程</span>
        </template>
      </van-cell>
      <van-cell is-link @click="$router.push({name:'about-us-h5'})">
        <template slot="title">
          <div class="icon-mc-bg">
            <div class="icon-mc-about"></div>
          </div>
          <span class="custom-text">关于我们</span>
        </template>
      </van-cell>
    </div>
    <div class="main__cell">
      <van-button class="main__btn" size="large" @click.native="logoutAccount">退出</van-button>
    </div>
    <van-dialog v-model="dialogShow" closed>
      <warning-dialog type="warn">
        <template slot="title">
          绑定手机号
        </template>
        <template slot="brief">
          为了您的金钱安全，请先绑定您的手机号码，再进行{{operation}}操作
        </template>
        <template slot="button">
          <span @click="$router.push({name:'bindPhone'})">确定</span>
        </template>
      </warning-dialog>
    </van-dialog>
    <van-dialog v-model="verifyShow" closed>
      <warning-dialog type="">
        <template slot="title">
          确认提现短信提示
        </template>
        <template slot="brief">
          请输入验证码以确认提现短信的{{actionName}}
        </template>
        <template slot="content">
          <div>
            <van-cell-group>
              手机号码：{{user.telephone}}
            </van-cell-group>
            <van-cell-group>
              <van-field
                v-model="form.code"
                clearable
                placeholder="请输入验证码"
                left-icon="sign"
              >
                <van-button slot="button" size="small" type="primary" @click="sendCode" :disabled="sendingCode">
                  {{codeBtnText}}
                </van-button>
              </van-field>
            </van-cell-group>
          </div>
        </template>
        <template slot="button">
          <span @click="confirm">确定</span>
        </template>
      </warning-dialog>
    </van-dialog>
  </div>
</template>

<script>
  import {getWithdrawInfo} from '@/services/api/finance';
  import avatarList from "@/components/avatar-select/avatar-list.js";
  import {logout, form, getCode, gotoRecharge} from '@/build';
  import {getRechargeStatus} from '@/services/api/finance';
  import {systemNoticeListApi as getSystemApi} from '@/services/api/notice'; //平台公告
  import {getValidateCode as codeApi, userSecurityUpdateApi as saveApi} from "@/services/api/user";//开启提现短信验证
  import types from "@/store/mutation-types";

  export default {
    name: "manage-center",
    mixins: [logout, form, getCode, gotoRecharge],
    components: {},
    data() {
      return {
        // checked: false,
        leftAmount: '',
        rechargeStatus: null,
        tableSystemData: {},
        dialogShow: false,
        verifyShow: false,
        withdrawCheck: false,
        operation: '',
        form: {
          type: consts.CODE_CASH_SECURITY,
          status: consts.SECURITY_OPEN,
          code: undefined,
          // userId: this.user.id
        },
        codeApi,
        labelWidth: '120px',
        formError: '',
        rules: {
          code: {required: true, message: '验证码不能为空！'}
        },
      }
    },
    computed: {
      ...mapState({
        user: state => state.user
      }),
      checked: {
        get() {
          return this.isWithdrawProtect
        },
        set(val) {
          // console.log(val)
        }
      },
      // ...mapGetters(["avatar"]),
      ...mapGetters([
        'avatar',
        'isWithdrawProtect'
      ]),
      headerImg() {
        return avatarList[Number(this.avatar)];
      },
      // checked() {
      //   return this.isWithdrawProtect?true:false;
      // },
      actionName() {
        return this.isWithdrawProtect ? '关闭' : '开通';
      },
      registerDate() {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        if (month < 10) {
          month = "0" + month;
        }
        if (day < 10) {
          day = "0" + day;
        }
        let nowDate = Date.parse(year + "-" + month + "-" + day);
        let registerDate = Date.parse(_.toDate(this.user.registerDate));

        return ((nowDate - registerDate) / 3600 / 24 / 1000) + 1;
      }
    },
    created: function () {
      // this.getInfo()
    },
    methods: {
      confirm() {
        if (this.form.code) {
          this.doSave({action: "saveForm"})
        } else {
          this.$toast.fail('请输入验证码');
        }
      },
      goTo(routeName) {
        if (routeName === 'withdrawManager') {
          if (this.user.telephone) {
            if (this.withdrawCheck) {
              this.$router.push({
                name: 'withdrawWarning',
                query: {
                  leftAmount: this.leftAmount
                }
              });
            } else {
              this.$router.push({name: routeName});
            }
          } else {
            this.operation='提现';
            this.dialogShow = true;
          }
        } else if (routeName === 'cardManager') {
          if (this.user.telephone) {
            this.$router.push({name: routeName});
          } else {
            this.operation='绑卡';
            this.dialogShow = true;
          }
        } else{
          this.$router.push({name: routeName});
        }
      },
      logoutAccount() {
        this.logout();
      },
      showTel() {
        this.checked = false;
        this.dialogShow = true;
      },
      verifyTel() {
        this.checked = false;
        this.verifyShow = true;
      },
    },
    mounted() {
      this.$store.dispatch(types.GET_SECURITY);
      this.bindGet(getSystemApi, 'tableSystemData', {
        action: 'getGrid',
        sendingData: 'filters',
        format: data => {
          const systemInfo = _.filter(data.list, {'status': 0});
          return systemInfo
        }
      });
      this.doAction({type: 'get', action: "getGrid"})
      this.bindGet(getWithdrawInfo, 'withdrawInfo', {
        action: 'getWithdrawInfo',
        format: data => {
          if (data.leftAmount > 0) {
            this.withdrawCheck = true;
            this.leftAmount = data.leftAmount;
          }
          this.$store.commit(types.SET_WITHDRAW_INFO, data);
        }
      });
      this.doGet({action: 'getWithdrawInfo'});
      this.bindSave(saveApi, 'saveForm', 'form', {
        beforeSend: (data) => {
          // this.formError = '';
          return {
            type: 0,
            status: this.isWithdrawProtect ? consts.WITHDRAW_PROTECT_CLOSE : consts.WITHDRAW_PROTECT_OPEN,
            code: data.code
          };
        },
        afterSuccess: () => {
          this.$store.dispatch(types.OAUTH);
          this.$store.dispatch(types.GET_SECURITY);
          this.$emit('on-success');
          this.checked = true;
          this.verifyShow = false;
          this.form.code = '';
        },
        afterFail: ([result, data]) => {
          this.$toast.fail(data.message);
        }
      });
    }
  };
</script>
<style lang="scss">
  @include b(main) {
    @include e(cell) {
      .van-cell {
        padding: 10px 0 10px 15px;
        .van-cell__value {
          color: $--color-primary;
        }
        .van-cell__title {
          span {
            color: #333333;
            background-color: rgba(255, 255, 255, 0) !important;
            padding: 0;
            font-size: 15px;
          }
        }
        .phone-switch {
          display: flex;
          justify-content: flex-end;
        }
      }
      .van-cell-msg {
        .van-cell__value {
          span {
            display: inline-block;
            width: 16px;
            height: 16px;
            text-align: center;
            font-size: 12px;
            line-height: 16px;
            overflow: hidden;
            padding: 1px;
            background: $--color-danger;
            color: #ffffff;
            border-radius: 50%;
          }
        }
      }
    }
  }
</style>
<style lang="scss" scoped>
  @include b(main) {
    min-height: 800px;
    color: #333333;
    font-size: 14px;
    background: #F5F6F7;
    /*padding: 17px;*/
    padding-bottom: 60px;
    @include e(header) {
      width: 100%;
      height: 165px;
      background: url("./misc/mc-header-bg.png") no-repeat center;
      background-size: 100%;
      padding-top: 70px;
      color: #ffffff;
      text-align: center;
      @include e(header-img) {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: 3px solid rgba(255, 255, 255, 0.3);
        margin: 0 auto;
        img {
          width: 60px;
          height: 60px;
        }
      }
      @include e(header-name) {
        line-height: 30px;
        font-size: 19px;
      }
      @include e(header-txt) {
        line-height: 20px;
        font-size: 12px;
      }
      @include e(header-edit) {
        width: 13px;
        height: 13px;
        background: url("./misc/mc-edit.png") no-repeat center/contain;
        display: inline-block;
        margin-left: 5px;
      }
    }
    @include e(menu) {
      width: 100%;
      height: 88px;
      text-align: center;
      padding-top: 20px;
      .mc-recharge {
        width: 36px;
        height: 36px;
        background: url("./misc/mc-recharge.png") no-repeat center;
        background-size: 100%;
        margin: 0 auto;
      }
      .mc-transfer {
        width: 36px;
        height: 36px;
        background: url("./misc/mc-transfer.png") no-repeat center;
        background-size: 100%;
        margin: 0 auto;
      }
      .mc-withdraw {
        width: 36px;
        height: 36px;
        background: url("./misc/mc-withdraw.png") no-repeat center;
        background-size: 100%;
        margin: 0 auto;
      }
      .mc-activity {
        width: 36px;
        height: 36px;
        background: url("./misc/mc-activity.png") no-repeat center;
        background-size: 100%;
        margin: 0 auto;
      }
      @include e(menu-txt) {
        width: 100%;
        margin-top: 12px;
      }
    }
    @include e(cell) {
      border-radius: 8px;
      background-color: rgba(255, 255, 255, 1);
      /*box-shadow: 0 15px 25px 12px rgba(235, 235, 235, 0.6);*/
      box-shadow: 0 6px 10px 5px rgba(235, 235, 235, 0.6);
      margin: 12px 17px;
      overflow: hidden;
      .icon-mc-message {
        width: 18px;
        height: 18px;
        margin: 5px;
        background: url("./misc/mc-cell-icon/icon-mc-message.png") no-repeat center/contain;
      }
      .icon-mc-capital {
        width: 18px;
        height: 18px;
        margin: 5px;
        background: url("./misc/mc-cell-icon/icon-mc-capital.png") no-repeat center/contain;
      }
      .icon-mc-betting {
        width: 18px;
        height: 18px;
        margin: 5px;
        background: url("./misc/mc-cell-icon/icon-mc-betting.png") no-repeat center/contain;
      }
      .icon-mc-sms {
        width: 18px;
        height: 18px;
        margin: 5px;
        background: url("./misc/mc-cell-icon/icon-mc-sms.png") no-repeat center/contain;
      }
      .icon-mc-bank {
        width: 18px;
        height: 18px;
        margin: 5px;
        background: url("./misc/mc-cell-icon/icon-mc-bank.png") no-repeat center/contain;
      }
      .icon-mc-line {
        width: 18px;
        height: 18px;
        margin: 5px;
        background: url("./misc/mc-cell-icon/icon-mc-line.png") no-repeat center/contain;
      }
      .icon-mc-course {
        width: 18px;
        height: 18px;
        margin: 5px;
        background: url("./misc/mc-cell-icon/icon-mc-course.png") no-repeat center/contain;
      }
      .icon-mc-about {
        width: 18px;
        height: 18px;
        margin: 5px;
        background: url("./misc/mc-cell-icon/icon-mc-about.png") no-repeat center/contain;
      }
      .icon-mc-bg {
        width: 28px;
        height: 28px;
        background: radial-gradient(rgba(30, 90, 220, 0.4), rgba(30, 90, 220, 0.1), rgba(30, 90, 220, 0.01), rgba(30, 90, 220, 0.001));
        display: inline-block;
        vertical-align: bottom;
        border-radius: 50%;
      }
    }
    @include e(btn) {
      border-radius: 5px;
      background-color: rgba(234, 67, 53, 1);
      text-align: center;
      color: #ffffff;
      border: 1px solid rgba(234, 67, 53, 1);
      box-shadow: 0 4px 10px 0 rgba(234, 67, 53, 0.5);
    }
  }
</style>
