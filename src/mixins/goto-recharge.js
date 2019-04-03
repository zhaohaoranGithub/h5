import {getRechargeStatus} from '@/services/api/finance';
import {isApp} from '@/utils/auth';
export default {
  data() {
    return {
      rechargeStatus:null,
    };
  },

  methods: {
    gotoRecharge(){
      if(isApp()){
        window.open('/redEnvelopeRecharge');
      }else{
        getRechargeStatus().then(([result,data])=>{
          if(result){
            if(data && data.paymentId === consts.PAY_ZHIFUBAO_ZHUANZ){
              this.$router.push({path:data.channelId === 1001 ? "/fund/recharge" : '/fund/recharge-status'});
              return false;
            }
            this.$router.push({path:data && [consts.PAY_BANKCARD_ZHUANZ,consts.PAY_WEIXIN_ZHUANZ].indexOf(data.paymentId) > -1 ? '/fund/recharge-status':'/fund/recharge'});
          }else{
            this.$toast({type:"fail",message:data.message});
          }
        });
      }
    }
  },
};
