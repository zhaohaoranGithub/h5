<template>
    <div class="games-platform">
        <div class="games-platform__header">游戏平台商</div>
        <div class="games-platform__main">
            <div class="games-platform-cell">
                <div class="games-platform-cell__pic">
                    <!--<img src="./image-1.png" alt="">-->
                </div>
            </div>
            <div class="games-platform-cell">
                <div class="games-platform-cell__pic">
                    <!--<img src="./image-2.png" alt="">-->
                </div>
            </div>
            <div class="games-platform-cell">
                <div class="games-platform-cell__pic">
                    <!--<img src="./image-3.png" alt="">-->
                </div>
            </div>
            <div class="games-platform-cell">
                <div class="games-platform-cell__pic">
                    <!--<img src="./image-4.png" alt="">-->
                </div>
            </div>

        </div>
    </div>
</template>


<script>
export default {};
</script>


<style lang="scss" scoped>
@include b(games-platform) {
  padding-bottom: 30px;
  @include e(header) {
    @include main-home-header();
    margin-bottom: 14px;
  }

  @include e(main) {
    height: 69px;
    padding-bottom: 5px;
    box-sizing: border-box;
    padding-bottom: 10px;
    @include b(games-platform-cell) {
      float: left;
      margin-left: 20px;
      box-sizing: border-box;
      &:nth-child(1) {
        margin-left: 0;
      }
      display: flex;
      justify-content: center;
      align-items: center;
      width: 69px;
      height: 69px;
      border-radius: 100%;
      box-shadow: 0 3px 6px 0 rgba(198, 198, 198, 0.5);
      border: 1px solid rgba(236, 236, 236, 1);
      @include e(pic) {
        width: 100%;
        height: 100%;
      }
      &:nth-child(1) {
        background: url("./image-1.png") no-repeat center/contain;
        background-size: 85%;
      }
      &:nth-child(2) {
        background: url("./image-2.png") no-repeat center/contain;
        background-size: 90%;
      }
      &:nth-child(3) {
        background: url("./image-3.png") no-repeat center/contain;
        background-size: 90%;
      }
      &:nth-child(4) {
        background: url("./image-4.png") no-repeat center/contain;
        background-size: 85%;
      }
      /*@include e(pic) {
        min-height: 20px;
        min-width: 58px;
        margin: 0 auto;
        img {
          width: 100%;
          height: 100%;
        }
      }
      &:nth-child(1) {
        @include e(pic) {
          width: 50px;
          height: 16px;
        }
      }
      &:nth-child(2) {
        @include e(pic) {
          width: 55px;
          height: 17px;
        }
      }
      &:nth-child(3) {
        @include e(pic) {
          width: 58px;
          height: 13px;
        }
      }
      &:nth-child(4) {
        @include e(pic) {
          width: 46px;
          height: 26px;
        }
      }*/
    }
  }
}
</style>
