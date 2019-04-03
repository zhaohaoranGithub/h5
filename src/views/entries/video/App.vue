<template>
  <sports-live-video v-if="videoInfo" :video-info="videoInfo"></sports-live-video>
</template>

<script>

  import SportsLiveVideo from './video';

  export default {
    name: "App",

    components: {
      SportsLiveVideo
    },

    data() {
      return {
        videoInfo: null
      };
    },

    watch: {
      '$route': {
        handler(route) {
          try {
            this.videoInfo = JSON.parse(decodeURIComponent(route.query.video));
          } catch (e) {
            throw new Error(`video-info解析失败${route.query}`);
          }
        },

        immediate: true,
      }
    }
  };
</script>

<style lang="scss">
  @import "~@/themes/chalk/src/reset.scss";

  body {
    font-size: 0;
  }
  @include b(app-video) {
    width: 100vw;
    height: 100vh;
  }

</style>