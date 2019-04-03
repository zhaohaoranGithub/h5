<template>
    <div class="sponsor-season">
        <sponsor-title>18-19赛季西甲球队名单</sponsor-title>
        <div class="sponsor-season-main">
            <div class="sponsor-season-main-list">
                <div class="sponsor-season-main-list__images">
                    <img src="./1.png" alt="">
                    <img src="./2.png" alt="">
                    <img src="./3.png" alt="">
                    <img src="./4.png" alt="">
                    <img src="./5.png" alt="">
                </div>
                <div class="sponsor-season-main-list__images">
                    <img src="./6.png" alt="">
                    <img src="./7.png" alt="">
                    <img src="./8.png" alt="">
                    <img src="./9.png" alt="">
                    <img src="./10.png" alt="">
                </div>
                <div class="sponsor-season-main-list__images">
                    <img src="./11.png" alt="">
                    <img src="./12.png" alt="">
                    <img src="./13.png" alt="">
                    <img src="./14.png" alt="">
                    <img src="./15.png" alt="">
                </div>
            </div>
            <div class="sponsor-season-main__brief">
                <p>西班牙足球甲级联赛（La Liga）简称为“西甲”是西班牙最高等级的职业足球联赛，也是欧洲及世界最高水平的职业足球联赛之一，现有参赛球队20支。</p>
                <p>西甲同时亦是出产——FIFA金球奖与世界足球先生和欧洲足球先生最多的联赛。2017年12月29日凌晨， 2017年度GlobeSoccer颁奖典礼在迪拜举行，西班牙足球甲级联赛获评年度最佳联赛。 </p>
                <p> 西甲历史上成绩最好的7支球队分别是：皇马、巴萨、马竞、瓦伦西亚、毕尔巴鄂竞技、塞维利亚和比利亚雷亚尔。</p>

            </div>
        </div>
    </div>
</template>


<script>
import sponsorTitle from "../components/sponsor-title";
export default {
  data() {
    return {};
  },
  components: {
    sponsorTitle
  }
};
</script>


<style lang="scss" scoped>
@include b(sponsor-season) {
  @include b(sponsor-season-main) {
    @include main-center(316px);
    @include e(brief) {
      font-size: 12px;
      font-family: "MicrosoftYaHei";
      font-weight: 400;
      line-height: 16px;
      color: #0b2a4b;
      p {
        margin-bottom: 16px;
      }
    }
    @include b(sponsor-season-main-list) {
      padding: 28px 0;
      @include e(images) {
        display: flex;
        justify-content: space-between;
        align-items: center;
        img {
          width: 55px;
          height: 55px;
        }
      }
    }
  }
}
</style>
