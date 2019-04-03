import {
  factory
} from '@/build';
export default {
  data() {
    return {
      codeOps: {
        countDownTime: consts.COUNT_DOWN_TIME,
        countdown: 0,

        firstTime: true,
        countdownTimer: undefined,
        codeError: '',
      },

      tDefaults: '获取验证码',
      tSending: '验证码已发送',
      tReSend: '重新发送',
      sendingData: 'form',
      sendingCode: false,
    };
  },

  computed: {
    codeBtnText() {
      if (this.sendingCode) {
        return `${this.tSending} ${this.codeOps.countdown}s`;
      } else if (this.codeOps.firstTime) {
        return this.tDefaults;
      } else {
        return this.tReSend;
      }
    }
  },


  mounted() {
    this.bindGet(this.codeApi, 'mobileData', {
      action: 'getCode',
      sendingData: this.sendingData,
      beforeSend: (data) => {
        this.codeOps.codeError = '';

        return data;
      },
      afterSuccess: () => {
        this.$_countDown();
      },
      afterFail: ([result, data]) => {
        // this.codeOps.codeError = data.message;
        this.$toast(data.message);
      }
    });
  },

  methods: {
    sendCode(mobile, require = false, {
      formItem
    } = {}) {
      if (require) {
        if (!factory.getValidator('mobile')(mobile)) return;
      }

      if (this.codeOps.countdown === 0) {
        this.doGet({
          action: 'getCode',
          form: formItem
        });
      }
    },

    $_countDown() {
      this.codeOps.firstTime = false;
      this.sendingCode = true;
      this.codeOps.countdown = this.codeOps.countDownTime;
      this.codeOps.countdownTimer = setInterval(() => {
        if (this.codeOps.countdown > 1) {
          --this.codeOps.countdown;
        } else {
          this.codeOps.countdown = 0;
          this.sendingCode = false;
          clearInterval(this.codeOps.countdownTimer);
        }
      }, 1000);
    },
  }

};
