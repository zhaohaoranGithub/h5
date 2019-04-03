<template>
  <swiper class="download-container" :options="opts">
    <swiper-slide class="download-container__slide">
      <EHeader></EHeader>
      <Page4 :index="activeIndex" :downloadFlag="true" :activeIndex="0" :btns="false"></Page4>
      <EFooter></EFooter>
    </swiper-slide>
    <swiper-slide class="download-container__slide">
      <EHeader></EHeader>
      <Page3 :index="activeIndex" :downloadFlag="true" :activeIndex="1" :btns="false"></Page3>
      <EFooter></EFooter>
    </swiper-slide>
    <swiper-slide class="download-container__slide">
      <EHeader></EHeader>
      <Page6 :index="activeIndex" :downloadFlag="true" :activeIndex="2" :btns="false"></Page6>
      <EFooter></EFooter>
    </swiper-slide>
    <swiper-slide class="download-container__slide">
      <EHeader></EHeader>
      <Page7 :index="activeIndex" :activeIndex="3" :btns="false"></Page7>
      <EFooter></EFooter>
    </swiper-slide>
  </swiper>
</template>

<script>

  import Page5 from './components/page-5-a'
  import Page6 from './components/page-6-a'
  import Page3 from './components/page-3-a'
  import Page4 from './components/page-4-a'
  import Page7 from './components/page-7-a'
  import EHeader from './components/EHeader'
  import EFooter from './components/EFooter'

  export default {
    name: "introduction",
    components: {Page5, Page6, Page3, EHeader, EFooter, Page4, Page7},
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