<template>
  <div class="activity-container-header">
    <slot></slot>

  </div>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
$--font-family-title: "PingFangSC-Semibold";
$--font-family-brief: "PingFangSC-Regular";
$--font-color: #ffffff;
@include b(activity-container-header) {
  width: 100%;
  margin-bottom: 10px;
  @include e(wrapper) {
    position: relative;
    border-radius: 4px;
    height: 96px;
    box-shadow: 0px 10px 8px 0px rgba(0, 0, 0, 0.1);

    @include m(green) {
      background: linear-gradient(
        180deg,
        rgba(65, 106, 51, 0.74) 0%,
        rgba(15, 58, 0, 1) 100%
      );
    }
    @include m(immortal){
      background:linear-gradient(180deg,rgba(102,0,164,1) 0%,rgba(68,5,105,0.62) 100%);
    }
    @include m(platfrom) {
      background: linear-gradient(
        180deg,
        rgba(11, 57, 245, 0.31) 0%,
        rgba(0, 0, 0, 1) 100%
      );
    }

    @include m(survival) {
      background: linear-gradient(
        180deg,
        rgba(255, 218, 182, 0.31) 0%,
        rgba(95, 74, 44, 0.94) 40%,
        rgba(2, 1, 0, 1) 100%
      );
      display: flex;
      align-items: center;
      @include e(cell) {
        flex: 0 0 50%;
        flex-flow: column;
        border-right: none;
        height: 81px;
        &:nth-child(1) {
          border-right: 1px solid rgba(255, 255, 255, 0.3);
        }
        border-image: none;
      }
    }
    @include m(tiger) {
      background: linear-gradient(
        180deg,
        rgba(19, 39, 119, 0.31) 0%,
        rgba(0, 0, 0, 1) 100%
      );
      display: flex;
      align-items: center;
      @include e(cell) {
        flex: 0 0 50%;
        flex-flow: column;
        height: 81px;
        &:nth-child(1) {
          border-right: 1px solid;
          border-image: url("./line2.png") 27;
          border-left-width: 0;
          border-top-width: 0;
          border-bottom-width: 0;
        }
      }
    }

    @include m(sport-recharge){
      
    }
  }
  @include e(cell) {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    @include m(block) {
      width: 100%;
      height: 48px;
      &:nth-child(1) {
        border-bottom: 1px solid;
        border-image: url("./line.png") 27;
        border-top-width: 0;
      }
    }
    @include e(title) {
      font-size: 29px;
      font-family: $--font-family-title;
      color: $--font-color;
    }
    @include e(brief) {
      font-size: 22px;
      font-family: $--font-family-title;
      color: $--font-color;
    }
    @include e(icon) {
      position: absolute;
    }
    @include b(activity-container-header-inner) {
      display: flex;
      justify-content: center;
      flex-flow: column;
      flex: 1;
      align-items: center;
      // height: 68px;
      @include e(title) {
        font-size: 14px;
        font-family: $--font-family-title;
        color: $--font-color;
        font-weight: 600;
      }
      @include e(brief) {
        font-size: 12px;
        font-family: $--font-family-brief;
        color: $--font-color;
        font-weight: 400;
      }
    }

    @include m(red) {
      background: linear-gradient(
        180deg,
        rgba(255, 64, 105, 1) 0%,
        rgba(255, 108, 71, 1) 100%
      );
      box-shadow: 0px 10px 8px 0px rgba(0, 0, 0, 0.1);
    }
    @include m(blue) {
      background: linear-gradient(
        180deg,
        rgba(117, 56, 237, 1) 0%,
        rgba(108, 42, 224, 1) 100%
      );
      box-shadow: 0px 10px 8px 0px rgba(0, 0, 0, 0.1);
    }
    @include m(purple) {
      background: linear-gradient(
        180deg,
        rgba(170, 40, 241, 1) 0%,
        rgba(192, 37, 230, 1) 100%
      );
      box-shadow: 0px 10px 8px 0px rgba(0, 0, 0, 0.1);
    }
  }
}
</style>

