<template>
    <div class="course-header">
        <slot></slot>
    </div>
</template>


<script>
export default {
  name: "course-header"
};
</script>


<style lang="scss" scoped>
$--font-size: 14px;
$--font-weight-600: 600;
$--font-weight-400: 400;
$--font-family: "PingFangSC-Semibold";
$--font-family-biref: "PingFangSC-Regular";
$--font-color: #000;
@include b(course-header) {
  padding-left: 16px;
  @include e(title) {
    font-size: $--font-size;
    font-weight: $--font-weight-600;
    font-family: $--font-family;
    color: $--font-color;
  }
  @include e(biref) {
    font-size: $--font-size;
    font-weight: $--font-weight-400;
    font-family: $--font-family-biref;
    color: $--font-color;
    padding: 16px 0px 18px 0;
  }
}
</style>
