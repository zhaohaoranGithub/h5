<template>
  <div class="activity-container-bottom">
    <slot></slot>
  </div>

</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
$--font-family: "PingFangSC-Regular";
$--font-color: #ffffff;
@include b(activity-container-bottom) {
  margin-top: 10px;
  width: 100%;
  @include e(title) {
    font-size: 12px;
    font-family: "PingFangSC-Semibold";
    font-weight: 600;
    margin-bottom: 6px;
    color: white;
  }
  @include b(activity-container-bottom-text) {
    padding: 0 17px 15px 17px;
    background: rgba(122, 0, 238, 1);
    border-radius: 4px;

    @include m(green) {
      background: #416a33;
    }
    @include m(platfrom) {
      background: #0b3c87;
    }
    @include m(survival) {
      background: #653f2a;
    }
    @include m(tiger){
       background: #0A1638;
    }
    @include m(immortal){
      background: #6B1E9C;
    }
    @include m(sport-recharge){
      @include utils-bg(url("../sport-recharge/img/earth-bg.png") no-repeat top,  100%);
      background-position-y: 20px;
      background-color: #0f111a;
      ul{
        padding: 20px 20px 40px 20px;
        margin-top: 60px;
        @include utils-bg(url("../sport-recharge/img/word-bg.png") no-repeat top,  100% 100%);
        li{
          color: #000;
        }
      }
    }
    @include e(inner) {
      padding-top: 15px;
      @include e(ul) {
        margin: 0;
        padding: 0;
        list-style: none;

        li {
          font-size: 12px;
          color: $--font-color;
          font-family: $--font-family;
          line-height: 20px;
          font-weight: 400;
        }
      }
    }
  }
}
</style>

