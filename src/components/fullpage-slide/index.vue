<template>
  <div class="page-container">
    <div class="fullpage-container">
      <slot></slot>
    </div>
  </div>

</template>


<script>
export default {
  name: "fullpage-slide"
};
</script>



<style lang="scss" scoped>
  .page-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .fullpage-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
