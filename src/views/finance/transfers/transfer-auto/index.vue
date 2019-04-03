<template>
  <div class="transfer-auto">
    <div class="transfer-auto__top">
      <van-row type='flex' justify="space-between" class="transfer-auto__money">
        <div class="transfer-auto__money-l">
          中心钱包
        </div>
        <div class="transfer-auto__money-r">
          ￥{{ balance | currency}}
        </div>
      </van-row>
      <div class="transfer-auto__button">
        <van-button type="primary" class="transfer-auto__button-shadow" size='large' block @click="onRecycle">一键回收</van-button>
      </div>

    </div>
        <cell></cell>

  </div>
</template>


<script>
import { updateBalance } from "@/build";
import cell from './cell';
export default {

  components:{
      cell
  },
  mixins: [updateBalance],

  computed: {
    ...mapState({
      
      balanceConfig: state => state.balance.config,
      balance: state => state.user.balance
    })
  },
  methods: {
    async update() {
      this.updateBalance();
      this.$store.dispatch(types.GET_ALL_BALANCE);
    },
   
    async onRecycle() {
      const [result, data] = await this.$store.dispatch(
        types.TRANSFER_IN_CHANNEL,
        {
          toChannelId: 0
        }
      );
      this.$toast({
        message: data.message
      });

      this.update();
    }
  },
  mounted() {
    this.$store.dispatch(types.GET_ALL_BALANCE);
  }
};
</script>


<style lang="scss" scoped>
@include b(transfer-auto) {
  width: 100%;

  @include e(top) {
    margin-bottom: 13px;
    height: 157px;
    border-radius: 8px;
    background: white;
    box-shadow: 0px 15px 25px 12px rgba(235, 235, 235, 0.6);
  }

  @include e(money) {
    height: 66px;
    border-bottom: 1px solid #edeef0;
    align-items: center;
    padding: 0 19px;
  }
  @include e(money-l) {
    font-size: 16px;
    color: #666;
    font-family: $--main-font-family--Regular;
  }

  @include e(money-r) {
    font-size: 26px;
    color: black;
    font-family: $--main-font-family--Regular;
  }
  @include e(button) {
    padding: 0 19px;
    height: 89px;
    display: flex;
    align-items: center;
  }
  @include e(button-shadow){
    box-shadow: 0px 4px 10px 0px rgba(30, 90, 220, 0.5);
  }

  
}
</style>
