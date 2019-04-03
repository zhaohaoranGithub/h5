<template>
  <div class="card-manager-container">
    <div class="card-manager-container__item" :class="item.name" v-for="item in bankData.cardList" :key="item.cardId">
      <van-icon @click="deleteCard(item)" class="delete-icon" name="clear" size="20px" />
      <div class="bank-img" :class="item.name"></div>
      <div class="bank-text">
        <div class="bank-text-name">{{item.bankName}}</div>
        <div class="bank-text-num">{{item.cardNo}}</div>
      </div>
    </div>
    <div v-if="bankData.cardList.length < 3" class="card-add" @click="$router.push({name:'cardAdd'})">
      <div class="add-icon"></div>
      <div>新增银行卡</div>
    </div>
    <div class="card-manager-container__warn">
      <span class="warn-icon">!</span>
      <span class="warn-text">最多可添加三张银行卡</span>
    </div>
    <van-dialog class="card-manager-container__dialog" v-model="bindPhoneDialogShow" close-on-click-overlay>
      <!--<van-icon @click="dialogShow = false" size="20px" class="delete-icon" name="clear" />-->
      <div class="dialog-img"></div>
      <div class="dialog-title">绑定手机号</div>
      <div class="dialog-text text-center m-bottom-sm">为了您的金钱安全，请先绑定您的手机号码，再进行删除操作</div>
      <van-button type="primary" size='medium' class="dialog-button" @click="$router.push({name:'bindPhone'})">确定</van-button>
    </van-dialog>
    <van-dialog class="card-manager-container__dialog" closed v-model="dialogShow" close-on-click-overlay>
      <div class="dialog-img"></div>
      <div class="dialog-title">删除绑定银行卡</div>
      <div class="dialog-text ">删除绑定银行卡需要绑定的手机接收验证码</div>
      <div class="dialog-phone">手机号码：<span class="blue">{{user.telephone}}</span></div>
      <van-cell-group>
        <van-field clearable v-model='form.code' placeholder="请输入验证码">
          <template slot="left-icon">
            <div class="code">验证码</div>
          </template>
          <template slot="icon">
            <span class="phone-container__code" @click="send">{{codeBtnText}}</span>
          </template>
        </van-field>
      </van-cell-group>
      <div>
        <van-button type="primary" size='medium' class="dialog-button" @click="submit">确定</van-button>
      </div>
    </van-dialog>
  </div>
</template>

<script>
  const cache = [];
  // const requireAll = r => r.keys().forEach(key => cache[key] = r(key));
  // const req = require.context('./misc', true, /\.png$/);
  // requireAll(req);
  import Cookies from 'js-cookie';
  import {factory, form, getCode} from '@/build';
  import { bankListApi as listApi } from "@/services/api/user";
  import {getValidateCode as codeApi, bankCardDeleteApi as saveApi} from "@/services/api/user";
  export default {
    name: "card-manager",
    mixins: [form,factory,getCode],
    data() {
      return {
        dialogShow: false,
        bindPhoneDialogShow: false,
        bankData: {
          cardList: [],
          name: ''
        },
        codeApi,
        form: {
          cardId: undefined,
          email: undefined,
          code: undefined,
          type: consts.CODE_CARD_DEL,
        },
      };
    },
    computed: {
      ...mapState({
        user: state => state.user
      }),
      telephone(){
        return Cookies.get(consts.CACHE_TELEPHONE);
      },
    },
    methods: {
      send(){
        this.sendCode(this.user.telephone);
      },
      deleteCard(data) {
        if(!this.user.telephone && !this.telephone) {
          this.bindPhoneDialogShow = true;
        }else{
          this.dialogShow = true;
          this.form.cardId = data.cardId;
        }
      },
      submit() {
        if (factory.getValidator('mobilecode')(this.form.code)) {
          this.doSave({action: 'saveForm'});
        }
      }
    },
    mounted() {
      this.bindGet(listApi, 'bankData', {
        action: 'getBank',
        format: (bankData) => {
          _.each(bankData.cardList, (bankInfo) => {
            const bankName = _.find(consts.BANK_LIST, {
              value: bankInfo.bankId
            }).name;
            bankInfo.name = bankName;
            // bankInfo.pic = cache[`./${bankName}-small.png`];
          });
          return bankData;
        }
      });
      this.doGet({action: 'getBank'});
      this.bindSave(saveApi, 'saveForm', 'form', {
        beforeSend: (data) => {
          return data;
        },
        callback: ([result, data]) => {
          if (!result) {
            this.dialogShow = true;
            this.$toast(data.message);
          } else {
            this.$toast('删除成功');
            this.dialogShow = false;
            this.doGet({action: 'getBank'});
            this.$store.dispatch(types.OAUTH);
            this.$store.dispatch(types.GET_SECURITY);
            // this.$router.push({
            //   name: 'withdrawManager'
            // });
          }
        },
      });
    }
  };
</script>

<style lang="scss" scoped>
 @include b(card-manager-container) {
   min-height: calc(100vh - 65px);
   padding: 10px 20px;
   background-color: #f5f6f7;
   .text-center{
     text-align: center;
   }
   .m-bottom-sm{
     margin-bottom:20px;
   }
   @include e(item) {
     margin-bottom: 15px;
     position: relative;
     padding:0 10px;
     color: white;
     height: 105px;
     background-color: #e95a64;
     border-radius: 5px;
     display: flex;
     align-items: center;
     &.zhaoshang {
       background-color: #ef3f57;
     }
     &.gongshang {
       background-color: #e95a64;
     }
     &.jianshe {
       background-color: #4f83bd;
     }
     &.nongye {
       background-color: #0099b3;
     }
     &.zhongguo {
       background-color: #fa4c52;
     }
     &.jiaotong {
       background-color: #4f83bd;
     }
     &.guangfa {
       background-color: #eb4d60;
     }
     &.guangda {
       background-color: #fbbd00;
     }
     &.pufa {
       background-color: #4373aa;
     }
     &.minsheng {
       background-color: #5aa572;
     }
     &.pingan {
       background-color: #ec681b;
     }
     &.xinye {
       background-color: #4f83bd;
     }
     &.zhongxin {
       background-color: #ff4150;
     }
     &.youzheng {
       background-color: #009174;
     }
     .delete-icon {
       position: absolute;
       top: 5px;
       right: 5px;
     }
     .bank-img {
       width: 50px;
       height: 50px;
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
     .bank-text {
       margin-left: 20px;
       line-height: 25px;
       .bank-text-name {
         font-size: 14px;
       }
       .bank-text-num {
         font-size: 16px;
       }
     }
   }
   @include e(warn) {
     margin-top: 10px;
     height: 30px;
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
       background-color: #1E5ADC;
       color: white;
     }
     .warn-text {
       margin-left: 10px;
       color: #b3b3b3
     }
   }
   .card-add {
     margin: 15px 0px;
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
   @include e(dialog) {
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
       margin-top: 10px;
       text-align: center;
     }
     .dialog-text {
       padding: 0 15px;
       margin-top: 20px;
       font-size: 14px;
       color: #a5a5a5;
       font-size: 12px;
     }

     .dialog-phone {
       padding: 0 15px;
       color: #a5a5a5;
       font-size: 14px;
       margin-top: 5px;
       .blue {
         color: #1E5ADC;
       }
     }
     .dialog-button {
       width: 100%;
       border-radius: 0px;
     }
     .van-cell {
       margin-top: 15px;
       font-size: 12px;
       padding: 10px 15px;
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
 }
</style>
