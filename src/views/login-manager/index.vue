<template>
  <div class="login-manager">
    <transition
      mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "login-manager",
    watch: {
      $route(to, from) {
        if (from.path === '/global-phone') {
          this.$store.commit(types.SET_MOBILELOGIN, true);
        } else {
          this.$store.commit(types.SET_MOBILELOGIN, false);
        }
      }
    },
  };
</script>

<style lang="scss">

</style>
