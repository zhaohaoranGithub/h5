<template>
    <div class="recharge-course-wrapper">
        <union-pay></union-pay>
        <alipay></alipay>
        <we-chat></we-chat>
        <union-pay-accounts></union-pay-accounts>
    </div>
</template>

<script>
import unionPay from './union-pay/index';
import alipay from './alipay/index';
import weChat from './we-chat/index';
import unionPayAccounts from './union-pay-accounts/index';
export default {
    components:{
        unionPay,
        alipay,
        weChat,
        unionPayAccounts
    }
}
</script>

<style lang="scss">
.recharge-header{
    padding-left: 16px;
}
.recharge-biref {
  padding: 16px 0px 18px 0;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #000;
}
.withdraw-container {
  padding: 15px;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(#f5f6f7),
    to(white),
    color-stop(0.5, #f5f6f7),
    color-stop(0.5, white)
  );
  .withdraw-container-article {
    margin-top: 30px;
  }
}
.recharge{
    padding-bottom: 50px;
}
</style>

<style lang="scss" scoped>

.recharge-course-wrapper{
    background: white;
    
}
</style>
