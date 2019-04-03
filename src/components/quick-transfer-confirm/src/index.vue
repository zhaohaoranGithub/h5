<template>

  <div class="quick-transfer-confirm">
    <div class="quick-transfer-confirm__games">{{gamesName}}钱包: {{channelInfo.balance|currency}}</div>
    <div class="quick-transfer-confirm__main">
      <div class="quick-transfer-confirm__games">中心钱包: {{balance|currency}} </div>
      <div class="quick-transfer-confirm__main-r" @click="gotoRecharge">充值</div>
    </div>
    <div class="quick-transfer-confirm-button">
      <van-button type="info" size='medium' native-type="submit" class="quick-transfer-confirm-button__close" @click="skipTransfer">忽略转账</van-button>
      <van-button type="primary" size='medium' native-type="submit" class="quick-transfer-confirm-button__togames" @click="transfer">自动转账进入游戏</van-button>
    </div>
  </div>
</template>

<script type="text/jsx">
import factory from "@/mixins/factory";
import form from "@/mixins/form";
import gotoRecharge from "@/mixins/goto-recharge";
// import capitalOperation from "@/mixins/capital-operation";
import { gameJumpApi } from "@/services/api/game";

const environment =
  // window.location.hostname.indexOf("localhost") > -1 ||
  window.location.hostname.indexOf("aalgds") > -1
    ? "test"
    : "production";
const url =
  environment == "test" ? "http://m.aalgds.com" : "http://g.ballbet7.com";
export default {
  name: "quick-transfer-confirm",
  mixins: [factory, form, gotoRecharge],
  props: {
    propchannelId: Number,
    gamesId: Number,
    gamesName: String
  },
  data() {
    return {
      form: {
        amount: this.balance,
        fromChannelId: 0,
        toChannelId: this.channelId
      },

      channelId: this.propchannelId,
      formError: "",

      openWindow: true
    };
  },

  watch: {
    channelId: {
      handler(channelId) {
        this.form.toChannelId = channelId;
      },
      immediate: true
    }
  },

  methods: {
    //自动转账进入游戏
    transfer() {
      this.doSave({ action: "saveForm" });
      this.startGame(this.gamesId);
    },
    //忽略提醒进入游戏
    skipTransfer() {
      this.$parent.close();
      this.startGame(this.gamesId);
    },
    openWin(url, id = "a_open") {
      let a = document.createElement("a");
      a.setAttribute("href", url);
      a.setAttribute("target", "_blank");
      a.setAttribute("id", id);
      // 防止反复添加
      if (!document.getElementById(id)) document.body.appendChild(a);
      a.click();
    },
    async startGame(gameId) {
      //检查是否弹窗
      let newWindow;
      if (this.openWindow) {
        newWindow = window.open();
      } else {
        return false;
      }
      // this.startLoading();
      const [result, data] = await gameJumpApi({
        gameId
      });
      if (result) {
        this.closeLoading();
        if (this.openWindow) {
          // newWindow.location =
          //   this.gamesId === consts.GAME_SPORTS
          //     ? `${url}/sports-188.html?url=${data.replace(
          //         /http(s)?:/,
          //         environment == "test" ? "http:" : "https:"
          //       )}`
          //     : data;
          newWindow.location = data;
        } else {
          this.gameUrl = data.replace(/http(s)?:/, window.location.protocol);
        }
      }
    }
  },

  computed: {
    channelInfo() {
      return this.$store.getters.channelInfoBy({ channelId: this.channelId });
    },
    ...mapState({
      balance: state => state.user.balance
    })
  },
  mounted() {
    this.form.amount = this.balance;

    this.bindSave(types.TRANSFER_IN_CHANNEL, "saveForm", "form", {
      beforeSend: data => {
        return data;
      },
      callback: ([result, data]) => {
        if (result) {
          if (parseInt(this.balance) <= 0) {
            this.$toast("中心钱包账户余额不足,请先充值");
          } else {
            this.$notify({
              type: "success",
              message: data.message
            });
          }

          this.$parent.close();

        } else {
          this.$notify(data.message);
        }
      }
    });
  }
};
</script>

<style lang="scss" scoped>
@include b(quick-transfer-confirm) {
  padding: 20px 16px;
  @include e(games) {
    font-family: $--main-font-family;
    color: #4a4a4a;
    font-size: 14px;
  }
  @include e(main) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 13px;
  }
  @include e(main-r) {
    font-size: 13px;
    font-family: $--main-font-family;
    color: #1e5adc;
  }
  @include b(quick-transfer-confirm-button) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 27px;

    @include e(close) {
      width: 114px;
      font-size: 12px;
    }
    @include e(togames) {
      width: 130px;
      font-size: 12px;
    }
  }
}
</style>
