<template>
  <div class="transfer-manual">
    <div class="transfer-manual-head">
      <div class="transfer-manual-head__title">转出钱包</div>
      <div class="transfer-manual-head__select" @click="popShow=true">
        <div class="transfer-manual-head__money" v-if='balanceData.name===undefined||balanceData.balance===undefined'>
          中心钱包 (<span>{{balance|currency}}元</span>)
        </div>

        <div class="transfer-manual-head__money" v-else-if='balanceData.name===""'>
          请选择转出方式
        </div>
        <div class="transfer-manual-head__money" v-else>
          {{balanceData.name}} (
          <span>{{balanceData.balance|currency}}元</span>)
        </div>

        <van-icon name="arrow" class="transfer-manual-head__arrow" size='16px' color='#333' />

      </div>
    </div>
    <div class="transfer-manual-head">
      <div class="transfer-manual-head__title">转入钱包</div>
      <van-row class="transfer-manual-inner">
        <div class="transfer-manual-cell" @click="form.toChannelId=0" :class="{'disabled':form.fromChannelId === 0,'active':form.toChannelId===0}">
          <div class="transfer-manual-cell__title">中心钱包</div>
          <div class="transfer-manual-cell__money">{{balance|currency}}</div>
        </div>
        <div class="transfer-manual-cell" v-for="item in channelWallet" :key="item.channelId" @click="form.toChannelId=item.channelId" :class="{'disabled':!item.isOpen||form.fromChannelId === item.channelId,'active':item.channelId===form.toChannelId}">
          <div class="transfer-manual-cell__title">{{item.channelName}}</div>
          <div class="transfer-manual-cell__title" v-if="!item.isOpen">维护中</div>
          <div class="transfer-manual-cell__money" v-else>{{item.balance|currency}}</div>
        </div>
      </van-row>
      <van-row class="transfer-manual-money" type="flex" justify="space-between">
        <div class="transfer-manual-head__title">转账金额</div>
        <div class="transfer-manual-head__btn" @click="AllChannel">全部转入</div>
      </van-row>
      <div class="transfer-manual-input">
        <input type="number" placeholder="输入金额" v-model.number='form.amount' pattern="[0-9]*">
      </div>
      <van-button type="primary" size='large' block shadow class="transfer-manual-main-btn" @click="save">确定</van-button>
    </div>

    <van-actionsheet class="transfer-pop" title='转出钱包' v-model="popShow" borderRadius>
      <div class="transfer-pop-main">
        <van-row type='flex' justify="space-between" class="transfer-pop__cell" @click.native="form.fromChannelId=0,handlerChange({channelName:'中心钱包',balance:balance})">
          <div class="transfer-pop__brief">中心钱包 (<span>{{balance|currency}}</span>)</div>

          <div class="choice-img" :class="form.fromChannelId===0?'choice':'un-choice'"></div>
        </van-row>
        <van-row type='flex' justify="space-between" class="transfer-pop__cell" v-for="item in channelWallet" :key="item.channelId" @click.native="handlerChange(item),form.fromChannelId=item.channelId">
          <div class="transfer-pop__brief">{{item.channelName}} (<span>{{item.balance|currency}}</span>)</div>

          <div class="choice-img " :class="item.channelId===form.fromChannelId?'choice':'un-choice'"></div>
        </van-row>
      </div>

    </van-actionsheet>
  </div>
</template>


