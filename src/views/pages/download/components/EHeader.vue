<template>
  <header>
    <h1><img :src='require("../images/logo.png")' alt=""></h1>
  </header>
</template>

<script>
  export default {
    name: "EHeader"
  }
</script>

<style scoped lang="scss">
  header {
    width: 100%;
    height: 40px;
    padding: 5px 0;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 200;

    img {
      height: 31px;
    }
  }

</style>