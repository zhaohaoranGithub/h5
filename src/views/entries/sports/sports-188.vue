<template>
  <iframe class="sports-188" :src="gameUrl" v-if="gameUrl"></iframe>
</template>

<script>
  import {gameJumpApi} from '@/services/api/game';

  export default {
    name: "sports-188",

    props: {
      // gameId: consts.GAME_SPORTS
    },

    data() {
      return {
        gameUrl: undefined
      };
    },

    watch: {
      '$route': {
        handler(route) {
          try {
            this.gameUrl = decodeURIComponent(route.query.url);
          } catch (e) {
            throw new Error(`video-info解析失败${route.query}`);
          }
        },

        immediate: true,
      }
    },
    //
    // async mounted() {
    //   const [result, data] = await gameJumpApi({
    //     gameId: this.gameId,
    //   });
    //   if (result) {
    //     this.gameUrl = data.replace(/http(s)?:/, window.location.protocol);
    //   }
    // }
  };
</script>

<style lang="scss" scoped>
  @include b(sports-188) {
    width: 100vw;
    height: 100vh;
    border: 0;
  }
</style>