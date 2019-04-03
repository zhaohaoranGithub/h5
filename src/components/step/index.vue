<template>
    <div class="step-main">
        <slot>

        </slot>
    </div>
</template>

<script>
export default {
  name: "step"
};
</script>


<style lang="scss">
$--font-size: 14px;
$--font-family: "PingFangSC-Semibold";
$--font-color: #000000;
$--font-weight: 600;


@include b(step-main-ul){
  width: 100%;
  padding-right:38px;
  padding-left: 16px;
  display: flex;
  list-style: disc;
  justify-content: space-between;
  @include e(item){
    font-family: $--font-family;
    font-size: $--font-size;
    color: $--font-color;
    @include when(active){
      color: #1E5ADC;
    }
  }
}
.step-main {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 16px 0;
  .step-main-cell {
    color: $--font-color;
    font-family: $--font-family;
    font-size: $--font-size;
    font-weight: $--font-weight;
    display: flex;
    justify-content: center;
    align-items: center;
      .step-main-cell__line {
      width: 16px;
      display: inline-block;
      height: 2px;
      background: $--font-color;
      margin: 0 5px;
    }
    &.active {
      color: #1e5adc;
      .step-main-cell__line{
          background: #1e5adc;
      }
    }
  
  }
}
</style>
