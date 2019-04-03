<template>
  <video
    class="sports-live-area"
    muted
    id="videoElement" ref="video" controls></video>
</template>

<script>
  // import VueVideoPlayer from 'vue-video-player';
  // import 'videojs-flash';

  import flvjs from 'flv.js';

  // import 'video.js/dist/video-js.css';
  // Vue.use(VueVideoPlayer);

  export default {
    name: "sports-live-video",

    props: {
      videoInfo: Object,
    },

    data() {
      return {
        flvPlayer: undefined,
        isMuted: undefined,
        isPlaying: false,
        isLoad: false,
        isAttach: false,
      };
    },

    watch: {
      videoInfo: {
        handler(currentVideoInfo) {
          if (flvjs.isSupported() && currentVideoInfo) {

            this.playerDestroy();
            this.flvPlayer = flvjs.createPlayer({
              type: 'flv',
              // url: this.videoInfo.url
              url: this.videoInfo.url.replace(/http(s)?/, 'https')
            });

            _.delay(() => {
              this.play();
            }, 300);
          }
        },
        deep: true,
        immediate: true
      }
    },

    methods: {
      playerDestroy() {
        if (this.flvPlayer) {
          if (this.isLoad) {
            this.flvPlayer.unload();
            this.isLoad = false;
          }
          if (this.isAttach) {
            this.flvPlayer.detachMediaElement();
            this.isAttach = false;
          }
          this.flvPlayer.destroy();
          this.flvPlayer = null;
          this.isPlaying = false;
          this.isMuted = undefined;
        }
      },
      // unmute() {
      //   this.flvPlayer.muted = false;
      // },

      play() {
        if (this.isMuted !== undefined) {
          this.flvPlayer.muted = false;
        }

        if (!this.isAttach) {
          this.flvPlayer.attachMediaElement(this.$refs.video);
          this.isAttach = true;
        }
        if (!this.isLoad) {
          this.flvPlayer.load();
          this.isLoad = true;
        }

        if (!this.isPlaying) {
          this.flvPlayer.play();
          this.isPlaying = true;
        }
      },
    },

    beforeDestroy() {
      this.playerDestroy();
    },
    mounted() {
      const self = this;

      // window.addEventListener("message", (event) => {
      //   _.delay(() => {
      //     self.flvPlayer.muted = false;
      //     console.log( 'receiveMessageFromIndex', event );
      //   }, 2000);
      // }, false);
    }
  };
</script>

<style lang="scss" scoped>
  @include b(sports-live-area) {
    width: 100vw;
    height: 100vh;
  }
</style>