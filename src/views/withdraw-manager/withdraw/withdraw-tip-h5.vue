<template>
  <div class="withdraw-tip">
    <p class="withdraw-tip__title normal">
      普通提现说明
    </p>
    <ul>


      <li>
        1. 当日免费提现{{withdrawInfo.generalConfig.freeTimes}}次，超过免费次数后收取{{withdrawInfo.generalConfig.feeType == "fix" ? withdrawInfo.generalConfig.fee + '元' : withdrawInfo.generalConfig.fee + '%'}}的手续费，手续费上限{{withdrawInfo.generalConfig.feeLimit}}元
      </li>
      <li>
        2. 当日提现次数上限制{{withdrawInfo.generalConfig.countLimit}}次，达到提现次数后，当日无法进行提现
      </li>
      <li>
        3. 当日提现金额上限制{{withdrawInfo.generalConfig.amountLimit}}元，达到提现金额上限后，当日无法进行提现
      </li>
      <li>
        4. 当日是指00:00~24:00时间段
      </li>
    </ul>
    <p class="withdraw-tip__title large">
      大额提现说明
    </p>
    <ul>
       <!-- <li>
        1. 当日免费提现{{withdrawInfo.quickConfig.freeTimes}}次，超过免费次数后收取{{withdrawInfo.quickConfig.feeType == "fix" ? withdrawInfo.quickConfig.fee + '元' : withdrawInfo.quickConfig.fee + '%'}}的手续费，手续费上限{{withdrawInfo.quickConfig.feeLimit}}元
      </li> -->
       <li>
        1. 当日提现次数上限制{{withdrawInfo.quickConfig.countLimit}}次，达到提现次数后，当日无法进行提现
      </li>
      <li>
        2. 当日提现金额上限制{{withdrawInfo.quickConfig.amountLimit}}元，达到提现金额上限后，当日无法进行提现
      </li>
      <li>
        3. 单笔提现限额{{withdrawInfo.quickConfig.minLimit + '~' + withdrawInfo.quickConfig.maxLimit}}元，超出本金额的提现，系统默认拆成多笔提现订单
      </li>
      <li>
        4. 当日是指00:00~24:00时间段
      </li>
    </ul>
  </div>
</template>
<script>
  import {getWithdrawInfo} from '@/services/api/finance';
  import {form} from '@/build';
export default {
  name:"withdraw-tip",
  mixins: [form],
  data(){
    return {
      withdrawInfo:{}
    }
  },
  mounted(){
    this.bindGet(getWithdrawInfo, 'withdrawInfo', {
      action: 'getWithdrawInfo',
    });
    this.doAction({type:"get",action:"getWithdrawInfo"})
  }
}
</script>
<style lang="scss" scoped>
@include b(withdraw-tip){
  position: absolute;
  top: 44px;
  bottom: 0;
  left: 0;
  right: 0;
  background: #F5F6F7;
  padding: 15px;
  @include e(title){
    font-size:16px;
    margin-bottom: 10px;
    font-weight: bold;
    &.large{
       margin-top: 20px;
    }
  }
  ul{
    li{
      font-size: 14px;
      margin-bottom: 15px;
    }
  }
}
</style>


