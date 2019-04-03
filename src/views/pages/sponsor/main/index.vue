<template>
    <div class="sponsor-main">
        <div class="sponsor-main-header">
            <div class="sponsor-main-header__inner">
                <div class="sponsor-main-header__title">
                    西班牙甲级联赛亚洲官方赞助商
                </div>
                <div class="sponsor-main-header__brief">
                  <div class="sponsor-main-header__brief-inner">
                     Ballbet贝博体育成为2018-2019赛季西班牙甲级联赛-全联赛 场边广告的赞助商，在体育界崭露头角，一时之间声名远扬。 西甲联赛是目前最具欧战竞争力的联赛，一直稳居"世界第一 联赛"的宝座，球队号召力堪称世界第一，是世界所有顶级球星的梦想之源。Ballbet贝博自主 星的梦想之源。Ballbet贝博体育无疑是亚洲体育娱乐的顶级品牌，Ballbet贝博体育携手西甲，强强联手，体育激情燃爆绿茵。随着Ballbet贝博自主研发的全球首家一体化移动娱乐原生APP发布，将海量体育投注、电竞、真人、彩票、电子游戏等最新娱乐项目装进移动端，可以使得用户足不出户，随时随地享受尊贵、优质的投注体验！
                  </div>
                   
                </div>
                <div class="sponsor-main-header__btn">

                </div>
            </div>

        </div>
        <div class="sponsor-main__pic">

        </div>
    </div>
</template>

<script>
export default {
  name: "sponsor-main"
};
</script>


<style lang="scss" scoped>
$-font-family: "MicrosoftYaHei";
@include b(sponsor-main) {
  height: 540px;
  position: relative;
  @include utils-bg(url("bg.png") no-repeat top, cover);
  @include e(pic) {
    width: 158px;
    height: 246px;
    position: absolute;
    bottom: 0;
    left: 0;
    @include utils-bg(url("pic.png") no-repeat top, contain);
  }
  @include b(sponsor-main-header) {
    width: 350px;
    height: 227px;
    position: absolute;
    bottom: 12px;
    right: 0;

    @include utils-bg(url("brief.png") no-repeat top, cover);
    @include e(title) {
      font-size: 15px;
      font-family: $-font-family;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      line-height: 24px;
    }

    @include e(brief) {
      margin-top: 16px;
      height: 145px;
      overflow: hidden;
      font-size: 12px;
      font-family: "MicrosoftYaHei";
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 18px;
      opacity: 0.5;
      position: relative;
      overflow: auto;
    }
    @include e(brief-inner){
      position: absolute;
    }
    @include e(inner) {
      width: 216px;
      float: right;
      margin-top: 15px;
      margin-right: 17px;
    }
    @include e(btn) {
      height: 13px;
      @include main-center(17px);
      margin-top: 8px;
      @include utils-bg(url("down.png") no-repeat top, contain);
    }
  }
}
</style>