<script>
import { form, updateBalance } from "@/build";
export default {
  data() {
    return {
      popShow: false,
      form: {
        fromChannelId: 0,
        toChannelId: undefined,
        amount: undefined
      },
      balanceData: {
        name: undefined,
        balance: undefined
      }
    };
  },

  mixins: [form, updateBalance],

  computed: {
    ...mapState({
      channelWallet: state => state.balance.channelWallet,
      balance: state => state.user.balance.toFixed(2)
    }),
    currentFromBalance() {
      const { fromChannelId, toChannelId } = this.form;

      if (_.isUndefined(fromChannelId) || _.isNull(fromChannelId)) {
        this.$toast("转出钱包为必选项");
        return false;
      } else if (
        _.isUndefined(toChannelId) ||
        _.isNull(toChannelId) ||
        fromChannelId === toChannelId
      ) {
        this.$toast("转入钱包为必须项");
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    handlerChange(item) {
      this.balanceData["name"] = item.channelName;
      this.balanceData["balance"] = item.balance;
      this.popShow = false;
    },

    async AllChannel() {
      const { fromChannelId, toChannelId } = this.form;
      if (this.currentFromBalance) {
        if (
          _.isUndefined(this.balanceData["balance"]) ||
          this.form.fromChannelId === 0
        ) {
          this.form.amount = this.balance;
          return;
        } else {
          this.form.amount = _.find(this.channelWallet, {
            channelId: this.form.fromChannelId
          }).balance;
        }
      }
    },

    save() {
      if (this.currentFromBalance) {
        if (typeof parseInt(this.form["amount"]) !== "number") {
          this.$toast("请正确填写转账金额只能为数字");
          return;
        }
        if (this.form["amount"] === "" || this.form["amount"] === undefined) {
          this.$toast("请输入转账金额");
          return;
        }

        if (Number(this.form["amount"]) === 0) {
          this.$toast("转账金额不能为0元");
          return;
        }

        if (this.form.fromChannelId === 0) {
          if (Number(this.form["amount"]) > this.balance) {
            this.$toast("转出金额超出余额");
            return;
          }
        }
        if (Number(this.form["amount"]) > this.balanceData["balance"]) {
          this.$toast("转出金额超出余额");
          return;
        }
        this.startLoading();
        this.doSave({ action: "saveForm" });
      }
    }
  },
  mounted() {
    this.bindSave(types.TRANSFER_IN_CHANNEL, "saveForm", "form", {
      successMessage: "",
      beforeSend:(data)=>{
        this.startLoading();
        return data;
      },
      afterSuccess: ([result, data]) => {
        this.form["amount"] = "";
        if(result){
          this.closeLoading();
        }
        this.$toast({
          message: data.message
        });
        this.updateBalance();
        this.$store.dispatch(types.GET_ALL_BALANCE).then(()=>{
          //转账完成，恢复为中心钱包转出状态
          this.form.fromChannelId=0;
          this.handlerChange({channelName:'中心钱包',balance:this.balance})
        });

        // this.balanceData["name"] = this.balanceData["balance"] = "";
      }
    });

    this.$store.dispatch(types.GET_ALL_BALANCE);
  }
};
</script>

<style lang="scss" scoped>
$--color: #333;
$--input-height: 35px;
@include b(transfer-manual-head) {
  border-radius: 8px;
  background: white;
  box-shadow: 0px 15px 25px 12px rgba(235, 235, 235, 0.6);
  padding: 18px;
  margin-bottom: 12px;
  height: auto;
  @include e(title) {
    color: #333;
    font-size: 18px;
    font-family: $--main-font-family;
  }
  @include e(btn) {
    color: $--main-color;
    font-family: $--main-font-family;
    font-size: 14px;
  }
  @include e(select) {
    width: 100%;
    min-height: 42px;
    background: #f5f6f7;
    border-radius: 4px;
    margin-top: 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  @include e(money) {
    margin-left: 16px;
    color: $--color;
    font-size: 14px;
    font-family: $--main-font-family--Regular;
    span {
      color: $--main-color;
      font-family: $--main-font-family;
    }
  }
  @include e(arrow) {
    margin-right: 10px;
  }
}

@include b(transfer-pop) {
  @include e(cell) {
    min-height: 68px;
    align-items: center;
    padding: 0 13px;
  }

  @include e(brief) {
    color: $--color;
    font-size: 14px;
    font-family: $--main-font-family--Regular;
    span {
      color: $--main-color;
      font-family: $--main-font-family;
    }
  }

  .choice-img {
    &.choice {
      width: 30px;
      height: 30px;
      @include utils-bg(
        url("../../../assets/choice.png") no-repeat top,
        contain
      );
    }
    &.un-choice {
      width: 30px;
      height: 30px;
      @include utils-bg(
        url("../../../assets/un-choice.png") no-repeat top,
        contain
      );
    }
  }
}
@include b(transfer-manual-inner) {
  width: 100%;
}
@include b(transfer-manual-cell) {
  width: 31%;
  float: left;
  min-height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0px 5px 8px 0px rgba(71, 71, 71, 0.1);
  border: 1px solid rgba(240, 240, 240, 1);
  margin-right: 6px;
  margin-top: 6px;
  &:nth-child(3n) {
    margin-right: 0;
  }
  @include e(title) {
    color: #666;
    font-size: 14px;
    font-family: $--main-font-family--Regular;
  }

  @include e(money) {
    color: $--color;
    font-size: 16px;
    font-family: $--main-font-family--Regular;
  }
  &.active {
    background: $--main-color;
    .transfer-manual-cell__title,
    .transfer-manual-cell__money {
      color: white;
    }
  }
  &.disabled {
    background: #f5f6f7;
    .transfer-manual-cell__title,
    .transfer-manual-cell__money {
      color: #dedede;
    }
  }
}

@include b(transfer-manual-money) {
  width: 100%;
  align-items: center;
  margin-top: 20px;
}

@include b(transfer-manual-input) {
  height: $--input-height;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 16px;
  input {
    background: #f5f6f7;
    width: 100%;
    height: 100%;
    border: none;
    padding-left: 16px;
    color: #a6aab1;
    font-size: 14px;
    font-family: $--main-font-family--Regular;
  }
}

@include b(transfer-manual-main-btn) {
  margin-top: 20px;
}
</style>
