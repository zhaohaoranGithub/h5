<template>
    <div class="sponsor-title">
        <div class="sponsor-title__inner">
            <div class="sponsor-title__modify"></div>
            <slot></slot>
            <div class="sponsor-title__modify"></div>
        </div>

    </div>
</template>


<script>
export default {
  name: "sponsor-title"
};
</script>


<style lang="scss" scoped>
@include b(sponsor-title) {
  @include utils-bg(url("bg.png") no-repeat top, contain);
  height: 47px;
  @include e(inner) {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    font-family: 'MicrosoftYaHei';
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
  }
  @include e(modify) {
    width: 13px;
    height: 2px;
    background: rgba(255, 255, 255, 0.33);

    margin: 0 13px;
  }
}
</style>
