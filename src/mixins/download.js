export default {
  data() {
    return {
      deviceType: 'IOS',
      cashLoading: false,
      sportLoading: false,
    };
  },
  created() {
    let UA = navigator.userAgent;
    if (UA.indexOf('Android') > -1 || UA.indexOf('Adr') > -1) {
      //android终端
      this.deviceType = '安卓';
    }
  },
  methods: {
    downloadApp(type) {
      if(_.isOpenByBrowser()){
        this.$global.bus.$emit('openByBrowser');
        return false;
      }
      const message = this.deviceType === 'IOS' ? '等待下载...安装提示弹出并确认后返回桌面查看' : '等待下载...完成后自行安装';
      if (type == 1) {
        // 下载贝博娱乐
        this.cashLoading = true;
        this.$notify({
          title: '下载中',
          message,
          background: '#1989fa',
          duration: 5000,
          type: 'success',
          // onClose: ()=>{
          //   this.cashLoading = false;
          // }
        });
        // console.log('下载贝博娱乐')
        if (this.deviceType == '安卓') {
          //android终端
          window.location.href = 'https://member.aaawhu.com/ballbet.apk';
        } else if (this.deviceType == 'IOS') {
          //IOS终端
          window.location.href = 'itms-services:///?action=download-manifest&url=https://member.aaawhu.com/ballbet.plist';
        }
      } else {
        // 下载贝博体育
        // console.log('下载贝博体育')
        this.sportLoading = true;
        this.$notify({
          title: '下载中',
          message,
          background: '#1989fa',
          duration: 5000,
          type: 'success',
          // onClose: ()=>{
          //   this.sportLoading = false;
          // }
        });
        if (this.deviceType == '安卓') {
          //android终端
          window.location.href = 'https://sport.aaawhu.com/ballbetSport.apk';
        } else if (this.deviceType == 'IOS') {
          //IOS终端
          window.location.href = 'itms-services:///?action=download-manifest&url=https://sport.aaawhu.com/ballbetSport.plist';
        }
      }
      setTimeout(() => {
        this.cashLoading = false;
        this.sportLoading = false;
      },5000);
    },

    installGuide() {
      if (this.deviceType == '安卓') {
        //android终端
      } else if (this.deviceType == 'IOS') {
        //IOS终端
      }
    }
  }
};
