<template>
  <div class="share-button">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "share-button"
};
</script>
<style lang="scss" scoped>
@include b(share-button) {
  margin-top: 16px;
  @include e(cell) {
    width: 244px;
    height: 39px;
    line-height: 39px;
    text-align: center;
    background: linear-gradient(
      -61deg,
      rgba(0, 63, 199, 1),
      rgba(0, 101, 255, 1)
    );
    overflow: hidden;
    border-radius: 20px;
    font-size: 12px;
    font-family: "PingFangSC-Light";
    font-weight: 300;
  color: white;
    a {
      color: #474747;
    }
    cursor: pointer;
    &:last-child {
      margin-top: 12px;
    }
  }
}
</style>
