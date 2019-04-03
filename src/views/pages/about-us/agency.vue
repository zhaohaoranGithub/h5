<template>
  <swiper class="download-container" :options="opts">
    <swiper-slide class="download-container__slide" :style="{height:WH}">
      <EHeader></EHeader>
      <Page5 :index="activeIndex"></Page5>
      <EFooter></EFooter>
    </swiper-slide>
    <swiper-slide class="download-container__slide">
      <EHeader></EHeader>
      <Page6 :index="activeIndex"></Page6>
      <EFooter></EFooter>
    </swiper-slide>
    <swiper-slide class="download-container__slide">
      <EHeader></EHeader>
      <Page3 :index="activeIndex" :downloadFlag="true"></Page3>
      <EFooter></EFooter>
    </swiper-slide>
    <swiper-slide class="download-container__slide">
      <EHeader></EHeader>
      <Page4 :index="activeIndex" :downloadFlag="true"></Page4>
      <EFooter></EFooter>
    </swiper-slide>
  </swiper>
</template>

<script>

  import Page5 from './components/page-5'
  import Page6 from './components/page-6'
  import Page3 from './components/page-3'
  import Page4 from './components/page-4'
  import EHeader from './components/EHeader'
  import EFooter from './components/EFooter'

  export default {
    name: "index",
    components: {Page5, Page6, Page3, EHeader, EFooter, Page4},
    data() {
      return {
        opts: {},
        activeIndex: 0
      }
    },
    computed: {
      WH: () => window.screen.availHeight + 'px'
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        let _this = this
        this.opts = {
          direction: 'vertical',
          height: window.innerHeight,
          on: {
            slideChange: function () {
              _this.activeIndex = this.activeIndex
            }
          }
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @include b(download-container) {
    @include e(slide) {
      position: relative;
    }
  }

</style>