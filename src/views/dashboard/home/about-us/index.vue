<template>
    <div class="main-about-us">
        <div class="main-about-us__header">
            关于我们
        </div>
        <van-row class="main-about-us__main" type="flex" justify="space-between">
            <div class="main-about-us-cell">
                <div class="main-about-us-cell__pic main-about-us-cell__pic--1"></div>
                <div class="main-about-us-cell__brief">专业</div>
                <div class="main-about-us-cell__footer">每天提供超过<br>500种不同类别<br>的精彩赛事</div>
            </div>
            <div class="main-about-us-cell">
                <div class="main-about-us-cell__pic main-about-us-cell__pic--2"></div>
                <div class="main-about-us-cell__brief">便捷</div>
                <div class="main-about-us-cell__footer">支持各种终端<br>设备，众多的<br>存取款方式</div>
            </div>
            <div class="main-about-us-cell">
                <div class="main-about-us-cell__pic main-about-us-cell__pic--3"></div>
                <div class="main-about-us-cell__brief">安全</div>
                <div class="main-about-us-cell__footer">特技加密系统，<br>确保账号和资金<br>的使用安全</div>
            </div>
        </van-row>

    </div>
</template>


<script>
export default {};
</script>


<style lang="scss" scoped>
@include b(main-about-us) {
  @include e(header) {
    font-size: 18px;
    font-family: $--main-font-family--Medium;
    font-weight: 500;
    color: black;
    margin-bottom: 13px;
  }
  @include e(main) {
      margin-bottom: 22px;
    @include b(main-about-us-cell) {
      height: 136px;
      flex: 0 0 25%;
      display: flex;
      align-items: center;
      flex-flow: column;
      justify-content: center;
      padding: 13px 10px;
      box-shadow: 0px 3px 6px 0px rgba(198, 198, 198, 0.5);
      border-radius: 10px;
      opacity: 0.95;
      border: 1px solid rgba(236, 236, 236, 1);
      overflow: hidden;
      @include e(brief) {
        font-size: 16px;
        font-family: $--main-font-family--Medium;
        font-weight: 500;
        color: black;
        margin-top: 7px;
      }
      @include e(footer) {
        font-size: 9px;
        font-family: "PingFangSC-Regular";
        font-weight: 400;
        color: #9b9b9b;
        margin-top: 7px;
        text-align: center;
      }
      &:nth-of-type(1) {
        @include e(pic) {
          width: 50px;
          height: 50px;
          @include utils-bg(url("./image-11.png") no-repeat, contain);
        }
      }
      &:nth-of-type(2) {
        @include e(pic) {
          width: 50px;
          height: 50px;
          @include utils-bg(url("./image-22.png") no-repeat, contain);
        }
      }
      &:nth-of-type(3) {
        @include e(pic) {
          width: 50px;
          height: 50px;
          @include utils-bg(url("./image-33.png") no-repeat, contain);
        }
      }
    }
  }
}
</style>
