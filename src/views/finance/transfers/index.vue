<template>
    <div class="transfers">
        <van-tabs v-model="active" swipeable color='#1d5adc'>
            <van-tab title="一键转账">
                <div class="transfers-container">
                    <transfer-auto v-if='active===0'></transfer-auto>
                </div>
            </van-tab>
            <van-tab title="手工转账">
                <div class="transfers-container">
                    <transfer-manual v-if='active===1'></transfer-manual>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>


<script>
import transferAuto from './transfer-auto';
import transferManual from './transfer-manual.vue';
export default {
  name: "finance-transfers",
  data() {
    return {
      active: 0
    };
  },
  components:{transferAuto,transferManual}
};
</script>


<style lang="scss" scoped>

@include b(transfers){
    @include b(transfers-container){
        padding: 16px;
        background: #F5F6F7;
    }
}
</style>
