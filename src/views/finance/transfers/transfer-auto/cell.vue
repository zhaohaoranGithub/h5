<template>
    <div class="transfer-main">
        <div class="transfer-main__cell" v-for="item in channelWallet" :key="item.channelId">
            <van-col span='8' class="transfer-main__brief">{{item.channelName}}</van-col>
            <van-col span='8' class="transfer-main__money">￥{{item.balance | currency}}</van-col>
            <van-col span='8' class="transfer-main__button">
                <van-button type="primary" size='small' :class="{'transfer-main__button-shadow': item.isOpen}" :disabled="!item.isOpen" @click="transferAll(item.channelId)">
                    {{item.isOpen?'一键转入':'维护中'}}
                </van-button>
            </van-col>
        </div>
    </div>
</template>


<script>
export default {
  data() {
    return {};
  },

  computed: {
    ...mapState({
      channelWallet: state => state.balance.channelWallet,
        balance: state => state.user.balance
    })
  },
  methods: {
    async transferAll(id) {
      
      const [result, data] = await this.$store.dispatch(
        types.TRANSFER_IN_CHANNEL,
        {
          toChannelId: id
        }
      );

      this.$notify({
        message: data.message,
        type: data.type
      });

      this.$store.dispatch(types.GET_ALL_BALANCE);
    }
  }
};
</script>


<style lang="scss" scoped>
@include b(transfer-main) {
    border-radius: 8px;
    background: white;
    box-shadow: 0px 15px 25px 12px rgba(235, 235, 235, 0.6);

    @include e(cell) {
      min-height: 70px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #edeef0;
      padding: 0 19px;
      &:last-child {
        border: none;
      }
      @include e(brief) {
        font-size: 16px;
        color: #666;
        font-family: $--main-font-family--Regular;
      }

      @include e(money) {
        font-size: 16px;
        color: black;
        text-align: center;
        font-family: $--main-font-family--Regular;
      }
      @include e(button) {
        text-align: right;
      }
      @include e(button-shadow){
        box-shadow: 0px 4px 10px 0px rgba(30, 90, 220, 0.5);
      }
    }
  }
</style>
