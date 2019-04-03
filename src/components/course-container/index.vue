<template>
    <div class="course-container">
        <slot></slot>
    </div>
</template>


<script>
export default {
  name: "course-container"
};
</script>

<style lang="scss" scoped>
@include b(course-container) {
  padding: 30px 15px;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(#f5f6f7),
    to(white),
    color-stop(0.5, #f5f6f7),
    color-stop(0.5, white)
  );
  @include e(article){
    padding: 30px 0;
  }
}
</style>
