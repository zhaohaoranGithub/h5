import {activityRedPacketInfoApi} from '@/services/api/activity';
import {isApp, getLogin} from '@/utils/auth';
const os_type = getLogin().os_type;
import {factory, form} from '@/build';
const ary = ['新春大吉', '万事如意', '新年快乐', '笑口常开', '年年有余', '财源广进', '吉祥如意', '事事顺心', '心想事成',
  '福星高照', '步步高升', '阖家幸福', '好事连连', '来年大吉', '万事胜意', '恭贺新禧', '猪事大吉',];
export default {
  mixins: [factory, form],
  data() {
    return {
      timer: null,
      redPacketInfo: [],
      text: '',
      subText: '',
      cancleBtn: '',
      confirmBtn: '',
      redPacketShow: false,
      type: null
    };
  },
  methods: {
    btnBack(data) {
      this.type = data.type;
      switch (data.type) {
        case 0 : this.cancleBtn = '资金明细';
                 this.confirmBtn = '确定';
                 this.text = `恭喜发财，红包<span style="color: red">${data.num}<span>元`;break;
        case 1 : this.cancleBtn = '立即投注';
                 this.confirmBtn = '立即充值';
                 this.text = '领取失败，未满足充值/投注条件';break;
        case 2 : this.cancleBtn = '';
                 this.confirmBtn = '确定';
                 this.text = '错过啦！红包雨刚下完~让我们期待下波到来~';break;
        case 3 : this.cancleBtn = '';
                 this.confirmBtn = '确定';
                 // this.text = data.msg;
                 this.text = `很遗憾，您没有获得红包, 祝您${ary[parseInt(17*Math.random())]},再接再厉~`;break;
      }
      this.openRedPacket();
    },
    cancleType(type) {
      if (type === 0) {
        if (isApp()) {
          window.open('/redEnvelopeBalanceHistory');
        } else {
          this.$router.push({path: '/mc/cr'});
          this.closeReadPack();
        }
      } else if(type === 1) {
        if (isApp()) {
          window.open('/redEnvelopeBetting');
        } else {
          this.$router.push({path: '/'});
          this.closeReadPack();
        }
      }
    },
    confirmType(type) {
      if (type === 0) {
        this.closeReadPack();
      } else if(type === 1) {
        if (isApp()) {
          window.open('/redEnvelopeRecharge');
        } else {
          this.$router.push({path: '/fund/recharge'});
          this.closeReadPack();
        }
      }
    },
    cancleClick() {
      switch (this.type) {
        case 0 :  this.cancleType(0);break;
        case 1 :  this.cancleType(1);break;
      }
    },
    confirmClick() {
      switch (this.type) {
        case 0 :  this.confirmType(0);break;
        case 1 :  this.confirmType(1);break;
        case 2 : this.closeReadPack(); break;
        case 3 : this.closeReadPack(); break;
      }
    },
    closeReadPack() {
      this.redPacketShow = false;
      document.getElementsByTagName("body")[0].classList.remove('red-packet-overflow-hidden');
      document.getElementsByTagName("html")[0].classList.remove('red-packet-overflow-hidden');
    },
    openRedPacket() {
      this.redPacketShow = true;
      document.getElementsByTagName("body")[0].classList.add('red-packet-overflow-hidden');
      document.getElementsByTagName("html")[0].classList.add('red-packet-overflow-hidden');
    },
    start() {
      this.$refs.redPacket.showPanel();
    },
    clearReadPack() {
      clearInterval(this.timer);
    },
    examine() {
      // clearInterval(this.timer);
      // this.timer = setInterval( ()=> {
      //   this.doGet({action: 'getRedPacketInfo'});
      // }, 4000);
    }
  },
  computed: {
  },
  watch:{
  },
  mounted() {
    this.bindGet(activityRedPacketInfoApi, 'redPacketInfo', {
      action: 'getRedPacketInfo',
      callback:([result, data])=>{
        if(result === true && data.opening == true) {
          this.closeReadPack();
          if (!this.$refs.redPacket.panelShow && !this.$refs.redPacket.constraintClose) {
            this.$store.commit(types.START_RED_PACKET, true);
          }
          // this.$refs.redPacket.showPanel();
        }
        if(result === true) {
          this.$store.commit(types.START_RED_QUA, data.hasQualification);
        }
      }
    });
  }
};
