<template>
  <div class="card-add-container">
    <!--<div class="card-container__tips no-card">填写提现银行卡信息</div>-->
    <div class="card-add-container__tips card" v-if="withdrawInfo.name">
      <div>您好，{{withdrawInfo.name}}。</div>
      <div>填写提现银行卡信息</div>
    </div>
    <div class="card-add-container__input">
      <van-field v-if="!withdrawInfo.name" v-model='form.name' placeholder="请输入提款人真实姓名，姓名不可修改">
      </van-field>
      <van-field v-model='form.cardNo' placeholder="请输入跟提款人姓名一致的银行卡号">
      </van-field>
    </div>
    <div class="card-add-container__warn">
      <span class="warn-icon">!</span>
      <span class="warn-text">只能输入与姓名相同的银行卡号、否则无法成功提款</span>
    </div>
    <van-row type="flex" justify="center" class="account-button">
      <van-button type="primary" block shadow  native-type="submit" @click="submit">确定</van-button>
    </van-row>
  </div>

</template>

<script>

  import {form, factory} from '@/build';
  import {
    bankListApi as listApi,
    bankListBindApi as saveApi,
  } from "@/services/api/user";
  import {getWithdrawInfo} from '@/services/api/finance';

  export default {
    name: "bind-card",

    mixins: [form, factory],

    data() {
      return {
        form: {
          name: '',
          cardNo: ''
        }
      };
    },
    computed: {
      ...mapState({
        user: state => state.user
      }),
      ...mapGetters({
        withdrawInfo: 'withdrawInfo'
      })
    },
    methods:{
      submit() {
        if (factory.getValidator('cardNumber')(this.form.cardNo)) {
          this.doSave({action: 'saveForm'});
        }
      }
    },
    created(){
      this.bindGet(getWithdrawInfo, 'withdrawInfo', {
        action: 'getWithdrawInfo',
        format: data => {
          this.$store.commit(types.SET_WITHDRAW_INFO, data);
        }
      });
      this.doGet({action: 'getWithdrawInfo'});
    },
    mounted() {
      this.form.name = this.withdrawInfo.name
      this.bindSave(saveApi, 'saveForm', 'form', {
        beforeSend: (data) => {
          return data;
        },
        callback: ([result, data]) => {
          if (!result) {
            this.$toast(data.message);
          } else {
            this.$toast('银行卡绑定成功');
            this.$store.dispatch(types.OAUTH);
            this.$store.dispatch(types.GET_SECURITY);
            this.$router.go(-1);
            // this.$router.push({
            //   name: 'withdrawManager'
            // });
          }
        }
      });
      this.getAll();
    }
  };
</script>


<style lang="scss" scoped>
  @include b(card-add-container) {
    padding: 10px 20px;

    @include e(tips) {
      padding: 20px 0;
      font-size: 16px;
      font-weight: bold;
      &.card {
        line-height: 25px;
      }
    };
    @include e(code) {
      color: #1e5adc;
    }
    @include e(input) {
      .van-field {
        border-radius: 6px;
        background-color: #F5F6F7;
        color: #a6aab1;
        margin-top: 10px;
      }
    }
    @include e(warn) {
      padding: 10px 0;
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
    @include b(account-button) {
      margin-top: 15px;
    }
  }
</style>

