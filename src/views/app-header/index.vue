<template>
  <div class="header">
    <div class="header__top-wrapper">
      <header-top></header-top>
    </div>

  </div>
</template>

<script>
import HeaderTop from "@/views/app-header/header-top";

export default {
  name: "top-header",

  components: {
    HeaderTop
  },

  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@include b(header) {
  position: relative;
  z-index: 400;
  padding-bottom: 45px;
}
</style>
