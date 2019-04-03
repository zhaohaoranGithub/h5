<template>
  <div>
     <!-- <side-top></side-top> -->
    <swiper class="register-container" :options="opts" ref="swiper">
     
      <swiper-slide class="download-container__slide">
        <PageLogin :index="activeIndex" @input-focus="inputFocus" @input-blur="inputBlur" :height="height"
               :inputCursor="inputCursor"></PageLogin>
      </swiper-slide>

    </swiper>
  </div>

</template>

<script>
  import PageLogin from './components/page-login'
  import {download} from '@/mixins/index'
  import sideTop from './components/side-top/index';

  export default {
    name: "login",
    components: {PageLogin,sideTop},
    mixins: [download],

    data() {
      return {
        opts: {},
        activeIndex: 0,
        scrollTop: 0,
        inputCursor: 'blur',
        timer: '',
        height: '',
      }
    },
    created() {
      this.init()
      if (this.deviceType == 'IOS') {
        document.getElementsByTagName('html')[0].style.height = '100%'
        document.getElementsByTagName('html')[0].style.width = '100%'
        document.getElementsByTagName('html')[0].style.overflow = 'hidden'
        document.getElementsByTagName('body')[0].style.height = '100%'
        document.getElementsByTagName('body')[0].style.width = '100%'
        document.getElementsByTagName('body')[0].style.overflow = 'hidden'
      }
    },
    mounted() {
      document.documentElement.scrollTop = window.pageYOffset = document.body.scrollTop = 0
      this.height = window.innerHeight
      window.addEventListener('resize', () => {
        if (this.height == window.innerHeight && this.deviceType != 'IOS') {
          document.documentElement.scrollTop = window.pageYOffset = document.body.scrollTop = 0
        }
      })
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
            },
          }
        }
      },
      inputFocus() {
        this.inputCursor = 'focus'
      },
      inputBlur() {
        this.inputCursor = 'blur'
      }
    },
    watch: {
      // inputCursor(newVal) {
      //   if (newVal == 'blur') {
      //     this.timer = setTimeout(() => {
      //       document.body.scrollTop = 0
      //     }, 700)
      //   } else {
      //     if (this.timer) clearTimeout(this.timer)
      //   }
      // }
    },
    destroyed() {
      if (this.deviceType == 'IOS') {
        document.getElementsByTagName('html')[0].style.height = 'auto'
        document.getElementsByTagName('html')[0].style.width = 'auto'
        document.getElementsByTagName('html')[0].style.overflow = 'auto'
        document.getElementsByTagName('body')[0].style.height = 'auto'
        document.getElementsByTagName('body')[0].style.width = 'auto'
        document.getElementsByTagName('body')[0].style.overflow = 'auto'
      }
    }
  }
</script>

<style scoped lang="scss">
  @include b(register-container) {
    overflow: hidden;
    position: initial;
    @include e(slide) {
      position: relative;
    }
  }


</style>