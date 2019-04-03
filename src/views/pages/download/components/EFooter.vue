<template>
  <footer>
    <img :src='require("../images/icon-down.png")' alt="">
  </footer>
</template>

<script>
  export default {
    name: "EFooter"
  }
</script>

<style scoped lang="scss">
  footer {
    width: 100%;
    height: 14px;
    position: absolute;
    left: 0;
    bottom: 3px;

    img {
      display: block;
      width: 14px;
      margin: 0 auto;
    }
  }
</style>