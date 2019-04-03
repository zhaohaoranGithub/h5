<template>
  <sports-188></sports-188>
</template>

<script>

  import Sports188 from './sports-188';

  export default {
    name: "App",

    components: {
      Sports188
    },

  };
</script>

<style lang="scss">
  @import "~@/themes/chalk/src/reset.scss";

  body {
    font-size: 0;
  }
  @include b(app-video) {
    width: 100vw;
    height: 100vh;
  }

</style>