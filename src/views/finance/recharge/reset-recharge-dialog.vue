<template>
    <van-dialog v-model="warningStatus" message-align='center' :before-close="cancel" closed>
      <warning-dialog type="warn" :showFooter='false'>
        <template slot='brief'>
          如果您已完成付款请勿撤销，否则将影响<br>此笔存款进度，我们将尽快为您处理        
        </template>
        <template slot='footer'>
          <div class="footer-button">
            <span class="footer-button__confirm-btn footer-button__btn" @click="resetRecharge">确定撤销</span>
            <span class="footer-button__close-btn footer-button__btn" @click="$emit('cancel')">关闭</span>
          </div>
        </template>
      </warning-dialog>
    </van-dialog>
</template>
<script>
import {doRechargeCancel} from '@/services/api/finance';
import { setTimeout } from 'timers';
export default {
  name:"reset-recharge-dialog",
  props:["warningStatus","rechargeStatus"],
  data(){
    return {

    }
  },
  methods:{
    cancel(){
      this.$emit("cancel")
    },
    resetRecharge() {
      const {orderId} = this.rechargeStatus;
      let self=this;
       doRechargeCancel({orderId}).then(([result, data]) => {
          if (result) {
            this.$emit("cancel")
            localStorage.removeItem("rechargeStatus")
            this.$toast.success('订单撤销成功');
            setTimeout(function(){
              self.$router.push({path:'/'})
            },300)
          }
        });
    },
  }
}
</script>
<style lang="scss" scoped>
@include b(footer-button){
  padding: 20px 0;
  @include e(btn){
    display: inline-block;      
    width: 114px;
    height: 40px;
    border-radius: 5px;
    background-color: $--color-primary;
    text-align: center;
    line-height: 40px;
    color: #fff;
  }
  @include e(close-btn){
    background: #fff;
    border: 1px solid $--color-primary;
    color: $--color-primary;
  }
}
</style>

