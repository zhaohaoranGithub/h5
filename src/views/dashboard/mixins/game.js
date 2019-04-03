import {
  gameJumpApi
} from '@/services/api/game';

export default {
  data() {
    return {
      //是否可以在未登录下进入游戏
      enterWithoutLogin: false,
      openWindow: true,
      gameId: undefined,
      loading: false,
      gameUrl: undefined,
      isGaming: false,
      channelId: undefined,
      gamesName: "",
      balanceDialog: false
    };
  },

  computed: {
    ...mapGetters([
      'isLogin',
      'gameStatus'
    ]),
  },

  methods: {
    checkLogin() {
      if (this.isLogin || this.enterWithoutLogin) {
        return true;
      } else {
        // this.$alert('请先登录账户', '提示', {
        //   confirmButtonText: '确定',
        //   callback: action => {
        //     this.$router.push({
        //       name: 'login'
        //     });
        //   }
        // });
        this.show = true;
        return false;
      }
    },

    checkIsOpen({
      status,
      startDate,
      endDate,
      remark
    }) {
      if (status === consts.MAINTAIN_STATUS_OPEN) {
        return true;
      } else {
        let title;
        let message;
        if (status === consts.MAINTAIN_STATUS_CLOSED) {
          title = '游戏已关闭';
          message = '游戏目前处于关闭状态，请选择其他游戏';
        } else if (status === consts.MAINTAIN_STATUS_MAINTAINING) {
          title = '游戏维护中';
          message = '游戏目前处于维护状态';
          if (!startDate && !remark) {
            let message = '游戏目前处于关闭状态，请选择其他游戏';
          } else {
            if (startDate) {
              message += `<br />维护时间：${_.toTime(startDate)} / ${_.toTime(endDate)}`;
            }
            if (remark) {
              message += ` <br />维护原因：${remark}`;
            }
          }
        } else if (status == undefined) {
          title = '请稍等';
          message = '正在获取游戏数据';
        }

        // this.$alert(message,
        //   title, {
        //     type: 'warning',
        //     dangerouslyUseHTMLString: true,
        //     confirmButtonText: '知道了',
        //     callback: action => {}
        //   });
        this.$dialog.alert({
          message: message,
          title: title,

        });
      }
    },

    async start(gameId, gameName, {
      gameInfo
    } = {}) {
      if (_.isEmpty(gameInfo)) {
        gameInfo = this.gameStatus(gameId);
      }
      //检查是否登录
      if (!this.checkLogin()) {
        return;
      }

      //检查是否开启游戏
      if (!this.checkIsOpen(this.gameStatus(gameId < 100 ? gameId : consts.PT))) {
        return;
      }



      this.$store.dispatch(types.GET_BALANCE, {
        channelId: gameInfo.channelId
      });
      this.gameId = gameId;
      this.gamesName = gameName;
      if (this.enterWithoutLogin && !this.isLogin) {
        this.startGame(gameId);
      } else {
        this.channelId = gameInfo.channelId;
        this.balanceDialog = true;
      }
    },

    // async startGame(gameId) {
    //   //检查是否弹窗
    //   let newWindow;
    //   if (this.openWindow) {
    //     newWindow = window.open();
    //   } else {
    //     this.loading = true;
    //   }

    //   const [result, data] = await gameJumpApi({
    //     gameId,
    //   });
    //   if (result) {
    //     if (this.openWindow) {
    //       newWindow.location = data;
    //     } else {
    //       this.gameUrl = data.replace(/http(s)?:/, window.location.protocol);
    //       this.loading = false;
    //       this.isGaming = true;
    //     }
    //   }
    // }
  }
};
