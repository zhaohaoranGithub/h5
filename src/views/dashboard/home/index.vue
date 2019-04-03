<template>
  <div class="dashboard">
    <!-- 通告 -->
    <home-notice></home-notice>
    <!--首页banner-->
    <main-banner></main-banner>

    <div class="dashboard-inner">
      <main-recharge v-if="isLogin"></main-recharge>
      <!--热门电子游戏-->
      <popular-digital-games></popular-digital-games>
      <!--更多活动-->
      <activity-display></activity-display>
      <!-- 关于我们 -->
      <about-us v-if="!isLogin"></about-us>
      <games-platform v-if="!isLogin"></games-platform>

      <template v-transfer-dom>
        <global-activity></global-activity>
      </template>

    </div>

  </div>
</template>

<script>
import CustomerServiceContainer from "@/components/customer-service/customer-service-container";
import homeNotice from "./notice";
import PopularDigitalGames from "./popular-digital-games";
import MainBanner from "./main-banner";
import ActivityDisplay from "./activity-display";
import gamesPlatform from "./games-platform";
import mainRecharge from "./recharge";
import aboutUs from "./about-us/index";
import GlobalActivity from "@/views/global-activity";

export default {
  name: "home-view",

  components: {
    ActivityDisplay,
    MainBanner,
    PopularDigitalGames,
    homeNotice,
    aboutUs,
    gamesPlatform,
    mainRecharge,
    CustomerServiceContainer,
    GlobalActivity
  },

  computed: {
    ...mapGetters(["isLogin"])
  },

  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
$--main-spacing: 70px;
.dashboard {
  @include b(dashboard-inner) {
    padding: 0 10px;
  }
  @include b(game-display-area) {
    margin-bottom: $--main-spacing;
  }

  @include b(popular-sports) {
    margin-bottom: 40px;
  }
  @include b(sports-live) {
    margin-bottom: 60px;
  }
  @include b(popular-digital-games) {
    margin-bottom: 16px;
  }
  @include b(prize-pool-wrapper) {
    margin-bottom: $--main-spacing;
  }
  @include b(intro-panel-wrapper) {
    margin-bottom: $--main-spacing;
  }
}
</style>
