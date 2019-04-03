<template>
    <div class="visit-limit">
        <div class="visit-limit__pic">
            <img src="./pic.png" alt="">
        </div>
        <div class="visit-limit__main">
            <div class="visit-limit-header">
                <div class="visit-limit-header__left">
                    <img src="./stop.png">
                </div>
                <div class="visit-limit-header__right">
                    <div class="visit-limit-header__title">访问限制</div>
                    <div class="visit-limit-header__brief">您的IP来自:
                        <span>120.28.6.210（菲律宾）</span>
                    </div>
                </div>
            </div>
            <div class="visit-limit__text">
                亲爱的玩家您所在的国家和地区禁止访问我们的网站，如过您有疑问，请直接联系我们在线客服，对您造成的不便，我们深表歉意。
            </div>
            <div class="visit-limit__button">
                在线客服
            </div>
        </div>
    </div>
</template>


<script>
export default {};
</script>

<style lang="scss" scoped>
@include b(visit-limit) {
//   position: absolute;
//   top: 0;
//   left: 0;
//   bottom: 0;
//   right: 0;
  height: 100%;
  width: 100%;
  @include utils-bg(url("./bg.png") no-repeat top, cover);
  @include e(pic) {
    width: 277px;
    height: 384px;
    padding-top: 61px;
    margin-left: 29px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  @include e(main) {
    margin-top: 32px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
  }
  @include e(text) {
    @include main-center(320px);
    margin-top: 32px;
    font-family: 'MicrosoftYaHei';
    font-size: 14px;
    text-align: left;
    color: #3c3d3e;
  }
  @include e(button){
      width: 245px;
      height: 51px;
      line-height: 51px;
      text-align: center;
      cursor: pointer;
      background: #1e5adc;
      border-radius: 6px;
      font-size: 16px;
      color: white;
      font-family: 'MicrosoftYaHei';
      margin: 50px 0;
       box-shadow:0 5px 20px 0 #1e5adc;
  }
  @include b(visit-limit-header) {
    display: flex;
    align-items: center;
    justify-content: center;
    @include e(left) {
      width: 55px;
      height: 55px;
      margin-right: 20px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    @include e(title) {
      font-family: " MicrosoftYaHei-Bold";
      font-size: 30px;
      color: #3c3d3e;
    }
    @include e(brief) {
      font-family: "MicrosoftYaHei";
      font-size: 12px;
      color: #000000;
      span {
        color: #1e5adc;
        margin-left: 12px;
      }
    }
  }
}
</style>
