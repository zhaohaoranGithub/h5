<template>
    <div class="sports-container">
        <template v-if="isGaming">
                <iframe class="sports-container__iframe" ref="iframe" :src="`${url}/sports-transmit.html?url=${encodeUrl}`"></iframe>
                <!--<iframe class="sports-container__iframe" :src="gameUrl"  v-if="environment!=='test'" v-else-if="gameUrl"></iframe>-->
        </template>

    </div>
</template>

<script>
import {
  gameJumpApi
} from '@/services/api/game';

export default {
  name: "sports-view",


  data() {
    let environment =
      window.location.hostname.indexOf("localhost") > -1 ||
      window.location.hostname.indexOf("aalgds") > -1
        ? "test"
        : "production";
    let url =
      environment == "test" ? "http://m.aalgds.com" : "https://g.ballbet7.com";
    return {
      //体育转发网址，被墙的话，更换此网址即可
      environment: environment,
      url: url,
      // url: 'https://g.aibet.com',
      gameId: consts.GAME_SPORTS,
      enterWithoutLogin: true,
      isGaming:false,
    };
  },

  computed: {
    encodeUrl() {
      let protocol = this.environment == "test" ? "http" : "https";
      return this.gameUrl
        ? encodeURIComponent(this.gameUrl.replace(/http(s)?/, protocol))
        : undefined;
    }
  },

  watch: {
    $route: {
      handler(route) {
        _.delay(() => {
          this.startGame(consts.GAME_SPORTS);
        }, 300);
        //增大延迟时间，取保游戏状态接口返回值取到后，进行启动判断
      },
      immediate: true
    }
  },

  methods: {
    async startGame(gameId) {
      const [result, data] = await gameJumpApi({
        gameId
      });
      if (result) {
        // if (this.openWindow) {
          // newWindow.location = data;
        // } else {
          this.isGaming=true;
          this.gameUrl = data.replace(/http(s)?:/, window.location.protocol);
        // }
      }

    }
  },
  beforeRouteEnter(to, from, next) {
    console.log("nice1");
    next();
  },
  mounted() {
    // _.delay(() => {
      // this.startGame(consts.GAME_SPORTS);
    // }, 600);
  }
};
</script>

<style lang="scss" scoped>
@include b(sports-container) {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;

  @include e(iframe){
    width: 100%;
    height: 100%;
  }
}
</style>
