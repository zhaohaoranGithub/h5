<template>
  <div v-show="panelShow"  class="ser_home">
    <div class="close">
      <van-icon name="clear" @click="hidePanel"/>
    </div>
    <div class="red_packet" id="red_packet">
      <template v-for="(item, index) in liParams">
        <div @click="open" class="red_packet_container" :style="{ left: item.left, animationDuration: item.durTime, webkitAnimationDuration: item.durTime}"
            :class="item.cls" :data-index="index" @webkitAnimationEnd="removeDom">
          <div>
            <i :style="{ transform: item.transforms, webkitTransform: item.transforms}"></i>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>


<script>
  import {factory, form} from '@/build';
  import {activityRedPacketReceiveApi} from '@/services/api/activity';
  export default {
    name: "red-packet",
    mixins: [factory, form],
    data () {
      return {
        panelShow: false,
        constraintClose: false,
        liParams: [],
        timer: null,
        startTimer: null,
        duration: 8000, // 定义时间
        redPacketData: [],
        check: true, // 防止连点红包
        contentStyleObj:{
          height:''
        }
      };
    },
    watch: {
      getStartRedPacket(curval, oldval) {
        if (curval === true) {
          this.showPanel();
          this.$store.commit(types.START_RED_PACKET, false);
        }
      }
    },
    computed: {
      ...mapGetters(["getStartRedPacket","getQualification"])
    },
    mounted () {
      this.bindGet(activityRedPacketReceiveApi, 'redPacketData', {
        action: 'receiveRedPacket',
        format:(data) => {
        },
        callback: ([result, data]) => {
          this.check = true;
          if (data.status == 1) {
            this.$emit('btnBack',{type: 0, num: data.bonusAmount});
          } else if(data.status == 2) {
            this.$emit('btnBack', {type: 3, num: null});
          }
        }
      });
    },
    methods: {
      open() {
        // this.$emit('openRedPacket');
        if(this.check) {
          if (this.getQualification) {
            this.check = false
            this.doGet({action: 'receiveRedPacket'});
          } else {
            this.$emit('btnBack', {type: 1, num: null});
          }
        }
      },
      toTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      },
      showPanel() {
        this.toTop();
        this.startRedPacket();
        this.finishRedPacket();
        this.panelShow = true;
      },
      hidePanel() {
        this.stopRedPacket();
        this.panelShow = false;
        this.constraintClose = true;
        setTimeout( () => {
          this.constraintClose = false;
        }, 20000);
        document.getElementsByTagName("body")[0].classList.remove('red-packet-overflow-hidden');
        document.getElementsByTagName("html")[0].classList.remove('red-packet-overflow-hidden');
      },
      getHeight(){
        this.contentStyleObj.height = document.getElementById("app-container").offsetHeight+'px';
      },
      finishRedPacket() {
        setTimeout( () => {  // 多少时间结束
          clearTimeout(this.timer);
          return;
        }, this.duration);

        setTimeout( () => {
          this.panelShow = false;
          document.getElementsByTagName("body")[0].classList.remove('red-packet-overflow-hidden');
          document.getElementsByTagName("html")[0].classList.remove('red-packet-overflow-hidden');
          this.liParams = [];
          return;
        }, this.duration + 3000);
      },
      /**
       * 开启动画
       */
      startRedPacket() {
        document.getElementsByTagName("body")[0].classList.add('red-packet-overflow-hidden');
        document.getElementsByTagName("html")[0].classList.add('red-packet-overflow-hidden');
        let win = document.documentElement.clientWidth || document.body.clientWidth;
        let left = parseInt(Math.random() * (win - 50) + 0);

        let rotate = (parseInt(Math.random() * (45 - (-45)) - 45)) + "deg"; // 旋转角度
        let scales = (Math.random() * (12 - 8 + 1) + 8) * 0.1; // 图片尺寸
        let durTime = (Math.random() * (2.5 - 1.4 + 1) + 1.4) + 's'; // 时间 1.2和1.2这个数值保持一样
        this.liParams.push({left: left+'px', cls: 'move_1', transforms: 'rotate('+ rotate +') scale('+ scales +')', durTime: durTime});

        this.timer = setTimeout( () => {
          this.startRedPacket();
        },300);
      },
      stopRedPacket() {
        clearTimeout(this.timer);
      },
      /**
       * 回收dom节点
       */
      removeDom (e) {
        let target = e.currentTarget;
        document.querySelector('#red_packet').removeChild(target);
      },
    }
  };
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .ser_home {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 500;
  }
  .close {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 30px;
    position: absolute;
    top: 40px;
    right: 15px;
    z-index: 550;
    cursor: pointer;
    .van-icon-clear:before {
      font-size: 30px;
    }
  }
  .red_packet {
    display: block;
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    i {
      width: 60px;
      height: 90px;
      display: block;
      @include utils-bg(url("./red-packet.png") no-repeat top, cover);
    }
    .red_packet_container {
      position: absolute;
      animation: all 3s linear;
      top:-100px;
      z-index: 10;
      cursor: pointer;
      &.move_1 {
        -webkit-animation: aim_move 5s linear 1 forwards;
        animation: aim_move 5s linear 1 forwards;
      }
    }
  }
  @keyframes aim_move {
    0% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
    100% {
      -webkit-transform: translateY(120vh);
      transform: translateY(120vh);
    }
  }
</style>
