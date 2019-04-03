<template>
  <div>
    <fullpage-slide>
      <swiper :options="swiperOptionCash">
        <swiper-slide>
          <page-first :swiperPageIndex='activeIndex'></page-first>
        </swiper-slide>
        <swiper-slide>
          <page-second :swiperPageIndex='activeIndex'></page-second>
        </swiper-slide>
        <swiper-slide>
          <page-third :swiperPageIndex='activeIndex'></page-third>
        </swiper-slide>
      </swiper>

    </fullpage-slide>
    <open-brower-tip v-if="showOpenBrowserTip" @close="showOpenBrowserTip = !showOpenBrowserTip"></open-brower-tip>
  </div>
</template>

<script>

  import fullpageButton from "../components/fullpage-button";

  import fullpageDown from "../components/fullpage-down";

  import openBrowerTip from '@/components/open-browser-tip';

  import pageFirst from './page-1/index';

  import pageSecond from './page-2/index';

  import pageThird from './page-3/index';


  import swiper from "@/mixins/swiper";

  export default {
    data(){
      return{
        showOpenBrowserTip:_.isOpenByBrowser(),
      };
    },
    components: {
      fullpageButton, fullpageDown, pageFirst, pageSecond,
      pageThird,
      openBrowerTip,
    },
    mixins: [swiper],
    created(){
      this.$global.bus.$on('openByBrowser',() => {
        this.showOpenBrowserTip = true;
      });
    },
    // beforeDestroy() {
    //   this.$global.bus.$off('openByBrowser');
    // }
  };
</script>


<style lang="scss" scoped>

</style>
