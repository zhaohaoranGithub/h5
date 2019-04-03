<template>
  <div class="open-main">
    <div class="open-main__arrow"></div>
    <div class="open-main__close" @click="$emit('close')"></div>
    <div class="open-main__tip">
      <div>
        <span>1</span>
        点击右上角的“ <van-icon name="ellipsis" class="icon"></van-icon> ”按钮
      </div>
      <div>
        <span>2</span>
        选择“在浏览器中打开”
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "open-browser-tip",
    data() {
      return {};
    }
  };
</script>

<style scoped lang="scss">
  @include b(open-main){
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 999;
    background: rgba(0,0,0,.8);

    @include e(arrow){
      position: absolute;
      width: 46px;
      height: 36px;
      top: 1%;
      right: 3%;
      @include utils-bg(url('./tip-arrow.png') no-repeat center, contain);
    }

    @include e(close){
      position: absolute;
      width: 19px;
      height: 19px;
      top: 10%;
      right: 20%;
      @include utils-bg(url('./tip-close-btn.png') no-repeat center, contain);
    }

    @include e(tip){
      font-size: 18px;
      position: absolute;
      top: 15%;
      left: 15%;
      color: #ffffff;
      div{
        margin-bottom: 10px;
      }
      span{
        display: inline-block;
        width: 18px;
        height: 18px;
        font-size: 14px;
        border-radius: 50%;
        background-color: #d22c24;
        text-align: center;
        line-height: 18px;
      }
      .icon{
        /*transform: rotate(90deg);*/
      }
    }
  }
</style>
